import type { Page } from '@playwright/test';
import type { SessionDto } from '@/api/types/session';

function jsonResponse(status: number, body: unknown) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export function registerSessionsRoutes(page: Page) {
  page.route('**/sessions/latest-available**', (route) => {
    const session: SessionDto = {
      trimester: 'HIVER',
      year: 2027,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    route.fulfill(jsonResponse(200, session));
  });
}
