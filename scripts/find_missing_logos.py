#!/usr/bin/env python3
"""
find_missing_logos.py — Fetch logo URLs for clubs that have none in the DB.

Steps:
  1. Reads all clubs with logo_url IS NULL from Supabase (REST, anon key).
  2. For each club, looks up the Wikipedia page summary for a badge thumbnail.
  3. Writes a SQL migration file: supabase/migrations/017_missing_logos.sql
  4. Optionally applies the updates directly to Supabase (--apply flag,
     requires SUPABASE_SERVICE_ROLE_KEY in env).

Usage:
  python find_missing_logos.py             # generate SQL only
  python find_missing_logos.py --apply     # generate SQL + push to Supabase

Env vars (from the project .env file):
  VITE_SUPABASE_URL        e.g. https://xxxx.supabase.co
  VITE_SUPABASE_ANON_KEY   anon/public key
  SUPABASE_SERVICE_ROLE_KEY  (only needed for --apply)
"""

import os
import sys
import re
import json
import time
import argparse
from pathlib import Path
import requests

# ── Env loading ────────────────────────────────────────────────────────────────

def load_env():
    """Load .env from the project root (parent of scripts/)."""
    env_path = Path(__file__).parent.parent / ".env"
    if not env_path.exists():
        return
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            value = value.strip().strip('"').strip("'")
            os.environ.setdefault(key.strip(), value)

load_env()

SUPABASE_URL = os.environ.get("VITE_SUPABASE_URL", "").rstrip("/")
ANON_KEY     = os.environ.get("VITE_SUPABASE_ANON_KEY", "")
SERVICE_KEY  = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

if not SUPABASE_URL or not ANON_KEY:
    print("ERROR: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env")
    sys.exit(1)

# ── Supabase helpers ───────────────────────────────────────────────────────────

def supabase_get(path: str, key: str = ANON_KEY) -> list:
    resp = requests.get(
        f"{SUPABASE_URL}/rest/v1/{path}",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Accept": "application/json",
            "Prefer": "count=none",
        },
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()

def supabase_patch(table: str, club_id: int, logo_url: str | None, key: str) -> None:
    resp = requests.patch(
        f"{SUPABASE_URL}/rest/v1/{table}?id=eq.{club_id}",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
        data=json.dumps({"logo_url": logo_url}),
        timeout=15,
    )
    resp.raise_for_status()

# ── Wikipedia logo lookup ──────────────────────────────────────────────────────

WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1/page/summary"
_cache: dict = {}

