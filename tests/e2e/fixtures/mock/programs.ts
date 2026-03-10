import type { Page, Route } from '@playwright/test';
import { PROGRAMS } from './data/programs';

function jsonResponse(status: number, body: unknown) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export function registerProgramRoutes(page: Page) {
  // /programs
  page.route('**/programs', (route: Route) => {
    const url = route.request().url();
    if (url.match(/\/programs(\?|$)/)) {
      route.fulfill(jsonResponse(200, PROGRAMS));
      return;
    }
    route.continue();
  });
}
