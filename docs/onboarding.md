# Onboarding

## Requirements

- Node.js 22
- Yarn
- A running PlanifETS backend, or another reachable API URL
- VS Code

## Optional

- Docker Desktop

## Option A - Docker (recommended)

### 1. Clone the project

```bash
git clone git@github.com:ApplETS/planifETS-frontend.git
cd planifETS-frontend
```

### 2. Create the environment file

```bash
cp .env.example .env
```

> **Note:** On Windows, port `3000` may be reserved by Hyper-V. The compose file maps the app to host port `3500` to avoid conflicts.

### 3. Start the backend

Start the backend stack first — see the [backend onboarding](https://github.com/ApplETS/planifETS-backend/blob/main/docs/onboarding.md).

The frontend will connect to `http://localhost:3501/api` by default when running via Docker.

### 4. Start the app

> **Warning:** Hot-reload does not work with Docker on Windows. The Next.js Turbopack watcher relies on filesystem events that are not propagated across the WSL2/Windows boundary. Use [Option B](#option-b---local-setup) if you need hot-reload during development.

**Development** (source mounted as volume):

```bash
docker compose --profile dev up --build
```

**Production** (full optimized build):

```bash
docker compose --profile production up --build
```

Once running, open `http://localhost:3500`.

---

## Option B - Local setup

### 1. Clone the project

```bash
git clone git@github.com:ApplETS/planifETS-frontend.git
cd planifETS-frontend
yarn install
```

If you use `nvm`, run `nvm use` first.

### 2. Create the environment file

Duplicate `.env.example` in the project root and rename the copy to `.env`.

### 3. Start the backend

- Backend repo: `https://github.com/ApplETS/planifETS-backend`
- Default local API URL: `http://localhost:3001/api`

If you already have a running backend, reuse its URL in `.env`.

### 4. Start the app

```bash
yarn dev
```

Once the dev server is running, open `http://localhost:3000`.

### 5. Verify the setup

To verify that the project builds correctly:

```bash
yarn build
```

Have fun! 🛹🐒

## References

- [Next.js in 100 Seconds](https://www.youtube.com/watch?v=Sklc_fQBmcs)
- [the most important Next.js features to learn (in 8 minutes)](https://www.youtube.com/watch?v=LkDelp5WWYU)
- [Getting Started: Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Writing tests | Playwright](https://playwright.dev/docs/writing-tests)
