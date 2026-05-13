# UNDERSTATE — Şehir & Devlet Simülasyonu

A Turkish-language city/state simulation game built with React (compiled in-browser via Babel standalone) and served via Express.js.

## Project Structure

```
/
├── server.js          — Express.js server (port 5000)
├── package.json       — Dependencies (express)
├── public/
│   └── index.html     — Full game (HTML shell + JSX compiled by Babel)
└── attached_assets/   — Original source file (9MB monolith)
```

## Architecture

The game is a single-page React application that:
1. Loads CSS, Firebase SDK, and CDN libraries (React, Babel) from `<head>`
2. On first visit: Babel standalone compiles the JSX game code (~3MB) to JS and caches it in IndexedDB (`compiled_v95_babel`)
3. On subsequent visits: loads compiled JS directly from IndexedDB (fast)
4. Firebase is used for multi-player data; falls back gracefully to localStorage in offline mode

## How to Run

```bash
npm install
node server.js
```

Server listens on port 5000. The game compiles JSX on first load (15–30s), then loads instantly from cache.

## Fixes Applied (v94→v95)

- **Login music removed** — 5.4MB base64 audio data stripped from HTML
- **Edu packages** — Changed from 7/30/90 days to 1/2/3 days (₺1,000 / ₺2,000 / ₺3,000)
- **Ministry buttons** — İçişleri/Maliye/Ticaret/Sağlık/Adalet buttons now route to `positionpanel` (was routing to non-existent pages)
- **Job earnings** — Reduced ~40%, cooldown times doubled (harder to earn)
- **Leaderboard ranking** — Formula: `money + bankMoney + score×50`
- **New player guide** — Tutorial modal shown to new players on first login; accessible from menu
- **Babel compile step** — `compileAndRun()` now calls `Babel.transform()` for proper JSX compilation

## User Preferences

- Game is Turkish-language; all UI text should remain in Turkish
- Keep the dark red (#D00000) / dark (#050505) theme
- Firebase offline mode is acceptable in development
