import type { SearchCourseResult } from '@/api/types/course';
import type { CoursePrerequisiteDto, ProgramCourseDetailedDto } from '@/api/types/program';
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
  };
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
