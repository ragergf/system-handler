# System Handler v2.0

Futuristic engineering learning platform built with React + Vite + React Router.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Add your images

Copy these two files into the `public/` folder:
- `logo.png` — your System Handler logo
- `handler-paths.jpg` — the paths illustration shown on the learning page

## Project Structure

```
src/
├── App.jsx                   # Root — BrowserRouter + LangProvider + Routes
├── main.jsx
├── index.css
├── pages/
│   ├── LearningPage.jsx      # / (homepage)
│   ├── CommunityPage.jsx     # /community
│   ├── AboutPage.jsx         # /about
│   └── SocialPage.jsx        # /social
├── components/
│   ├── Navbar.jsx
│   ├── GridBackground.jsx
│   ├── LearningTopicCard.jsx # Progress bar + completed badge
│   ├── SubtopicItem.jsx      # Checkbox + auto-mark on link click
│   └── Footer.jsx
├── hooks/
│   ├── useProgress.js        # localStorage → ready for Phase 2 DB migration
│   └── useTopics.js          # local data → ready for Phase 2 API migration
├── data/
│   └── topics.js             # Visual data only (id, icon, color)
└── i18n/
    ├── index.js              # Context + auto browser detection
    ├── en.js                 # English text + links
    └── es.js                 # Spanish text + links
```

## Phase 2 Migration Guide

### Progress → Database
Open `src/hooks/useProgress.js` and replace the localStorage internals
with your API calls. Components don't change.

### Topics → API
Open `src/hooks/useTopics.js` and replace the local data merge
with a fetch to your backend. Components don't change.

### Auth (Login with Google / Facebook / LinkedIn / TikTok)
Add your auth provider in `src/App.jsx` wrapping the existing providers.
Connect `useProgress` to save by `userId` instead of a generic key.
