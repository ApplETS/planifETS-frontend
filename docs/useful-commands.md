# Useful commands

```bash
yarn dev
yarn build
yarn lint
yarn typecheck
yarn test
yarn test:e2e:ui
```

## Docker

Run from the frontend directory. Docker development uses Webpack with 500 ms polling for hot reload, including Windows bind mounts. Local `yarn dev` still uses Turbopack.

Source edits hot-reload without rebuilding. Rebuild after changing the Dockerfile; use `-V` after dependency changes to replace the dependency and Next.js cache volumes.

```bash
# Development (Webpack hot reload with polling)
docker compose --profile dev up --build

# Production
docker compose --profile production up --build

# Rebuild and replace dependency/cache volumes after dependency changes
docker compose --profile dev up --build -V
```
