import type { Page } from '@playwright/test';
import { registerProgramCoursesRoutes } from './program-courses';
import { registerProgramRoutes } from './programs';
import { registerSessionsRoutes } from './sessions';

export default function enableMockApi(page: Page) {
  // Register all endpoint handlers
  registerProgramRoutes(page);
  registerProgramCoursesRoutes(page);
  registerSessionsRoutes(page);
}
