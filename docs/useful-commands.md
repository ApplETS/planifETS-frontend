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

```bash
# Development (hot reload)
docker compose --profile dev up --build

# Production
docker compose --profile production up --build

# Rebuild and wipe anonymous volumes (e.g. after dependency changes)
docker compose --profile dev up --build -V
```
