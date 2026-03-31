import type { SearchCourseResult } from '@/api/types/course';
import type {
  CoursePrerequisiteDto,
  ProgramCourseDetailedDto,
} from '@/api/types/program';
import type { Course, CourseInstance, CourseStatus } from '@/types/course';
import type { YearData } from '@/types/planner';
import type { SessionTiming, TermEnum } from '@/types/session';

/**
 * Maps API course (from /api/program-courses/programs or /api/courses/search) to frontend Course type
 * Both endpoints now return the same unified Course structure
 */
export const mapApiCourseToAppCourse = (
  apiCourse: ProgramCourseDetailedDto | SearchCourseResult,
): Course | null => {
  if (!apiCourse?.code || !apiCourse?.id) {
    return null;
  }

  return {
    id: apiCourse.id,
    code: apiCourse.code,
    title: apiCourse.title,
    credits: apiCourse.credits,
    prerequisites: apiCourse.prerequisites.map((p: CoursePrerequisiteDto) => p.code),
    availability: apiCourse.sessionAvailability.map((sa) => sa.sessionCode),
    unstructuredPrerequisite: apiCourse.unstructuredPrerequisite || undefined,
    type: apiCourse.type,
    typicalSessionIndex: apiCourse.typicalSessionIndex,
  };
};

/**
 * Determines either structured prerequisites or unstructured prerequisite string to display
 */
const normalizePrerequisiteCode = (code: string): string =>
  code.trim().toUpperCase().replace(/\*$/, '');

export type PrerequisiteDisplayData = {
  structuredPrerquisites: string[];
  unstructuredPrerequisite: string | null;
};

export const getPrerequisiteDisplayData = (
  structuredPrerequisites: string[],
  unstructuredPrerequisite?: string | null,
): PrerequisiteDisplayData => {
  const normalizedUnstructured = unstructuredPrerequisite?.trim() || '';

  if (!normalizedUnstructured) {
    return {
      structuredPrerquisites: structuredPrerequisites,
      unstructuredPrerequisite: null,
    };
  }

  const structuredSet = new Set(structuredPrerequisites.map(normalizePrerequisiteCode));
  const normalizedUnstructuredCode = normalizePrerequisiteCode(normalizedUnstructured);

  const isFullyRedundant = structuredSet.has(normalizedUnstructuredCode);

  return {
    structuredPrerquisites: structuredPrerequisites,
    unstructuredPrerequisite: isFullyRedundant ? null : normalizedUnstructured,
  };
};

export const getDisplayedPrerequisites = (course: Course): string[] => {
  const displayData = getPrerequisiteDisplayData(course.prerequisites, course.unstructuredPrerequisite);

  if (displayData.structuredPrerquisites.length > 0) {
    return displayData.structuredPrerquisites;
  }

  if (displayData.unstructuredPrerequisite) {
    return [displayData.unstructuredPrerequisite];
  }

  return ['N/A'];
};

type TimingState = 'past' | 'current' | 'future';

type DetermineStatusArgs = {
  sessionTiming: SessionTiming;
  isKnownAvailability?: boolean;
  isCourseAvailable?: boolean;
};

export const determineStatus = ({
  sessionTiming,
  isKnownAvailability = false,
  isCourseAvailable = true,
}: DetermineStatusArgs): CourseStatus => {
  let timingState: TimingState;
  if (sessionTiming.isCurrent) {
    timingState = 'current';
  } else if (sessionTiming.isPast) {
    timingState = 'past';
  } else {
    timingState = 'future';
  }

  if (timingState === 'past') {
    return 'Completed';
  }

  if (!isKnownAvailability) {
    return 'Planned';
  }

  if (!isCourseAvailable) {
    return 'Not Offered';
  }

  return 'Offered';
};

type SessionUpdate = (courseInstances: CourseInstance[]) => CourseInstance[];

const updateYearSession = (
  yearData: YearData,
  sessionTerm: TermEnum,
  updateFn: SessionUpdate,
): YearData => ({
  ...yearData,
  sessions: yearData.sessions.map((session) =>
    session.sessionTerm === sessionTerm
      ? {
        ...session,
        courseInstances: updateFn(session.courseInstances),
      }
      : session,
  ),
});

export const addCourseToSession = (
  yearData: YearData,
  sessionTerm: TermEnum,
  courseId: number,
): YearData => {
  return updateYearSession(yearData, sessionTerm, (courseInstances) => {
    if (courseInstances.some((ci) => ci.courseId === courseId)) {
      return courseInstances;
    }
    return [...courseInstances, { courseId }];
  });
};

export const removeCourseFromSession = (
  yearData: YearData,
  sessionTerm: TermEnum,
  courseId: number,
): YearData => {
  return updateYearSession(yearData, sessionTerm, (courseInstances) =>
    courseInstances.filter((ci) => ci.courseId !== courseId));
};

export const moveCourseToSession = (
  yearData: YearData,
  fromSessionTerm: TermEnum,
  toSessionTerm: TermEnum,
  courseId: number,
): YearData => {
  if (fromSessionTerm === toSessionTerm) {
    return yearData;
  }
  const fromSession = yearData.sessions.find((session) => session.sessionTerm === fromSessionTerm);
  if (!fromSession?.courseInstances?.some((ci) => ci.courseId === courseId)) {
    return yearData;
  }
  const updatedYearData = removeCourseFromSession(yearData, fromSessionTerm, courseId);
  return updateYearSession(updatedYearData, toSessionTerm, (courseInstances) => [
    ...courseInstances,
    { courseId },
  ]);
};
