# Club Link — Technical Documentation

## Architecture Overview

Club Link is a serverless single-page application. There is no custom backend server. Instead, two managed cloud services cover all backend concerns:

- **Firebase Firestore** — realtime game state, matchmaking queue, global statistics, anonymous user identity
- **Supabase (PostgreSQL)** — persistent football data (clubs, players, appearances) and answer validation via SQL RPCs

The client is a React 19 + TypeScript SPA built with Vite.

```
Browser
  ├── React SPA (Vite build)
  │     ├── Firebase Firestore  ← realtime game state, presence, stats
  │     └── Supabase RPCs       ← club data, answer validation
  └── Web3Forms API             ← contact form email delivery
```

---

## Data Layer

### Firebase Firestore

Used for all ephemeral, realtime state. Three top-level collections:

#### `game_rooms/{roomId}`

The central document for a live game. Schema matches the `GameRoom` TypeScript interface (`src/types/game.ts`).

```
GameRoom {
  status:                 'waiting' | 'choosing' | 'countdown' | 'guessing' | 'finished' | 'disconnected'
  mode:                   'strangers' | 'friends' | 'single'
  maxRounds:              number          // always 5
  currentRound:           number
  hostId:                 string          // Firebase UID of the host player
  roomCode:               string | null   // 6-char code for friends mode only
  createdAt:              Timestamp
  disconnectedPlayerName: string | null

  players: {
    [uid: string]: PlayerState {
      displayName:   string
      score:         number
      ready:         boolean
      chosenClubId:  number | null
      chosenClubName:string | null
      currentGuess:  string | null
      hasSubmitted:  boolean
      lastSeen:      Timestamp | null     // presence heartbeat
    }
  }

  roundState: RoundState {
    clubA, clubB:        ClubInfo | null
    phase:               'guessing' | 'second_chance' | 'result' | null
    firstSubmitter:      string | null    // UID
    firstGuess:          string | null
    firstResult:         'correct' | 'wrong' | 'timeout' | null
    secondSubmitter:     string | null
    secondGuess:         string | null
    secondResult:        'correct' | 'wrong' | 'timeout' | null
    roundWinner:         string | null    // UID
    correctAnswer:       string | null
    validAnswers:        string[] | null
  }

  history: RoundHistory[]   // completed rounds
}
```

#### `matchmaking_queue/{entryId}`

One document per player searching for a match.

```
QueueEntry {
  uid:         string
  displayName: string
  joinedAt:    Timestamp
  status:      'waiting' | 'matched'
  roomId:      string | null
}
```

#### `app_stats/global`

Single document for global counters.

```
{ visits: number, gamesPlayed: number }
```

### Supabase (PostgreSQL)

Holds the permanent football database. Key tables:

- `clubs` — club id, name, logo URL
- `players` — player id, name
- `appearances` — player × club relationships (which player played for which club)

Key RPCs called from the client:

| RPC | Purpose |
|---|---|
| `search_clubs(query, max_results)` | Full-text club search for the selector |
| `validate_answer(guess, club_a_id, club_b_id)` | Returns `{ valid: boolean }` |
| `get_valid_players(club_a_id, club_b_id)` | Returns all valid answer strings for the result screen |
| `get_compatible_club(club_id)` | (Single player) returns a club that shares at least one player |

---

## Authentication

Firebase Anonymous Auth. On first load, `useAuth.ts` calls `signInAnonymously()` and persists the UID across sessions. The UID is the primary player identifier throughout the app — it is the key in `players` map in Firestore and determines who is the host.

---

## Game Flow

### Single Player

```
choosing → countdown (3s overlay) → guessing ──► result
                                         ↑            │
                                         └── next round (up to 5)
                                                       │ round 5
                                                       ▼
                                                    gameover
```

State is local React state only (no Firestore). `gamesPlayed` is incremented in Firestore when the final round completes.

### Multiplayer (Friends / Strangers)

The game room status is the master state machine. All transitions are Firestore writes.

```
waiting → choosing → countdown → guessing → [repeat for each round] → finished
                                                                     ↘ disconnected
```

Within the `guessing` status, `roundState.phase` is a sub-state machine:

```
guessing → second_chance → result
    ↑                         │
    └───── next round ◄───────┘
```

**Host orchestration pattern**: One player is designated the host (whoever created the room). Only the host's client runs the validation logic and writes game transitions. Guest players only write their guesses. This avoids the need for a backend server while ensuring a single source of truth.

The host watches Firestore via `onSnapshot` and drives transitions through six `useEffect` hooks in `GamePage.tsx`:

1. `waiting → choosing` — triggers when all players are ready
2. `choosing → countdown → guessing` — triggers when all players have chosen clubs; starts the 3.8s countdown
3. **First submission processing** — validates guess via Supabase RPC; transitions to `second_chance` or `result`
4. **Second submission processing** — validates the second player's guess; transitions to `result`
5. **Countdown overlay** — manages the visual countdown component
6. **Timer management** — starts/restarts the 10s circular timer based on phase

---

## Matchmaking (Play Online)

Matchmaking is done entirely client-side using a Firestore transaction — no Cloud Functions are involved.

1. Player A calls `joinQueue()` → writes a `waiting` entry to `matchmaking_queue`
2. A Firestore `onSnapshot` listener watches the queue collection
3. When Player B joins, both clients call `tryMatch()`
4. `tryMatch()` runs a `runTransaction()`:
   - Reads both queue entries — aborts if either is no longer `waiting`
   - Creates a new `game_rooms` document
   - Marks both entries as `matched` with the new `roomId`
