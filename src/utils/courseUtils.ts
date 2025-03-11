import type { CourseInstance, CourseStatus } from '@/types/course';
import type { YearData } from '@/types/planner';
import type { SessionEnum, SessionTiming } from '@/types/session';

export const determineInitialStatus = (sessionTiming: SessionTiming): CourseStatus => {
  if (sessionTiming.isCurrent) {
    return 'In Progress';
  }

  if (sessionTiming.isPast) {
    return 'Completed';
  }

  return 'Planned';
};

type SessionUpdate = (courseInstances: CourseInstance[]) => CourseInstance[];

const updateYearSession = (
  yearData: YearData,
  sessionTerm: SessionEnum,
  updateFn: SessionUpdate,
): YearData => ({
  ...yearData,
  sessions: yearData.sessions.map(session =>
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
    if (courseInstances.some(ci => ci.courseId === courseId)) {
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
  return updateYearSession(yearData, sessionTerm, courseInstances =>
    courseInstances.filter(ci => ci.courseId !== courseId));
};

export const updateCourseStatus = (
  yearData: YearData,
  sessionTerm: SessionEnum,
  courseId: number,
  status: CourseStatus,
): YearData => {
  return updateYearSession(yearData, sessionTerm, courseInstances =>
    courseInstances.map(ci =>
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
  return updateYearSession(updatedYearData, toSessionTerm, courseInstances => [
    ...courseInstances,
    { courseId, status: newStatus },
  ]);
};
