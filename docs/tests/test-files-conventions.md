# File naming

- `*.test.ts` (under `tests/unit/`): unit/component tests (Vitest)
- `*.spec.ts` / `*.e2e.ts` (under `tests/e2e/specs/`): end-to-end tests (Playwright)

# Folder structure

E2E tests live under `tests/e2e`:

- `specs/` - the actual test files. Playwright auto-discovers anything matching `testMatch` here (see `playwright.config.ts`).
- `fixtures/` - reusable setup helpers used by specs (`setupTestPage`, `selectProgram`, API mocks, etc.) so specs don't repeat boilerplate.

Shared static data lives under `tests/assets/`, notably `selectors.ts` for `data-testid` lookups.

# Test Suites

- `yarn test`: unit tests (Vitest)
- `yarn test:e2e`: Playwright end-to-end tests
- `yarn test:e2e:ui`: Playwright tests in UI mode
