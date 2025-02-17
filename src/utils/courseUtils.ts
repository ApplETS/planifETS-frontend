import type { CourseInstance, CourseStatus } from '@/types/course';
import type { YearData } from '@/types/planner';
import type { SessionName, SessionTiming } from '@/types/session';

export const determineInitialStatus = (sessionTiming: SessionTiming): CourseStatus => {
  if (sessionTiming.isCurrent) {
    return 'In Progress';
  }

  if (sessionTiming.isPast) {
    return 'Completed';
  }

  return 'Planned';
};

export const findCourseInPlanner = (
  plannerData: YearData[],
  courseId: number,
): { yearData: YearData; sessionName: SessionName; courseInstance: CourseInstance } | null => {
  for (const yearData of plannerData) {
    for (const session of yearData.sessions) {
      const courseInstance = session.courseInstances.find(ci => ci.courseId === courseId);
      if (courseInstance) {
        return { yearData, sessionName: session.sessionName, courseInstance };
      }
    }
  }
  return null;
};

type SessionUpdate = (courseInstances: CourseInstance[]) => CourseInstance[];

const updateYearSession = (
  yearData: YearData,
  sessionName: SessionName,
  updateFn: SessionUpdate,
): YearData => ({
  ...yearData,
  sessions: yearData.sessions.map(session =>
    session.sessionName === sessionName
      ? {
        ...session,
        courseInstances: updateFn(session.courseInstances),
      }
      : session,
  ),
});

export const addCourseToSession = (
  yearData: YearData,
  sessionName: SessionName,
  courseId: number,
  status: CourseStatus = 'Planned',
): YearData => {
  return updateYearSession(yearData, sessionName, (courseInstances) => {
    if (courseInstances.some(ci => ci.courseId === courseId)) {
      return courseInstances;
    }
    return [...courseInstances, { courseId, status }];
  });
};

export const removeCourseFromSession = (
  yearData: YearData,
  sessionName: SessionName,
  courseId: number,
): YearData => {
  return updateYearSession(yearData, sessionName, courseInstances =>
    courseInstances.filter(ci => ci.courseId !== courseId));
};

export const updateCourseStatus = (
  yearData: YearData,
  sessionName: SessionName,
  courseId: number,
  status: CourseStatus,
): YearData => {
  return updateYearSession(yearData, sessionName, courseInstances =>
    courseInstances.map(ci =>
      ci.courseId === courseId ? { ...ci, status } : ci,
    ));
};

export const moveCourseToSession = (
  yearData: YearData,
  fromSessionName: SessionName,
  toSessionName: SessionName,
  courseId: number,
  newStatus: CourseStatus,
): YearData => {
  const updatedYearData = removeCourseFromSession(yearData, fromSessionName, courseId);
  return updateYearSession(updatedYearData, toSessionName, courseInstances => [
    ...courseInstances,
    { courseId, status: newStatus },
  ]);
};
