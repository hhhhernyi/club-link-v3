#!/usr/bin/env python3
"""
Scrapes Wikipedia for squad + notable player data for top-5-league clubs
and generates an idempotent Supabase SQL migration file.

Usage:
  pip install -r requirements.txt
  python populate_players.py                          # all 5 leagues
  python populate_players.py --leagues ENG1 ESP1      # specific leagues
  python populate_players.py --club "Arsenal"         # single club (debug)
  python populate_players.py --dry-run               # print counts only, no SQL file
"""

import argparse
import io
import json
import re
import sys
import time

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace", line_buffering=True)
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace", line_buffering=True)
from pathlib import Path
from typing import Optional

import requests
from bs4 import BeautifulSoup, Tag

# ── Config ────────────────────────────────────────────────────────────────────

WIKI_API = "https://en.wikipedia.org/w/api.php"
HEADERS  = {"User-Agent": "ClubLinkBot/1.0 (football trivia game; contact hyileenet@gmail.com)"}

SQUAD_KEYWORDS   = ["current squad", "first-team squad", "playing staff", "squad", "players"]
LEGENDS_KEYWORDS = ["notable players", "notable former players", "notable alumni",
                    "former notable players", "international players", "former players"]
LIST_PAGE_KEYWORDS = ["players", "player list", "list of"]

# href fragments that indicate non-person wiki links (clubs, competitions, positions, etc.)
NON_PERSON_HREF_FRAGMENTS = [
    "File:", "Category:", "Help:", "Template:", "Wikipedia:", "Special:",
    "_F.C.", "_FC", "_AFC", "_United", "_City_F", "Football_Club",
    "Sporting_CP", "Club_de_", "national_football_team", "Premier_League",
    "La_Liga", "Serie_A", "Bundesliga", "Ligue_1", "UEFA", "FIFA",
    "Championship", "World_Cup", "Copa_del_Rey", "FA_Cup",
    # Playing positions
    "association_football", "Goalkeeper", "Midfielder", "Defender",
    "Striker", "Forward_(", "Winger_(", "Fullback", "Full-back",
    "Centre-back", "Centre_back", "Left_back", "Right_back",
]

# Player name blocklist — position names, countries, and other non-person strings
NAME_BLOCKLIST = {
    # Playing positions (modern)
    "forward", "fullback", "full-back", "full back", "midfielder", "defender",
    "goalkeeper", "striker", "winger", "attacker",
    "left back", "right back", "centre back", "centre-back",
    "left winger", "right winger", "centre forward",
    "attacking midfielder", "defensive midfielder", "central midfielder",
    "sweeper", "libero",
    # Historical positions
    "half back", "centre half", "centre half back", "wing half",
    "inside forward", "inside left", "inside right",
    "outside left", "outside right",
    # Countries / places that appear as visible link text
    "cuba", "togo", "mali", "asia", "bra", "caen", "oso", "epi", "ito",
    "france", "spain", "italy", "germany", "england", "portugal",
    "brazil", "argentina", "netherlands", "belgium", "croatia",
    "serbia", "nigeria", "senegal", "ghana", "ivory coast", "morocco",
    "algeria", "cameroon", "japan", "south korea", "usa", "mexico",
    "colombia", "uruguay", "chile", "peru", "ecuador",
    "poland", "czech republic", "hungary", "austria", "switzerland",
    "denmark", "sweden", "norway", "finland", "scotland", "wales",
    "ireland", "turkey", "greece", "ukraine", "russia",
}

# ── Wikipedia helpers ─────────────────────────────────────────────────────────

def wiki_get(params: dict, delay: float) -> dict:
    time.sleep(delay)
    try:
        r = requests.get(WIKI_API, params={**params, "format": "json", "redirects": 1},
                         headers=HEADERS, timeout=20)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        print(f"    ⚠ Wikipedia request failed: {e}", file=sys.stderr)
        return {}


def get_sections(wiki_title: str, delay: float) -> list[dict]:
    data = wiki_get({"action": "parse", "page": wiki_title, "prop": "sections"}, delay)
    return data.get("parse", {}).get("sections", [])


def get_section_html(wiki_title: str, section_index: int, delay: float) -> str:
    data = wiki_get({"action": "parse", "page": wiki_title,
                     "section": section_index, "prop": "text"}, delay)
    return data.get("parse", {}).get("text", {}).get("*", "")