# Maps DB club name → Wikipedia article title when they differ.
# Wikipedia handles most redirects automatically, so only add entries
# where the DB name would return a 404 or wrong article.
WIKIPEDIA_OVERRIDES = {
    # English
    "Wolverhampton Wanderers": "Wolverhampton Wanderers F.C.",
    "Queens Park Rangers":     "Queens Park Rangers F.C.",
    "West Bromwich Albion":    "West Bromwich Albion F.C.",
    "Peterborough United":     "Peterborough United F.C.",
    "MK Dons":                 "MK Dons F.C.",
    "Oxford United":           "Oxford United F.C.",
    "Tranmere Rovers":         "Tranmere Rovers F.C.",
    # German
    "Borussia Monchengladbach": "Borussia Mönchengladbach",
    "FC Koln":                 "1. FC Köln",
    "1. FC Kaiserslautern":    "1. FC Kaiserslautern",
    "Greuther Furth":          "SpVgg Greuther Fürth",
    "Fortuna Dusseldorf":      "Fortuna Düsseldorf",
    "Nurnberg":                "1. FC Nürnberg",
    "Preussen Munster":        "Preußen Münster",
    # French
    "Paris Saint-Germain":     "Paris Saint-Germain F.C.",
    "Saint-Etienne":           "AS Saint-Étienne",
    "SM Caen":                 "Stade Malherbe Caen",
    # Spanish
    "Atletico Madrid":         "Atlético de Madrid",
    "Real Valladolid":         "Real Valladolid CF",
    "Racing Santander":        "Racing de Santander",
    "Sporting Gijon":          "Real Sporting de Gijón",
    "CD Castellon":            "CD Castellón",
    # Italian
    "Hellas Verona":           "Hellas Verona F.C.",
    "AS Roma":                 "A.S. Roma",
    "AC Milan":                "A.C. Milan",
    "Inter Milan":             "Inter Milan",
    "Brescia Calcio":          "Brescia Calcio",
    "Juve Stabia":             "S.S. Juve Stabia",
    # Portuguese
    "Vitoria de Guimaraes":    "Vitória S.C.",
    "Pacos de Ferreira":       "F.C. Paços de Ferreira",
    "GD Chaves":               "G.D. Chaves",
    "Famalicao":               "F.C. Famalicão",
    # Dutch
    "AZ Alkmaar":              "AZ Alkmaar",
    "NEC Nijmegen":            "NEC Nijmegen",
    "Almere City":             "Almere City FC",
    # Belgian
    "Standard Liege":          "Standard Liège",
    "Zulte Waregem":           "S.V. Zulte Waregem",
    "Cercle Brugge":           "Cercle Brugge KSV",
    # Scottish
    "Dundee United":           "Dundee United F.C.",
    "Dunfermline Athletic":    "Dunfermline Athletic F.C.",
    "Hamilton Academical":     "Hamilton Academical F.C.",
    # Turkish
    "Istanbul Basaksehir":     "Istanbul Başakşehir F.K.",
    # Russian
    "CSKA Moscow":             "PFC CSKA Moscow",
    "Zenit St. Petersburg":    "FC Zenit Saint Petersburg",
    "Lokomotiv Moscow":        "FC Lokomotiv Moscow",
    "Spartak Moscow":          "FC Spartak Moscow",
    "FK Krasnodar":            "FC Krasnodar",
    "FK Rostov":               "FC Rostov",
    "Dinamo Moscow":           "FC Dynamo Moscow",
    "Rubin Kazan":             "FC Rubin Kazan",
    # Greek
    "Olympiacos":              "Olympiacos F.C.",
    "Panathinaikos":           "Panathinaikos F.C.",
    "Aris Thessaloniki":       "Aris F.C.",
    # Danish
    "FC Copenhagen":           "F.C. Copenhagen",
    "Brondby IF":              "Brøndby IF",
    "OB Odense":               "Odense Boldklub",
    # Norwegian
    "Rosenborg BK":            "Rosenborg BK",
    "Bodo/Glimt":              "FK Bodø/Glimt",
    # Swedish
    "IFK Goteborg":            "IFK Göteborg",
    "Djurgardens IF":          "Djurgårdens IF",
    "Malmo FF":                "Malmö FF",
    "IFK Norrkoping":          "IFK Norrköping",
    "Orebro SK":               "Örebro SK",
    "Ostersunds FK":           "Östersunds FK",
    # Swiss
    "Grasshopper Club":        "Grasshopper Club Zürich",
    # Austrian
    "FK Austria Wien":         "FK Austria Wien",
    "SK Rapid Wien":           "SK Rapid Wien",
    "FC Red Bull Salzburg":    "FC Red Bull Salzburg",
    "SK Sturm Graz":           "SK Sturm Graz",
    # Ukrainian
    "Shakhtar Donetsk":        "FC Shakhtar Donetsk",
    # Brazilian
    "Flamengo":                "Clube de Regatas do Flamengo",
    "Palmeiras":               "Sociedade Esportiva Palmeiras",
    "Santos":                  "Santos FC",
    "Sao Paulo":               "São Paulo FC",
    "Gremio":                  "Grêmio Foot-Ball Porto Alegrense",
    "Cruzeiro":                "Cruzeiro Esporte Clube",
    "Botafogo":                "Botafogo de Futebol e Regatas",
    "Fluminense":              "Fluminense Football Club",
    "Corinthians":             "Sport Club Corinthians Paulista",
    "Atletico Mineiro":        "Clube Atlético Mineiro",
    "América Mineiro":         "América Futebol Clube (Belo Horizonte)",
    "Athletico Paranaense":    "Club Athletico Paranaense",
    "Bahia":                   "Esporte Clube Bahia",
    "Ceará":                   "Ceará Sporting Club",
    # Argentine
    "Boca Juniors":            "Club Atlético Boca Juniors",
    "River Plate":             "Club Atlético River Plate",
    "Racing Club":             "Racing Club de Avellaneda",
    "San Lorenzo":             "San Lorenzo de Almagro",
    "Independiente":           "Club Atlético Independiente",
    "Newell's Old Boys":       "Newell's Old Boys",
    "Vélez Sársfield":         "Club Atlético Vélez Sársfield",
    "Huracán":                 "Club Atlético Huracán",
    "Estudiantes de La Plata": "Club Estudiantes de La Plata",
    "Defensa y Justicia":      "Defensa y Justicia",
    "Atlético Tucumán":        "Club Atlético Tucumán",
    "Argentinos Juniors":      "Argentinos Juniors",
    "Godoy Cruz":              "Godoy Cruz Antonio Tomba",
    "Talleres Córdoba":        "Club Atlético Talleres (Córdoba)",
    # Chilean
    "Colo-Colo":               "Colo-Colo",
    "Universidad de Chile":    "Club Universidad de Chile",
    "Universidad Católica":    "Club Deportivo Universidad Católica",
    # Colombian
    "América de Cali":         "América de Cali",
    "Atlético Nacional":       "Atlético Nacional",
    "Independiente Santa Fe":  "Independiente Santa Fe",
    "Junior de Barranquilla":  "Atlético Junior",
    "Millonarios":             "Millonarios FC",
    # Mexican
    "Club América":            "Club América",
    "Club León":               "Club León",
    "Guadalajara":             "Club Deportivo Guadalajara",
    "Cruz Azul":               "Cruz Azul",
    "Pumas UNAM":              "Club Universidad Nacional",
    "CF Monterrey":            "CF Monterrey",
    "Tigres UANL":             "Tigres UANL",
    "FC Juárez":               "FC Juárez",
    "Mazatlán FC":             "Mazatlán FC",
    "Querétaro FC":            "Querétaro FC",
    "Santos Laguna":           "Santos Laguna",
    "Club Tijuana":            "Club Tijuana",
    # MLS
    "New York Red Bulls":      "New York Red Bulls",
    "LA Galaxy":               "LA Galaxy",
    "LAFC":                    "Los Angeles FC",
    "Atlanta United":          "Atlanta United FC",
    "Inter Miami":             "Inter Miami CF",
    "Columbus Crew":           "Columbus Crew",
    "Seattle Sounders":        "Seattle Sounders FC",
    "Portland Timbers":        "Portland Timbers",
    "New England Revolution":  "New England Revolution",
    "Sporting Kansas City":    "Sporting Kansas City",
    "D.C. United":             "D.C. United",
    "Toronto FC":              "Toronto FC",
    "Vancouver Whitecaps":     "Vancouver Whitecaps FC",
    "Houston Dynamo":          "Houston Dynamo FC",
    "CF Montréal":             "CF Montréal",
    "Minnesota United":        "Minnesota United FC",
    "FC Dallas":               "FC Dallas",
    "San Jose Earthquakes":    "San Jose Earthquakes",
    "Colorado Rapids":         "Colorado Rapids",
    "FC Cincinnati":           "FC Cincinnati",
    "Nashville SC":            "Nashville SC",
    "Austin FC":               "Austin FC",
    "Charlotte FC":            "Charlotte FC",
    "Chicago Fire":            "Chicago Fire FC",
    "Orlando City":            "Orlando City SC",
    "Philadelphia Union":      "Philadelphia Union",
    "Real Salt Lake":          "Real Salt Lake",
    "St. Louis City SC":       "St. Louis City SC",
    "D.C. United":             "D.C. United",
    # Saudi
    "Al-Hilal":                "Al-Hilal FC",
    "Al-Nassr":                "Al-Nassr FC",
    "Al-Ahli":                 "Al-Ahli Saudi FC",
    "Al-Ittihad":              "Al-Ittihad Club",
    # Japanese
    "Urawa Reds":              "Urawa Red Diamonds",
    "Gamba Osaka":             "Gamba Osaka",
    "Kashima Antlers":         "Kashima Antlers",
    "Vissel Kobe":             "Vissel Kobe",
    # South Korean
    "Jeonbuk Motors":          "Jeonbuk Hyundai Motors FC",
    "Daegu FC":                "Daegu FC",
    # Chinese
    "Shanghai Port":           "Shanghai Port FC",
    # Czech
    "Viktoria Plzen":          "FC Viktoria Plzeň",
    # Israeli
    "Hapoel Jerusalem":        "Hapoel Jerusalem F.C.",
    # Indian
    "Hyderabad FC":            "Hyderabad FC",
}


