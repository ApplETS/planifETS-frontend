import type { Course, CourseInstance } from '@/types/course';
import type { Session, SessionTiming } from '@/types/session';
import { SessionEnum } from '@/types/session';

/**
 * Formats a session code like 'A2025' to 'A25' for UI display.
 * If the input does not match the expected format, returns it unchanged.
 */
export const formatSessionShort = (sessionCode: string): string => {
  // Match session codes like 'A2025', 'H2024', etc.
  const match = sessionCode.match(/^([AHE])(\d{4})$/);
  if (!match) {
    return sessionCode;
  }
  const term = match[1];
  const year = match[2];
  if (!year) {
    return sessionCode;
  }
  return `${term}${year.slice(2)}`;
};

const SESSION_MONTH_RANGES = {
  [SessionEnum.H]: { start: 0, end: 3 }, // January - April (HIVER)
  [SessionEnum.E]: { start: 4, end: 7 }, // May - August (ETE)
  [SessionEnum.A]: { start: 8, end: 11 }, // September - December (AUTOMNE)
} as const;

export const generateSessionCode = (sessionTerm: SessionEnum, year: number): string => {
  return `${sessionTerm}${year}`;
};

export const getCurrentSession = (month: number = new Date().getMonth()): SessionEnum => {
  if (month <= SESSION_MONTH_RANGES[SessionEnum.H].end) {
    return SessionEnum.H;
  }
  if (month <= SESSION_MONTH_RANGES[SessionEnum.E].end) {
    return SessionEnum.E;
  }
  return SessionEnum.A;
};

export const getSessionTiming = (sessionYear: number, sessionTerm: SessionEnum): SessionTiming => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentSession = getCurrentSession();

  const isFuture = sessionYear > currentYear || (
    sessionYear === currentYear && (
      (currentSession === SessionEnum.H && sessionTerm !== SessionEnum.H)
      || (currentSession === SessionEnum.E && sessionTerm === SessionEnum.A)
    )
  );

  const isCurrent = sessionYear === currentYear && sessionTerm === currentSession;
  const isPast = !isFuture && !isCurrent;

  return {
    isPast,
    isCurrent,
    isFuture,
  };
};

export const filterCurrentAndFutureSessions = (sessionCodes: string[]): string[] => {
  return sessionCodes.filter((code) => {
    const match = code.match(/^([AHE])(\d{4})$/);
    if (!match) {
      return false;
    }
    const term = match[1] as SessionEnum;
    const yearStr = match[2];
    if (!yearStr) {
      return false;
    }
    const year = Number.parseInt(yearStr, 10);
    const timing = getSessionTiming(year, term);
    return timing.isCurrent || timing.isFuture;
  });
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
  sessionTerm: SessionEnum,
  sessionYear: number,
  findCourse: CourseFinder,
): boolean => {
  const course = findCourse(courseId);
  if (!course) {
    return false;
  }

  const sessionCode = generateSessionCode(sessionTerm, sessionYear);
  return course.availability.includes(sessionCode);
};

export const generateSessionKey = (sessionYear: number, sessionTerm: SessionEnum): string => {
  if (!sessionYear || !sessionTerm) {
    console.error(`Invalid session key parameters: ${sessionYear}, ${sessionTerm}`);
    return '';
  }

  return `${sessionTerm}${sessionYear}`;
};

export const extractYearFromSessionKey = (sessionKey: string): number => {
  const yearStr = sessionKey.substring(1);
  if (!yearStr) {
    throw new Error(`Invalid session key format: ${sessionKey}`);
  }

  return Number.parseInt(yearStr, 10);
};

export const getTranslationKey = (sessionTerm: string) => {
  // Map the single letter session names to their translation keys
  const sessionMap: Record<string, string> = {
    [SessionEnum.A]: 'sessionTerms.AUTOMNE',
    [SessionEnum.H]: 'sessionTerms.HIVER',
    [SessionEnum.E]: 'sessionTerms.ETE',
  };

  if (sessionMap[sessionTerm]) {
    return sessionMap[sessionTerm];
  }

  console.error(`Invalid session name while translating key: ${sessionTerm}`);
  return sessionTerm;
};

export const calculateTotalCredits = (
  courseInstances: CourseInstance[],
  findCourse: CourseFinder,
): number => {
  return courseInstances.reduce((total, instance) => {
    const course = findCourse(instance.courseId);
    return total + (course?.credits ?? 0);
  }, 0);
};

export const createSessionsForYear = (sessionYear: number): Record<string, Session> => {
  const sessions: Record<string, Session> = {};
  const orderedSessionTerms = [SessionEnum.H, SessionEnum.E, SessionEnum.A];

  orderedSessionTerms.forEach((name) => {
    const key = generateSessionKey(sessionYear, name);
    sessions[key] = {
      key,
      sessionTerm: name,
      sessionYear,
      courseInstances: [],
    };
  });

  return sessions;
};

export const updateSessionCourseInstances = (
  sessions: Record<string, Session>,
  sessionKey: string,
  courseInstances: CourseInstance[],
): Record<string, Session> => {
  const session = sessions[sessionKey];
  if (!session) {
    return sessions;
  }

  return {
    ...sessions,
    [sessionKey]: {
      ...session,
      courseInstances,
    },
  };
};

export const updateMultipleSessions = (
  sessions: Record<string, Session>,
  updates: Array<{ sessionKey: string; courseInstances: CourseInstance[] }>,
): Record<string, Session> => {
  let updatedSessions = { ...sessions };

  updates.forEach(({ sessionKey, courseInstances }) => {
    updatedSessions = updateSessionCourseInstances(updatedSessions, sessionKey, courseInstances);
  });

  return updatedSessions;
};

export const hasCourseInSession = (session: Session, courseId: number): boolean => {
  return session.courseInstances.some(instance => instance.courseId === courseId);
};

export const findCourseInSession = (
  session: Session,
  courseId: number,
): CourseInstance | undefined => {
  return session.courseInstances.find(instance => instance.courseId === courseId);
};

type BorderStyle = 'border-destructive' | 'border-primary' | '';

export const getSessionBorderStyle = (
  courseId: number | null,
  sessionTerm: SessionEnum,
  sessionYear: number,
  findCourse: CourseFinder,
  isDragging: boolean,
): BorderStyle => {
  if (!isDragging || !courseId) {
    return '';
  }

  const isAvailable = isCourseAvailableInSession(
    courseId,
    sessionTerm,
    sessionYear,
    findCourse,
  );

  return isAvailable ? 'border-primary' : 'border-destructive';
};