def find_section_and_children(sections: list[dict], keywords: list[str]) -> list[int]:
    """
    Return the index of the first section matching any keyword, plus all
    its subsections (higher toclevel number = deeper nesting).
    """
    target_pos  = None
    target_toc  = None
    target_idx  = None

    for i, s in enumerate(sections):
        if any(kw.lower() in s["line"].lower() for kw in keywords):
            target_pos  = i
            target_toc  = int(s["toclevel"])
            target_idx  = int(s["index"])
            break

    if target_idx is None:
        return []

    indices = [target_idx]
    for s in sections[target_pos + 1:]:
        if int(s["toclevel"]) <= target_toc:
            break
        indices.append(int(s["index"]))

    return indices

# ── Name / nationality helpers ────────────────────────────────────────────────

def clean_name(text: str) -> str:
    text = re.sub(r'\[.*?\]', '', text)          # [1] footnotes
    text = re.sub(r'\(.*?\)', '', text)           # (1990–2001) years / disambig
    text = re.sub(r'[†‡*]', '', text)            # dagger symbols
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def clean_nationality(text: str) -> str:
    for suffix in [" national football team", " national team",
                   " under-", " U-", " B national", "(born"]:
        text = text.split(suffix)[0].strip()
    return text


def is_person_link(a: Tag) -> bool:
    href = a.get("href", "")
    if not href.startswith("/wiki/"):
        return False
    path = href[len("/wiki/"):]
    if ":" in path:                           # namespace (File:, Category:, etc.)
        return False
    if any(frag in path for frag in NON_PERSON_HREF_FRAGMENTS):
        return False
    text = clean_name(a.get_text(strip=True))
    if len(text) < 3 or text.isdigit() or text.isupper():
        return False
    if text[0].isdigit():          # season years like "2001–02"
        return False
    if text.lower() in NAME_BLOCKLIST:
        return False
    return True


def extract_nationality_from_container(container: Tag) -> str:
    """Try to find a flagicon span and return the country title."""
    flag = container.find("span", class_=lambda c: c and "flagicon" in c)
    if flag:
        a = flag.find("a")
        if a:
            nat = a.get("title", "") or a.get_text(strip=True)
            return clean_nationality(nat)
        img = flag.find("img")
        if img:
            return clean_nationality(img.get("alt", ""))
    return ""

# ── Parsers ───────────────────────────────────────────────────────────────────

def parse_squad_table(html: str) -> list[tuple[str, str]]:
    """
    Parse a Wikipedia squad wikitable.
    Returns [(player_name, nationality), ...].
    Column order is detected from the header row.
    """
    players: list[tuple[str, str]] = []
    seen: set[str] = set()
    soup = BeautifulSoup(html, "lxml")

    for table in soup.find_all("table", class_=lambda c: c and "wikitable" in c):
        # Detect column indices from header row
        header_row = table.find("tr")
        if not header_row:
            continue
        headers = [th.get_text(strip=True).lower()
                   for th in header_row.find_all(["th", "td"])]

        name_col = next((i for i, h in enumerate(headers) if "name" in h), None)
        nat_col  = next((i for i, h in enumerate(headers)
                         if h in ("nat.", "nat", "nationality", "nat ")), None)

        for row in table.find_all("tr")[1:]:
            cells = row.find_all(["td", "th"])
            if len(cells) < 2:
                continue

            player_name = ""
            nationality = ""

            # Try dedicated name column first
            if name_col is not None and name_col < len(cells):
                for a in cells[name_col].find_all("a", href=True):
                    if is_person_link(a):
                        player_name = clean_name(a.get_text(strip=True))
                        break

            # Fallback: first person link in any cell of the row
            if not player_name:
                for cell in cells:
                    for a in cell.find_all("a", href=True):
                        if is_person_link(a):
                            player_name = clean_name(a.get_text(strip=True))
                            break
                    if player_name:
                        break

            # Nationality from dedicated column
            if nat_col is not None and nat_col < len(cells):
                nationality = extract_nationality_from_container(cells[nat_col])

            # Fallback: any flagicon in row
            if not nationality:
                nationality = extract_nationality_from_container(row)

            if player_name and player_name not in seen:
                seen.add(player_name)
                players.append((player_name, nationality))

    return players


