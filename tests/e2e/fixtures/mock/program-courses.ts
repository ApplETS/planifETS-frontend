import type { Page } from '@playwright/test';
import { PROGRAM_COURSES_RESPONSE } from './data/program-courses';

function jsonResponse(status: number, body: unknown) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export function registerProgramCoursesRoutes(page: Page) {
  // /program-courses/programs
  page.route('**/program-courses/programs**', (route) => {
    route.fulfill(jsonResponse(200, PROGRAM_COURSES_RESPONSE));
  });

  // /program-courses/ids?courseIds=349682&courseIds=352021
  page.route('**/program-courses/ids**', (route) => {
    route.fulfill(jsonResponse(200, PROGRAM_COURSES_RESPONSE));
  });

  // /program-courses/details
  page.route('**/program-courses/details**', (route) => {
    route.fulfill(jsonResponse(200, PROGRAM_COURSES_RESPONSE.data[0]));
  });
}
