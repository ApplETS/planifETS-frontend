import type { Course, CourseInstance } from '@/types/course';

import type { Session, SessionName, SessionTiming } from '@/types/session';
import { SessionEnum } from '@/types/session';

const SESSION_MONTH_RANGES = {
  [SessionEnum.HIVER]: { start: 0, end: 3 }, // January - April
  [SessionEnum.ETE]: { start: 4, end: 7 }, // May - August
  [SessionEnum.AUTOMNE]: { start: 8, end: 11 }, // September - December
} as const;

export const generateSessionCode = (sessionName: SessionName, year: number): string => {
  return `${sessionName.charAt(0)}${year.toString().slice(-2)}`;
};

export const getCurrentSession = (month: number = new Date().getMonth()): SessionName => {
  if (month <= SESSION_MONTH_RANGES[SessionEnum.HIVER].end) {
    return SessionEnum.HIVER;
  }
  if (month <= SESSION_MONTH_RANGES[SessionEnum.ETE].end) {
    return SessionEnum.ETE;
  }
  return SessionEnum.AUTOMNE;
};

export const getSessionTiming = (sessionYear: number, sessionName: SessionName): SessionTiming => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentSession = getCurrentSession();

  const isFuture = sessionYear > currentYear || (
    sessionYear === currentYear && (
      (currentSession === SessionEnum.HIVER && sessionName !== SessionEnum.HIVER)
      || (currentSession === SessionEnum.ETE && sessionName === SessionEnum.AUTOMNE)
    )
  );

  const isCurrent = sessionYear === currentYear && sessionName === currentSession;
  const isPast = !isFuture && !isCurrent;

  return {
    isPast,
    isCurrent,
    isFuture,
  };
};

export const validateSessionOperation = (
  timing: SessionTiming,
  operation: string,
): string | null => {
  if (timing.isPast) {
    return `Cannot ${operation} courses in past sessions`;
  }
  return null;
};

type CourseFinder = (id: number) => Course | undefined;

export const isCourseAvailableInSession = (
  courseId: number,
  sessionName: SessionName,
  sessionYear: number,
  findCourse: CourseFinder,
): boolean => {
  const course = findCourse(courseId);
  if (!course) {
    return false;
  }

  const sessionCode = generateSessionCode(sessionName, sessionYear);
  return course.availability.includes(sessionCode);
};

export const generateSessionKey = (sessionYear: number, sessionName: SessionName): string => {
  return `${sessionYear}-${sessionName}`;
};

export const calculateTotalCredits = (
  courseInstances: CourseInstance[],
  findCourse: CourseFinder,
): number => {
  return courseInstances.reduce((total, instance) => {
    const course = findCourse(instance.courseId);
    return total + (course?.credits || 0);
  }, 0);
};

export const createSessionsForYear = (sessionYear: number): Record<string, Session> => {
  const sessions: Record<string, Session> = {};
  const sessionNames = Object.values(SessionEnum);

  sessionNames.forEach((name) => {
    const key = generateSessionKey(sessionYear, name);
    sessions[key] = {
      key,
      sessionName: name,
      sessionYear,
      courseInstances: [],
      totalCredits: 0,
    };
  });

  return sessions;
};