def parse_notable_section(html: str) -> list[tuple[str, str]]:
    """
    Parse a notable players section (or subsection).
    Handles both <ul>/<li> lists and wikitables.
    Returns [(player_name, nationality), ...].
    """
    players: list[tuple[str, str]] = []
    seen: set[str] = set()
    soup = BeautifulSoup(html, "lxml")

    # Tables first (some clubs use table format)
    for table in soup.find_all("table", class_=lambda c: c and "wikitable" in c):
        for name, nat in parse_squad_table(str(table)):
            if name not in seen:
                seen.add(name)
                players.append((name, nat))

    # Bullet lists
    for li in soup.find_all("li"):
        # Skip nested <li> inside tables (already handled)
        if li.find_parent("table"):
            continue

        a = next((tag for tag in li.find_all("a", href=True) if is_person_link(tag)), None)
        if not a:
            continue

        name = clean_name(a.get_text(strip=True))
        if not name or name in seen:
            continue
        seen.add(name)

        nationality = extract_nationality_from_container(li)
        players.append((name, nationality))

    return players

# ── List-page helpers ─────────────────────────────────────────────────────────

def list_page_title(wiki_title: str, override: str | None) -> str:
    """Return the 'List of X players' article title for a club."""
    return override if override else f"List of {wiki_title} players"


def fetch_list_page_players(list_title: str, delay: float) -> tuple[list[tuple[str, str]], bool]:
    """
    Scrape a 'List of X players' Wikipedia page for all-time player data.
    Returns (players, found) — found=False means the page doesn't exist.

    Three cases handled:
      1. Page doesn't exist → API returns error → ([], False)
      2. Page exists, no headings → all content in section 0 → fetch section 0
      3. Page exists with sections → prefer keyword-matched sections, else try all
    """
    data = wiki_get({"action": "parse", "page": list_title, "prop": "sections"}, delay)

    if "error" in data or "parse" not in data:
        return [], False  # page truly doesn't exist

    sections = data["parse"]["sections"]
    all_players: list[tuple[str, str]] = []
    seen: set[str] = set()

    if not sections:
        # Page exists but has no headings — table lives in section 0
        html = get_section_html(list_title, 0, delay)
        for name, nat in parse_squad_table(html):
            if name not in seen:
                seen.add(name)
                all_players.append((name, nat))
        return all_players, True

    # Always fetch all sections — list pages are player-only, no need to filter
    for s in sections:
        html = get_section_html(list_title, int(s["index"]), delay)
        for name, nat in parse_squad_table(html):
            if name not in seen:
                seen.add(name)
                all_players.append((name, nat))

    return all_players, True


# ── SQL helpers ───────────────────────────────────────────────────────────────

SQL_HELPER = """\
-- Helper: idempotent player + club link (finds existing player by name, inserts if new)
CREATE OR REPLACE FUNCTION _link_player(
  p_name TEXT, p_nationality TEXT, p_club_name TEXT
) RETURNS void LANGUAGE plpgsql AS $$
DECLARE v_pid INT; v_cid INT;
BEGIN
  SELECT id INTO v_cid FROM clubs WHERE LOWER(name) = LOWER(p_club_name);
  IF v_cid IS NULL THEN RETURN; END IF;

  SELECT id INTO v_pid FROM players WHERE LOWER(name) = LOWER(p_name);
  IF v_pid IS NULL THEN
    INSERT INTO players (name, nationality)
    VALUES (p_name, p_nationality)
    RETURNING id INTO v_pid;
  END IF;

  INSERT INTO player_clubs (player_id, club_id)
  VALUES (v_pid, v_cid)
  ON CONFLICT DO NOTHING;
END; $$;
"""

def esc(s: str) -> str:
    return s.replace("'", "''")

# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="Populate Club Link player DB from Wikipedia")
    parser.add_argument("--leagues",  nargs="+", default=["ENG1","ESP1","ITA1","GER1","FRA1"])
    parser.add_argument("--club",     help="Process a single club by DB name (debug mode)")
    parser.add_argument("--output",   default="../supabase/migrations/015_player_expansion.sql")
    parser.add_argument("--delay",    type=float, default=0.5, help="Seconds between API calls")
    parser.add_argument("--dry-run",  action="store_true", help="Print counts only, no SQL output")
    args = parser.parse_args()

    scripts_dir = Path(__file__).parent
    wiki_map_path = scripts_dir / "club_wiki_map.json"

    with open(wiki_map_path, encoding="utf-8") as f:
        raw = json.load(f)

    # Strip the comment key
    wiki_map = {k: v for k, v in raw.items() if not k.startswith("_")}

    # Filter clubs
    if args.club:
        if args.club not in wiki_map:
            print(f"Club '{args.club}' not found in club_wiki_map.json", file=sys.stderr)
            sys.exit(1)
        clubs = {args.club: wiki_map[args.club]}
    else:
        clubs = {k: v for k, v in wiki_map.items() if v["league"] in args.leagues}

    print(f"Processing {len(clubs)} clubs  |  leagues: {args.leagues if not args.club else '(single)'}\n")

    # (player_name, nationality, club_name, entry_type)
    all_entries: list[tuple[str, str, str, str]] = []

    for club_name, info in clubs.items():
        wiki_title = info["wiki"]
        print(f"→ {club_name}  ({wiki_title})")

        sections = get_sections(wiki_title, args.delay)
        if not sections:
            print("  ✗ Could not fetch sections — skipping")
            continue

        # ── Current squad ──────────────────────────────────────────────────
        squad_indices = find_section_and_children(sections, SQUAD_KEYWORDS)
        squad_players: list[tuple[str, str]] = []

        if squad_indices:
            for idx in squad_indices:
                html = get_section_html(wiki_title, idx, args.delay)
                squad_players.extend(parse_squad_table(html))
            # deduplicate preserving order
            seen: set[str] = set()
            squad_players = [p for p in squad_players if not (p[0] in seen or seen.add(p[0]))]  # type: ignore
            print(f"  Squad:   {len(squad_players)} players")
        else:
            print("  Squad:   section not found")

        # ── Legend / all-time players ──────────────────────────────────────
        # Primary: "List of X players" Wikipedia page (comprehensive all-time table)
        # Fallback: "Notable players" section of the main club article
        legend_players: list[tuple[str, str]] = []
        ltitle = list_page_title(wiki_title, info.get("wiki_list"))
        list_players, list_found = fetch_list_page_players(ltitle, args.delay)

        if list_found and list_players:
            legend_players = list_players
            print(f"  Legends: {len(legend_players)} players  (from '{ltitle}')")
        else:
            # Fallback: notable players section on main article
            legends_indices = find_section_and_children(sections, LEGENDS_KEYWORDS)
            if legends_indices:
                for idx in legends_indices:
                    html = get_section_html(wiki_title, idx, args.delay)
                    legend_players.extend(parse_notable_section(html))
                seen2: set[str] = set()
                legend_players = [p for p in legend_players if not (p[0] in seen2 or seen2.add(p[0]))]  # type: ignore
                print(f"  Legends: {len(legend_players)} players  (notable players section)")
            else:
                print(f"  Legends: not found  (tried '{ltitle}' + notable players section)")

        for name, nat in squad_players:
            all_entries.append((name, nat, club_name, "squad"))
        for name, nat in legend_players:
            all_entries.append((name, nat, club_name, "legend"))

    # ── Summary ───────────────────────────────────────────────────────────────
    total       = len(all_entries)
    unique_names = len({e[0] for e in all_entries})
    print(f"\n{'─'*50}")
    print(f"Total entries : {total}")
    print(f"Unique names  : {unique_names}  (cross-club duplicates become shared player records)")

    if args.dry_run:
        print("Dry run — no SQL written.")
        return

    # ── Write SQL ─────────────────────────────────────────────────────────────
    output_path = (scripts_dir / args.output).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("-- Auto-generated by scripts/populate_players.py\n")
        f.write("-- Wikipedia squad + notable player data for top-5 leagues\n")
        f.write("-- Safe to re-run: existing players are matched by name, duplicates skipped.\n\n")
        f.write(SQL_HELPER)

        current_club = ""
        current_type = ""

        for name, nat, club, entry_type in all_entries:
            section_label = "current squad" if entry_type == "squad" else "legends"
            if club != current_club or entry_type != current_type:
                f.write(f"\n-- {club} — {section_label}\n")
                current_club = club
                current_type = entry_type
            f.write(f"SELECT _link_player('{esc(name)}', '{esc(nat)}', '{esc(club)}');\n")

        f.write("\nDROP FUNCTION IF EXISTS _link_player;\n")

    print(f"✓ Written to {output_path}")
    print("\nNext steps:")
    print("  1. Review the SQL output for any obviously wrong names")
    print("  2. Paste into Supabase SQL editor (or run: supabase db push)")


if __name__ == "__main__":
    main()
