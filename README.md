# Club Link

A football trivia game where you name a player who has played for two given clubs. Play solo, go head-to-head with a friend via room code, or get matched against a stranger online.

---

## How to Play

1. **Choose your club** — pick a football club you know well
2. **The mystery club** — a compatible opponent club is revealed
3. **Name a link** — type any player who has played for **both** clubs
4. **10 seconds per round** — you have a countdown timer for each guess
5. **5 rounds** — score as many correct answers as you can

### Multiplayer twist (turn-based)

- The first player to submit gets validated immediately
- If they're **correct** — round over, they score the point
- If they're **wrong** — the opponent gets a **10-second second chance** to steal the point
- If neither player answers — no point is awarded

---

## Game Modes

| Mode | Description |
|---|---|
| **Single Player** | Solo against the clock — 5 rounds, score tracking, no opponent |
| **Play Online** | Auto-matched against a random stranger via matchmaking queue |
| **Play with Friends** | Create a private room, share the 6-character room code |

---

## Features

- Real-time multiplayer via Firebase Firestore
- Disconnect detection — if a player goes offline mid-game, the other player is shown a disconnected screen within ~20 seconds
- 30-second club selection timer in multiplayer
- Dark / light theme toggle
- Global visit and games-played counters
- In-browser feedback form (no email client needed)
- Soccer ball favicon ⚽

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4, CSS custom properties |
| Routing | React Router v7 |
| Realtime / Auth | Firebase Firestore, Firebase Auth (anonymous) |
| Database / Validation | Supabase (PostgreSQL + RPCs) |
| Fonts | Dela Gothic One, DM Sans (Google Fonts) |
| Contact form | Web3Forms API |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore and Anonymous Auth enabled
- A Supabase project with the club/player database and RPCs deployed

### Environment Variables

Create a `.env` file in the project root:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

VITE_WEB3FORMS_KEY=
```

### Running Locally

```bash
npm install
npm run dev
```

### Building for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── config/           # Firebase and Supabase client setup
├── hooks/            # Custom React hooks
├── pages/            # Route-level page components
├── types/            # TypeScript interfaces
└── utils/            # Pure utility functions
```

---

## Feedback

Use the **Send Feedback** link on the home screen to submit bug reports or suggestions directly from the browser.
