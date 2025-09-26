# ChainSim Frontend (React + Vite)

This is the ChainSim frontend app built with React, TypeScript, Tailwind, and Vite.

## Quick Start

1) Install deps

```bash
npm install
```

2) Run dev server

```bash
npm run dev
```

Vite runs at http://localhost:5173 and auto-opens.

Open your browser automatically:

```bash
# Cross-platform default browser
npm run open
```

To open a specific browser on macOS:

```bash
# macOS helpers
npm run open:chrome
npm run open:edge
npm run open:firefox
npm run open:arc

# Start and open Chrome together
npm run dev:chrome
```

## Environment

Create a `.env.local` or copy from `env.example`.

```env
VITE_API_URL=http://localhost:5001/api
```

This should point to the backend API. Start the backend first if you want login and live analytics to work.

## Notes

- The top-right Login/Register dialog talks to `/api/auth` endpoints.
- Analytics page includes a “Live Platform Analytics” panel fetched from the backend.
- Stripe components are present but require real keys to be fully functional.
