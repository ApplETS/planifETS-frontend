import type { Page } from '@playwright/test';
import type { ProgramCoursesResponseDto } from '@/api/types/program';
import { PROGRAM_COURSES_RESPONSE } from './data/program-courses';

function jsonResponse(status: number, body: unknown) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function filterCoursesByIds(courseIds: number[]): ProgramCoursesResponseDto {
  const courseIdSet = new Set(courseIds);

  return {
    ...PROGRAM_COURSES_RESPONSE,
    data: PROGRAM_COURSES_RESPONSE.data.map(program => ({
      ...program,
      courses: program.courses.filter(course => courseIdSet.has(course.id)),
    })).filter(program => program.courses.length > 0), // Remove programs with no matching courses
  };
}

export function registerProgramCoursesRoutes(page: Page) {
  // /program-courses/programs?programCodes=7084
  page.route('**/program-courses/programs**', (route) => {
    route.fulfill(jsonResponse(200, PROGRAM_COURSES_RESPONSE));
  });

  // /program-courses/ids?courseIds=349682&courseIds=352021
  page.route('**/program-courses/ids**', (route) => {
    const url = new URL(route.request().url());
    const courseIds = url.searchParams.getAll('courseIds').map(id => Number.parseInt(id, 10));

    const filteredResponse = filterCoursesByIds(courseIds);
    route.fulfill(jsonResponse(200, filteredResponse));
  });

  // /program-courses/details
  page.route('**/program-courses/details**', (route) => {
    route.fulfill(jsonResponse(200, PROGRAM_COURSES_RESPONSE.data[0]));
  });
}