def _is_badge_url(url: str) -> bool:
    """Return True if the Wikipedia thumbnail looks like a club badge/crest.

    Strategy:
      1. SVG-derived thumbnails (.svg.png) → almost always a vector logo.
      2. JPEG files (.jpg/.jpeg) → almost always a photo, not a badge. Reject.
      3. PNG with an explicit badge keyword → accept.
      4. PNG with a city/architecture/landscape keyword → reject.
      5. Plain PNG with no strong signal → accept (e.g. "Deportes_Iquique.png").
    """
    lower = url.lower()

    # 0. Flag/coat-of-arms of a political entity — not a club badge
    flag_kw = ["bandeira_", "_bandeira", "bandera_", "_bandera",
               "flag_of_", "_flag_", "drapeau_", "flagge_",
               "coat_of_arms", "wappen_von", "brasao_", "armoiries_"]
    if any(kw in lower for kw in flag_kw):
        return False

    # 1. SVG → logo
    if ".svg.png" in lower:
        return True

    # 2. JPEG → photo (city photos are stored as JPEG, logos rarely are)
    if ".jpg" in lower or ".jpeg" in lower:
        return False

    # 3. Explicit badge keyword
    badge_kw = ["logo", "badge", "crest", "emblem", "shield", "wappen",
                "escudo", "blason", "seal", "stemma", "insigne", "heraldry"]
    if any(kw in lower for kw in badge_kw):
        return True

    # 4. City / architecture / landscape patterns — these are NOT badges
    reject_kw = [
        "panoram", "aerial", "_aeri", "skylin", "cityscape",
        "town_hall", "rathaus", "stadhuis", "hotel_de_ville",
        "river_", "_river", "lago_", "_lake", "_sea_", "harbour", "harbor",
        "bridge_", "_bridge", "pont_", "brücke",
        "cathedral", "cathedral_", "_cathedral", "dom_", "_dom_", "duomo",
        "church_", "_church", "chiesa", "kirche", "kapelle", "sacre", "sacred",
        "castle_", "_castle", "schloss", "chateau", "alcazaba", "alcazar",
        "palazzo", "palacio", "piazza_", "_piazza", "plaza_", "avenida",
        "lungomare", "promenade",
        "reggia", "palazzo",
        "collage_", "_collage",
        "dsc_", "img_0", "img_1", "p10", "p20",   # generic camera filenames
        "_and_its_", "_with_its_",
        "stadtmitte", "innenstadt", "ortskern", "stadtzentrum",
        "panoramica", "panoramica_",
        "memorial_", "_memorial", "monument_",
    ]
    if any(kw in lower for kw in reject_kw):
        return False

    # 5. Plain PNG — accept (likely named after the club itself)
    return True


