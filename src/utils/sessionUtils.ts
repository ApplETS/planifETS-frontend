import type { Course, CourseInstance } from '@/types/course';
import type { Session, SessionTiming } from '@/types/session';
import { SessionEnum } from '@/types/session';

const SESSION_MONTH_RANGES = {
  [SessionEnum.H]: { start: 0, end: 3 }, // January - April (HIVER)
  [SessionEnum.E]: { start: 4, end: 7 }, // May - August (ETE)
  [SessionEnum.A]: { start: 8, end: 11 }, // September - December (AUTOMNE)
} as const;

export const generateSessionCode = (sessionTerm: SessionEnum, year: number): string => {
  return `${sessionTerm}${year.toString().slice(-2)}`;
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
  const sessionTerms = Object.values(SessionEnum);

  sessionTerms.forEach((name) => {
    const key = generateSessionKey(sessionYear, name);
    sessions[key] = {
      key,
      sessionTerm: name,
      sessionYear,
      courseInstances: [],
      totalCredits: 0,
    };
  });

  return sessions;
};

type BorderStyle = 'border-green-500' | 'border-red-500' | ''; // TODO: Use theme colors

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

  return isAvailable ? 'border-green-500' : 'border-red-500'; // TODO: Use theme colors
};
