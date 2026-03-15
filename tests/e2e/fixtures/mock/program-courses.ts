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

export function registerProgramCoursesRoutes(page: Page) {
  // /program-courses/programs?programCodes=7084
  page.route('**/program-courses/programs**', (route) => {
    const url = new URL(route.request().url());
    const programCodes = url.searchParams.getAll('programCodes');

    const filteredResponse = programCodes.length > 0
      ? filterProgramsByCodes(programCodes)
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

  // /program-courses/details
  page.route('**/program-courses/details**', (route) => {
    const detailedProgramCourse = {
      courseId: 352413,
      programId: 182848,
      type: 'TRONC',
      typicalSessionIndex: 3,
      unstructuredPrerequisite: 'LOG121',
      course: {
        code: 'LOG210',
        title: 'Analyse et conception de logiciels',
        credits: 4,
        description: 'Au terme de ce cours, l’étudiante ou l’étudiant sera en mesure : de maîtriser et appliquer des patrons de conception logicielle;de concevoir un logiciel orienté objet en appliquant un ensemble de principes et des méthodes heuristiques de génie logiciel; de réaliser un logiciel en suivant un processus itératif et évolutif incluant les activités d\'analyse et de conception par objets. Méthodes et techniques de modélisation orientés objet, langage de modélisation, cas...',
        cycle: 1,
        courseInstances: [
          {
            availability: [
              'JOUR',
            ],
            sessionYear: 2025,
            sessionTrimester: 'AUTOMNE',
            session: {
              trimester: 'AUTOMNE',
              year: 2025,
            },
          },
          {
            availability: [
              'JOUR',
              'SOIR',
            ],
            sessionYear: 2026,
            sessionTrimester: 'HIVER',
            session: {
              trimester: 'HIVER',
              year: 2026,
            },
          },
          {
            availability: [
              'JOUR',
            ],
            sessionYear: 2026,
            sessionTrimester: 'ETE',
            session: {
              trimester: 'ETE',
              year: 2026,
            },
          },
          {
            availability: [
              'JOUR',
            ],
            sessionYear: 2026,
            sessionTrimester: 'AUTOMNE',
            session: {
              trimester: 'AUTOMNE',
              year: 2026,
            },
          },
          {
            availability: [
              'JOUR',
              'SOIR',
            ],
            sessionYear: 2027,
            sessionTrimester: 'HIVER',
            session: {
              trimester: 'HIVER',
              year: 2027,
            },
          },
          {
            availability: [
              'JOUR',
            ],
            sessionYear: 2027,
            sessionTrimester: 'ETE',
            session: {
              trimester: 'ETE',
              year: 2027,
            },
          },
        ],
      },
      prerequisites: [
        {
          prerequisite: {
            course: {
              id: 352405,
              code: 'LOG121',
              title: 'Conception orientée objet',
            },
          },
        },
      ],
    };

    route.fulfill(jsonResponse(200, detailedProgramCourse));
  });
}
