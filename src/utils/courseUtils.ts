import type { SearchCourseResult } from '@/api/types/course';
import type { CoursePrerequisiteDto, ProgramCourseDetailedDto } from '@/api/types/program';
import type { Course, CourseInstance, CourseStatus } from '@/types/course';
import type { YearData } from '@/types/planner';
import type { SessionEnum, SessionTiming } from '@/types/session';

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

const initialStatusByTiming: Record<TimingState, CourseStatus> = {
  past: 'Completed',
  current: 'In Progress',
  future: 'Planned',
};

type DetermineStatusArgs = {
  sessionTiming: SessionTiming;
  existingStatus?: CourseStatus;
  isKnownAvailability?: boolean;
  isCourseAvailable?: boolean;
};

export const determineStatus = ({
  sessionTiming,
  existingStatus,
  isKnownAvailability = false,
  isCourseAvailable = true,
}: DetermineStatusArgs): CourseStatus => {
  if (isKnownAvailability && !isCourseAvailable) {
    return 'Not Offered';
  }

  if (existingStatus) {
    return existingStatus;
  }

  const timingState: TimingState = sessionTiming.isCurrent
    ? 'current'
    : sessionTiming.isPast
      ? 'past'
      : 'future';

  return initialStatusByTiming[timingState];
};

type SessionUpdate = (courseInstances: CourseInstance[]) => CourseInstance[];

const updateYearSession = (
  yearData: YearData,
  sessionTerm: SessionEnum,
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
  sessionTerm: SessionEnum,
  courseId: number,
  status: CourseStatus = 'Planned',
): YearData => {
  return updateYearSession(yearData, sessionTerm, (courseInstances) => {
    if (courseInstances.some((ci) => ci.courseId === courseId)) {
      return courseInstances;
    }
    return [...courseInstances, { courseId, status }];
  });
};

export const removeCourseFromSession = (
  yearData: YearData,
  sessionTerm: SessionEnum,
  courseId: number,
): YearData => {
  return updateYearSession(yearData, sessionTerm, (courseInstances) =>
    courseInstances.filter((ci) => ci.courseId !== courseId));
};

export const updateCourseStatus = (
  yearData: YearData,
  sessionTerm: SessionEnum,
  courseId: number,
  status: CourseStatus,
): YearData => {
  return updateYearSession(yearData, sessionTerm, (courseInstances) =>
    courseInstances.map((ci) =>
      ci.courseId === courseId ? { ...ci, status } : ci,
    ));
};

export const moveCourseToSession = (
  yearData: YearData,
  fromSessionTerm: SessionEnum,
  toSessionTerm: SessionEnum,
  courseId: number,
  newStatus: CourseStatus,
): YearData => {
  const updatedYearData = removeCourseFromSession(yearData, fromSessionTerm, courseId);
  return updateYearSession(updatedYearData, toSessionTerm, (courseInstances) => [
    ...courseInstances,
    { courseId, status: newStatus },
  ]);
};