def search_logo(club_name: str) -> str | None:
    """Return a badge URL for the club from Wikipedia, or None if not found."""
    title = WIKIPEDIA_OVERRIDES.get(club_name, club_name)
    if title in _cache:
        return _cache[title]

    encoded = requests.utils.quote(title.replace(" ", "_"), safe="")
    try:
        resp = requests.get(
            f"{WIKIPEDIA_API}/{encoded}",
            headers={"User-Agent": "ClubLinkBot/1.0 (football trivia game; contact hyileenet@gmail.com)"},
            timeout=10,
        )
        if resp.status_code == 200:
            data = resp.json()
            thumb = (data.get("thumbnail") or {}).get("source")
            if thumb and _is_badge_url(thumb):
                _cache[title] = thumb
                return thumb
        elif resp.status_code == 404:
            pass  # article not found — not found
        else:
            print(f"    [warn] Wikipedia HTTP {resp.status_code} for '{title}'", flush=True)
    except Exception as e:
        print(f"    [warn] Wikipedia error for '{title}': {e}", flush=True)

    _cache[title] = None
    return None

# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Fetch missing club logos via Wikipedia")
    parser.add_argument("--apply", action="store_true",
                        help="Apply updates directly to Supabase (needs SUPABASE_SERVICE_ROLE_KEY)")
    parser.add_argument("--delay", type=float, default=0.3,
                        help="Seconds between API calls (default 0.3)")
    args = parser.parse_args()

    if args.apply and not SERVICE_KEY:
        print("ERROR: --apply requires SUPABASE_SERVICE_ROLE_KEY in env")
        sys.exit(1)

    # Clubs with this domain in their logo_url have the corrupted Arsenal badge.
    CORRUPT_DOMAIN = "r2.thesportsdb.com"

    print("Fetching all clubs from Supabase…")
    all_clubs = supabase_get("clubs?select=id,name,league,logo_url&order=league,name")

    # Skip clubs that already have a correct (non-TheSportsDB) logo.
    clubs = [c for c in all_clubs if not c.get("logo_url") or CORRUPT_DOMAIN in c["logo_url"]]
    skipped = len(all_clubs) - len(clubs)
    print(f"Total clubs: {len(all_clubs)}  |  Already have correct logo: {skipped}  |  Need update: {len(clubs)}\n")

    found: list[tuple[int, str, str]] = []    # (id, name, new_logo_url)
    reset: list[tuple[int, str]] = []         # (id, name) — had Arsenal logo, no Wikipedia match
    not_found: list[tuple[int, str]] = []     # (id, name) — was null, no Wikipedia match

    for club in clubs:
        cid    = club["id"]
        cname  = club["name"]
        league = club.get("league", "")
        had_corrupt = bool(club.get("logo_url"))
        print(f"  [{cid:4d}] {cname} ({league})", end="  … ", flush=True)
        logo = search_logo(cname)
        if logo:
            print(f"✓  {logo[:70]}…" if len(logo) > 70 else f"✓  {logo}")
            found.append((cid, cname, logo))
        else:
            print("✗  not found")
            if had_corrupt:
                reset.append((cid, cname))   # reset Arsenal logo → NULL
            else:
                not_found.append((cid, cname))
        time.sleep(args.delay)

    # ── Write SQL migration ────────────────────────────────────────────────
    out_path = Path(__file__).parent.parent / "supabase" / "migrations" / "017_missing_logos.sql"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("-- ============================================================\n")
        f.write("-- Migration 017 — Fix all club logos (replace corrupted TheSportsDB\n")
        f.write("--                 Arsenal badges, fill nulls) via Wikipedia.\n")
        f.write(f"-- Generated by scripts/find_missing_logos.py\n")
        f.write(f"-- Updated: {len(found)}  |  Reset to NULL: {len(reset)}  |  Still missing: {len(not_found)}\n")
        f.write("-- ============================================================\n\n")

        if found:
            f.write("-- ── Found via Wikipedia ────────────────────────────────────────\n")
            for cid, cname, logo in found:
                safe_name = cname.replace("'", "''")
                f.write(f"UPDATE clubs SET logo_url = '{logo}' WHERE id = {cid}; -- {safe_name}\n")

        if reset:
            f.write(f"\n-- ── Had Arsenal badge, no Wikipedia match — reset to NULL ─────\n")
            for cid, cname in reset:
                safe_name = cname.replace("'", "''")
                f.write(f"UPDATE clubs SET logo_url = NULL WHERE id = {cid}; -- {safe_name}\n")

        if not_found:
            f.write(f"\n-- ── Were already NULL, still no match ({len(not_found)} clubs) ──────────\n")
            f.write("-- Add an entry to WIKIPEDIA_OVERRIDES and re-run, or fill in manually.\n")
            for cid, cname in not_found:
                safe_name = cname.replace("'", "''")
                f.write(f"-- UPDATE clubs SET logo_url = '' WHERE id = {cid}; -- {safe_name}\n")

    print(f"\nSQL migration written to: {out_path}")
    print(f"  {len(found)} logos found  |  {len(reset)} reset to NULL  |  {len(not_found)} still missing")

    # ── Optional: apply directly ───────────────────────────────────────────
    if args.apply:
        print("\nApplying updates to Supabase…")
        applied = 0
        for cid, cname, logo in found:
            try:
                supabase_patch("clubs", cid, logo, SERVICE_KEY)
                applied += 1
                print(f"  ✓ {cname}")
            except Exception as e:
                print(f"  ✗ {cname}: {e}")
        for cid, cname in reset:
            try:
                supabase_patch("clubs", cid, None, SERVICE_KEY)
                applied += 1
                print(f"  ✓ {cname} (reset to NULL)")
            except Exception as e:
                print(f"  ✗ {cname}: {e}")
        print(f"\nApplied {applied}/{len(found) + len(reset)} updates.")

    if not_found:
        print(f"\nNote: {len(not_found)} clubs still have no logo.")
        print("Add entries to WIKIPEDIA_OVERRIDES in this script, then re-run.")

if __name__ == "__main__":
    main()
