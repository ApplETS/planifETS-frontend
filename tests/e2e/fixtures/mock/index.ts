import type { Page } from '@playwright/test';
import { registerCourseDetailsRoutes } from './course-details';
import { registerCourseSearchRoutes } from './course-search';
import { registerProgramCoursesRoutes } from './program-courses';
import { registerProgramRoutes } from './programs';
import { registerSessionsRoutes } from './sessions';

export default function enableMockApi(page: Page) {
  // Register all endpoint handlers
  registerCourseDetailsRoutes(page);
  registerProgramRoutes(page);
  registerProgramCoursesRoutes(page);
  registerSessionsRoutes(page);
  registerCourseSearchRoutes(page);
}