5. Both clients see their queue entry update to `matched` and navigate to `/game/:roomId`

The transaction ensures that even if two pairs of players try to match each other simultaneously, only one valid room is created.

---

## Presence and Disconnect Detection

Because Firestore has no native server-side disconnect hooks (unlike Firebase Realtime Database), disconnect detection is implemented via a heartbeat system.

**Heartbeat (each player)**:
- Writes `players.{uid}.lastSeen: serverTimestamp()` immediately on entering an active game phase (`choosing`, `countdown`, `guessing`)
- Repeats every 5 seconds via `setInterval`

**Stale check (each player)**:
- Runs every 3 seconds
- Reads the opponent's `lastSeen` from `roomRef.current` (always-fresh closure ref)
- If `lastSeen` is more than 15 seconds old → writes `status: 'disconnected'` to the room
- If `lastSeen` is null (player exited before their first heartbeat) → uses a local `activePhaseEntryRef` timestamp; triggers disconnect if the active phase has been running for 20+ seconds without a heartbeat

Both players run the check independently. Whichever detects the stale heartbeat first writes the update; the second write (if it arrives) simply overwrites with the same value.

Worst-case detection latency: ~23 seconds (5s last heartbeat + 15s threshold + 3s check interval).

---

## Timer Architecture

`useTimer.ts` implements a `requestAnimationFrame` loop (not `setInterval`) for smooth sub-second UI updates. It exposes `secondsLeft`, `fraction` (0–1), and control methods `start`, `stop`, `reset`, `restart`.

**The key detail**: `restart()` increments a `restartKey` counter. The RAF `useEffect` depends on `[isRunning, duration, restartKey]`. Incrementing `restartKey` forces the effect to re-run and restart the loop even when `isRunning` was already `true` — solving a React 18 batched-update edge case where `reset() + start()` would produce no net change to `isRunning`.

---

## Key Files

```
src/
├── pages/
│   ├── GamePage.tsx          # All multiplayer game logic (host orchestration, timers, UI)
│   ├── SinglePlayerPage.tsx  # Self-contained single player game
│   ├── HomePage.tsx          # Landing page, mode selection, global stats
│   ├── LobbyPage.tsx         # Friends room creation and join
│   ├── MatchmakingPage.tsx   # Online matchmaking UI
│   └── ContactPage.tsx       # Web3Forms feedback form
│
├── hooks/
│   ├── useAuth.ts            # Firebase anonymous auth
│   ├── useGameRoom.ts        # Firestore onSnapshot subscription for a room
│   ├── useGameActions.ts     # Room creation, ready, club selection writes
│   ├── useMatchmaking.ts     # Queue join/leave, runTransaction matching
│   ├── useClubSearch.ts      # Supabase club search and compatible-club lookup
│   ├── useTimer.ts           # RAF-based countdown timer
│   └── useTheme.ts           # Dark/light theme persistence
│
├── components/
│   ├── CircularTimer.tsx     # SVG ring timer (used in guessing and choosing phases)
│   ├── ClubSelector.tsx      # Searchable club picker
│   ├── ClubDisplay.tsx       # Side-by-side club logo + name display
│   ├── CountdownOverlay.tsx  # 3-2-1 countdown between choosing and guessing
│   ├── GuessInput.tsx        # Text input for player name guesses
│   ├── RoundDots.tsx         # Progress dots showing round results
│   ├── RoundResult.tsx       # Post-round result card
│   ├── ScoreBoard.tsx        # Live score display
│   ├── RoomCodeDisplay.tsx   # 6-character room code with copy button
│   └── ThemeToggle.tsx       # Dark/light toggle button
│
├── config/
│   ├── firebase.ts           # Firebase app + Firestore + Auth init
│   └── supabase.ts           # Supabase client init
│
├── types/
│   ├── game.ts               # GameRoom, PlayerState, RoundState, GameStatus, etc.
│   └── database.ts           # Supabase table types (Club, Player, etc.)
│
└── utils/
    ├── crestUrl.ts           # Constructs club logo URLs
    ├── formatters.ts         # Display formatting helpers
    └── generateRoomCode.ts   # Random 6-char alphanumeric code generator
```

---

## Styling

No component library is used. All styles are inline via a per-file `S` constant object that maps design tokens to CSS custom properties:

```typescript
const S = {
  bg:       'var(--bg)',
  accent:   'var(--accent)',
  fontHead: "'Dela Gothic One', system-ui, sans-serif",
  // ...
}
```

CSS custom properties are defined in `src/index.css` for both light and dark themes and toggled via a `data-theme` attribute on `<html>`. The toggle state is persisted to `localStorage` via `useTheme.ts`.

---

## Environment Variables

| Variable | Used by |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase client init |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase client init |
| `VITE_FIREBASE_PROJECT_ID` | Firebase client init |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase client init |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase client init |
| `VITE_FIREBASE_APP_ID` | Firebase client init |
| `VITE_SUPABASE_URL` | Supabase client init |
| `VITE_SUPABASE_ANON_KEY` | Supabase client init |
| `VITE_WEB3FORMS_KEY` | Contact form submission |

All variables are prefixed `VITE_` so Vite exposes them to the browser bundle. **Restart the dev server after adding or changing any `.env` value.**
