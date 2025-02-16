import type { TimeInfo } from '@/context/planner/types/TimeInfo';
import type { CourseInstance } from '@/types/course';
import { coursesData } from '@/app/planner/courses-data';

import { type Session, SessionEnum, type SessionName } from '@/types/session';

// Session-related constants
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

export const getSessionTiming = (year: number, sessionName: SessionName): TimeInfo => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentSession = getCurrentSession();

  const isFuture = year > currentYear || (
    year === currentYear && (
      (currentSession === SessionEnum.HIVER && sessionName !== SessionEnum.HIVER)
      || (currentSession === SessionEnum.ETE && sessionName === SessionEnum.AUTOMNE)
    )
  );

  const isCurrent = year === currentYear && sessionName === currentSession;
  const isPast = !isFuture && !isCurrent;

  return {
    isPastSession: isPast,
    isCurrentSession: isCurrent,
    isFutureSession: isFuture,
  };
};

export const validateSessionOperation = (
  timing: TimeInfo,
  operation: string,
): string | null => {
  if (timing.isPastSession) {
    return `Cannot ${operation} courses in past sessions`;
  }
  return null;
};

export const isCourseAvailableInSession = (
  courseId: number,
  sessionName: SessionName,
  year: number,
): boolean => {
  const course = coursesData.courses.find((c: { id: number }) => c.id === courseId);
  if (!course) {
    return false;
  }

  const sessionCode = generateSessionCode(sessionName, year);
  return course.availability.includes(sessionCode);
};

// Session utilities
export const generateSessionKey = (year: number, sessionName: SessionName): string => {
  return `${year}-${sessionName}`;
};

export const calculateTotalCredits = (courseInstances: CourseInstance[]): number => {
  return courseInstances.reduce((total, instance) => {
    const course = coursesData.courses.find(c => c.id === instance.courseId);
    return total + (course?.credits || 0);
  }, 0);
};

export const createSessionsForYear = (year: number): Record<string, Session> => {
  const sessions: Record<string, Session> = {};
  const sessionNames = Object.values(SessionEnum);

  sessionNames.forEach((name) => {
    const key = generateSessionKey(year, name);
    sessions[key] = {
      key,
      name,
      year,
      courseInstances: [],
      totalCredits: 0,
    };
  });

  return sessions;
};
