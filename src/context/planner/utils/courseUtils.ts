import type { Course } from '../types/Course';
import type { SessionName } from '../types/Session';
import type { YearData } from '../types/YearData';
import { isCourseAvailable, updateSessionCourses } from './sessionUtils';

export const findCourseInPlanner = (
  plannerData: YearData[],
  courseCode: string,
): { yearData: YearData; sessionName: SessionName; course: Course } | null => {
  for (const yearData of plannerData) {
    for (const session of yearData.sessions) {
      const course = session.courses.find(c => c.code === courseCode);
      if (course) {
        return { yearData, sessionName: session.name, course };
      }
    }
  }
  return null;
};

export const updateYearSession = (
  yearData: YearData,
  sessionName: string,
  updateFn: (courses: Course[]) => Course[],
): YearData => {
  return {
    ...yearData,
    sessions: yearData.sessions.map(session =>
      session.name === sessionName
        ? updateSessionCourses(session, updateFn(session.courses))
        : session,
    ),
  };
};

export const removeCourseFromSession = (
  yearData: YearData,
  sessionName: SessionName,
  courseCode: string,
): YearData => {
  return updateYearSession(yearData, sessionName, courses =>
    courses.filter(c => c.code !== courseCode));
};

export const addCourseToSession = (
  yearData: YearData,
  sessionName: SessionName,
  course: Course,
  forcedStatus?: Course['status'],
): YearData => {
  const isAvailable = isCourseAvailable(course, sessionName, yearData.year);
  const status
    = forcedStatus ?? ((isAvailable ? 'Planned' : 'Not Offered') as Course['status']);

  return updateYearSession(yearData, sessionName, (courses) => {
    const existingCourse = courses.find(c => c.code === course.code);
    if (existingCourse) {
      return courses.map(c => (c.code === course.code ? { ...c, status } : c));
    }
    return [...courses, { ...course, status }];
  });
};

export const updateCourseStatus = (
  yearData: YearData,
  sessionName: SessionName,
  courseCode: string,
  status: Course['status'],
): YearData => {
  return updateYearSession(yearData, sessionName, courses =>
    courses.map(c => (c.code === courseCode ? { ...c, status } : c)));
};
