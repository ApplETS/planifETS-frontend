import type { Page } from '@playwright/test';
import type { ProgramCoursesResponseDto } from '@/api/types/program';
import { PROGRAM_COURSES_RESPONSE } from './data/program-courses';
import { PROGRAMS } from './data/programs';

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
    data: PROGRAM_COURSES_RESPONSE.data.map((program) => ({
      ...program,
      courses: program.courses.filter((course) => courseIdSet.has(course.id)),
    })).filter((program) => program.courses.length > 0), // Remove programs with no matching courses
  };
}

function filterProgramsByCodes(programCodes: string[]): ProgramCoursesResponseDto {
  const programCodeSet = new Set(programCodes);

  return {
    ...PROGRAM_COURSES_RESPONSE,
    data: PROGRAM_COURSES_RESPONSE.data.filter((program) => programCodeSet.has(program.programCode)),
  };
}

function mapProgramIdsToCodes(programIds: string[]): string[] {
  const programIdSet = new Set(programIds.map((id) => Number.parseInt(id, 10)));

  return PROGRAMS
    .filter((program) => programIdSet.has(program.id))
    .map((program) => program.code);
}

export function registerProgramCoursesRoutes(page: Page) {
  // /program-courses/programs?programIds=182848
  page.route('**/program-courses/programs**', (route) => {
    const url = new URL(route.request().url());
    const programIds = url.searchParams.getAll('programIds');
    const requestedProgramCodes = mapProgramIdsToCodes(programIds);

    const filteredResponse = requestedProgramCodes.length > 0
      ? filterProgramsByCodes(requestedProgramCodes)
      : PROGRAM_COURSES_RESPONSE;

    route.fulfill(jsonResponse(200, filteredResponse));
  });

  // /program-courses/ids?courseIds=349682&courseIds=352021
  page.route('**/program-courses/ids**', (route) => {
    const url = new URL(route.request().url());
    const courseIds = url.searchParams.getAll('courseIds').map((id) => Number.parseInt(id, 10));

    const filteredResponse = filterCoursesByIds(courseIds);
    route.fulfill(jsonResponse(200, filteredResponse));
  });
}
