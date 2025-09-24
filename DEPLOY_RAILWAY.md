# Deploy on Railway

This guide walks you through deploying ChainSim (backend + frontend) to Railway without Docker.

## Overview

- Two Railway services in a single repo (monorepo):
  - Backend (Express + TypeScript)
  - Frontend (Vite + React)
- Database: MongoDB Atlas (recommended)

## Prerequisites

- GitHub repo containing this project.
- MongoDB Atlas cluster + connection string (recommended) or other managed Mongo URI.
- Railway account.

## 1) Create Railway Project

1. Go to Railway → New Project → Deploy from GitHub → select your repo.
2. Railway creates a project; you will add two services (backend, frontend) pointing to subfolders.

## 2) Backend Service

- Service root: `backend`
- Build & Run:
  - Install: `npm ci`
  - Build: `npm run build`
  - Start: `npm start`
- Port: Railway sets `PORT` automatically (server respects it and binds `0.0.0.0`).
- Health check: `GET /health`

### Required Env Vars

Set these in Railway → Backend service → Variables:

- `NODE_ENV=production`
- `MONGODB_URI=<your MongoDB Atlas URI>`
- `JWT_SECRET=<generate-strong-secret>`
- `JWT_EXPIRES_IN=7d` (optional)
- `FRONTEND_URL=https://<your-frontend-subdomain>.up.railway.app` (set after frontend deploy; you can deploy backend first and update later)

Optional:

- `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS`
- Stripe keys if you plan to enable Stripe routes.

## 3) Frontend Service

- Service root: `frontend`
- Build & Run:
  - Install: `npm ci`
  - Build: `npm run build`
  - Start: `npm run start` (uses `vite preview --port $PORT --host 0.0.0.0`)

### Required Env Vars

Set these in Railway → Frontend service → Variables:

- `VITE_API_URL=https://<your-backend-subdomain>.up.railway.app/api`

Optional:

- `VITE_APP_NAME`, `VITE_APP_VERSION`, `VITE_STRIPE_PUBLISHABLE_KEY`

## 4) Deploy Order

1. Deploy Backend first. Verify health:
   - `https://<backend>.up.railway.app/health`
2. Set `FRONTEND_URL` on Backend to your frontend domain.
3. Deploy Frontend. Open:
   - `https://<frontend>.up.railway.app`

## 5) Verify Auth Flow

1. In the frontend, click “Login / Register” (top-right).
2. Register with a test email/password.
3. Use Analytics to fetch live data from `/api/analytics/platform`.

## Notes

- CORS: Backend reads `FRONTEND_URL`. Ensure it matches the Railway frontend URL exactly (including protocol and domain).
- JWT: Keep `JWT_SECRET` secret. Rotate by increasing `tokenVersion` or regenerating `JWT_SECRET` (forces re-login).
- Stripe: Stripe routes are guarded; they return 503 unless keys are set.
- Logs: View service logs in Railway if any issue occurs.

## Troubleshooting

- 401/403 on protected routes: Ensure you are logged in and tokens are stored. Check browser console and network tab.
- CORS errors: Confirm `FRONTEND_URL` (backend) and `VITE_API_URL` (frontend) are set to the correct deployed domains.
- 5xx from backend: Verify `MONGODB_URI` is reachable from Railway (Atlas IP allowlist, correct credentials).

