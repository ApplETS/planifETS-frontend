# Onboarding

## Requirements

- Node.js 22
- Yarn
- A running PlanifETS backend, or another reachable API URL
- VS Code

## Optional

- Docker Desktop

## 1. Clone the project

```bash
git clone git@github.com:ApplETS/planifETS-frontend.git
cd planifETS-frontend
yarn install
```

If you use `nvm`, run `nvm use` first.

## 2. Create the environment file

Duplicate `.env.example` in the project root and rename the copy to `.env`.

## 3. Start the backend

- Backend repo: `https://github.com/ApplETS/planifETS-backend`
- Default local API URL: `http://localhost:3001/api`

If you already have a running backend, reuse its URL in `.env`.

## 4. Start the app

```bash
yarn dev
```

Once the dev server is running, open `http://localhost:3000`.

## 5. Verify the setup

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
