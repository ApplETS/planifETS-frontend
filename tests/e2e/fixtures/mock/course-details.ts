import type { Page } from '@playwright/test';
import {
  getDetailedProgramCourseFixture,
  getProgramsListByCourseIdFixture,
} from './data/course-details';

function jsonResponse(status: number, body: unknown) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export function registerCourseDetailsRoutes(page: Page) {
  page.route('**/programs/list/course/**', (route) => {
    const courseId = Number.parseInt(route.request().url().split('/').pop() ?? '', 10);
    const programs = Number.isNaN(courseId)
      ? []
      : getProgramsListByCourseIdFixture(courseId);

    route.fulfill(jsonResponse(200, programs));
  });

  page.route('**/program-courses/details**', (route) => {
    const url = new URL(route.request().url());
    const courseId = Number.parseInt(url.searchParams.get('courseId') ?? '', 10);
    const programId = Number.parseInt(url.searchParams.get('programId') ?? '', 10);
    const courseDetails = Number.isNaN(courseId) || Number.isNaN(programId)
      ? null
      : getDetailedProgramCourseFixture(courseId, programId);

    if (!courseDetails) {
      route.fulfill(jsonResponse(404, { message: 'Course details not found' }));
      return;
    }

    route.fulfill(jsonResponse(200, courseDetails));
  });
}
