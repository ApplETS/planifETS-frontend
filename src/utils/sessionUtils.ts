import type { Course, CourseInstance } from '@/types/course';
import type { Session, SessionName, SessionTiming } from '@/types/session';
import { SessionEnum } from '@/types/session';

const SESSION_MONTH_RANGES = {
  [SessionEnum.H]: { start: 0, end: 3 }, // January - April (HIVER)
  [SessionEnum.E]: { start: 4, end: 7 }, // May - August (ETE)
  [SessionEnum.A]: { start: 8, end: 11 }, // September - December (AUTOMNE)
} as const;

export const generateSessionCode = (sessionName: SessionName, year: number): string => {
  return `${sessionName}${year.toString().slice(-2)}`;
};

export const getCurrentSession = (month: number = new Date().getMonth()): SessionName => {
  if (month <= SESSION_MONTH_RANGES[SessionEnum.H].end) {
    return SessionEnum.H;
  }
  if (month <= SESSION_MONTH_RANGES[SessionEnum.E].end) {
    return SessionEnum.E;
  }
  return SessionEnum.A;
};

export const getSessionTiming = (sessionYear: number, sessionName: SessionName): SessionTiming => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentSession = getCurrentSession();

  const isFuture = sessionYear > currentYear || (
    sessionYear === currentYear && (
      (currentSession === SessionEnum.H && sessionName !== SessionEnum.H)
      || (currentSession === SessionEnum.E && sessionName === SessionEnum.A)
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
  if (!sessionYear || !sessionName) {
    console.error(`Invalid session key parameters: ${sessionYear}, ${sessionName}`);
    return '';
  }

  return `${sessionName}${sessionYear}`;
};

export const extractYearFromSessionKey = (sessionKey: string): number => {
  const yearStr = sessionKey.substring(1);
  if (!yearStr) {
    throw new Error(`Invalid session key format: ${sessionKey}`);
  }

  return Number.parseInt(yearStr, 10);
};

export const getTranslationKey = (sessionName: string) => {
  // Map the single letter session names to their translation keys
  const sessionMap: Record<string, string> = {
    [SessionEnum.A]: 'sessionNames.AUTOMNE',
    [SessionEnum.H]: 'sessionNames.HIVER',
    [SessionEnum.E]: 'sessionNames.ETE',
  };

  if (sessionMap[sessionName]) {
    return sessionMap[sessionName];
  }

  console.error(`Invalid session name while translating key: ${sessionName}`);
  return sessionName;
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

type BorderStyle = 'border-green-500' | 'border-red-500' | '';

export const getSessionBorderStyle = (
  courseId: number | null,
  sessionName: SessionName,
  sessionYear: number,
  findCourse: CourseFinder,
  isDragging: boolean,
): BorderStyle => {
  if (!isDragging || !courseId) {
    return '';
  }

  const isAvailable = isCourseAvailableInSession(
    courseId,
    sessionName,
    sessionYear,
    findCourse,
  );

  return isAvailable ? 'border-green-500' : 'border-red-500';
};
