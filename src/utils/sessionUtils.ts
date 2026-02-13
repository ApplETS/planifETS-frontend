import type { Course, CourseInstance } from '@/types/course';
import type { Session, SessionTiming } from '@/types/session';
import { SessionEnum } from '@/types/session';

export const SESSION_SELECTION_BOUNDS = {
  PAST_YEARS: 10,
  FUTURE_YEARS: 1,
} as const;

// Regex pattern for session codes like 'A2025', 'H2024', etc.
const SESSION_CODE_PATTERN = /^([AHE])(\d{4})$/;

export function setSessionKnownAvailability(
  sessions: Record<string, Session>,
  sessionKey: string,
  isKnown: boolean,
): Record<string, Session> {
  const session = sessions[sessionKey];
  if (!session) {
    return sessions;
  }
  return {
    ...sessions,
    [sessionKey]: {
      ...session,
      isKnownSessionAvailability: isKnown,
    },
  };
}

/**
 * Sorts session codes (e.g., 'H2025', 'E2025', 'A2025') by year, then by session term order (H < E < A).
 */
export const sortSessionsChronologically = (sessionCodes: string[]): string[] => {
  const sessionOrder = { H: 0, E: 1, A: 2 };
  return [...sessionCodes].sort((a, b) => {
    const yearA = Number(a.substring(1));
    const yearB = Number(b.substring(1));
    if (yearA !== yearB) {
      return yearA - yearB;
    }
    const termA = a.charAt(0) as keyof typeof sessionOrder;
    const termB = b.charAt(0) as keyof typeof sessionOrder;
    return sessionOrder[termA] - sessionOrder[termB];
  });
};

/**
 * Formats a session code like 'A2025' to 'A25' for UI display.
 * If the input does not match the expected format, returns it unchanged.
 */
export const formatSessionShort = (sessionCode: string): string => {
  const match = sessionCode.match(SESSION_CODE_PATTERN);
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

// 1 (HIVER) - 2 (ETE) - 3 (AUTOMNE)
export const ORDERED_SESSION_TERMS: SessionEnum[] = [SessionEnum.H, SessionEnum.E, SessionEnum.A];

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

export const getSessionTiming = (
  sessionYear: number,
  sessionTerm: SessionEnum,
): SessionTiming => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentSession = getCurrentSession();

  const comparison = compareSessions(
    sessionYear,
    sessionTerm,
    currentYear,
    currentSession,
  );

  return {
    isPast: comparison < 0,
    isCurrent: comparison === 0,
    isFuture: comparison > 0,
  };
};

export const filterCurrentAndFutureSessions = (sessionCodes: string[]): string[] => {
  return sessionCodes.filter((code) => {
    const match = code.match(SESSION_CODE_PATTERN);
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

export const generateSessionKey = (
  sessionYear: number,
  sessionTerm: SessionEnum,
): string => {
  if (!sessionYear || !sessionTerm) {
    console.error(`Invalid session key parameters: ${sessionYear}, ${sessionTerm}`);
    return '';
  }

  return `${sessionTerm}${sessionYear}`;
};

/**
 * Generates an array of session keys from startYear/startTerm to endYear
 */
export const generateSessionRange = (
  startYear: number,
  startTerm: SessionEnum,
  endYear: number,
): string[] => {
  const sessionKeys: string[] = [];

  for (let y = startYear; y <= endYear; y++) {
    ORDERED_SESSION_TERMS.forEach((sessionTerm: SessionEnum) => {
      // For the first year, only include sessions from startTerm onwards
      if (y === startYear) {
        if (ORDERED_SESSION_TERMS.indexOf(sessionTerm) >= ORDERED_SESSION_TERMS.indexOf(startTerm)) {
          sessionKeys.push(generateSessionKey(y, sessionTerm));
        }
      } else {
        // For subsequent years, include all sessions
        sessionKeys.push(generateSessionKey(y, sessionTerm));
      }
    });
  }

  return sessionKeys;
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
      isKnownSessionAvailability: false, // default to false
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
    updatedSessions = updateSessionCourseInstances(
      updatedSessions,
      sessionKey,
      courseInstances,
    );
  });

  return updatedSessions;
};

export const hasCourseInSession = (session: Session, courseId: number): boolean => {
  return session.courseInstances.some((instance) => instance.courseId === courseId);
};

/**
 * Compare two sessions by year and term.
 * Returns:
 *   -1 if a < b
 *    0 if a == b
 *    1 if a > b
 */
export function compareSessions(
  yearA: number,
  termA: SessionEnum,
  yearB: number,
  termB: SessionEnum,
): number {
  if (yearA !== yearB) {
    return yearA - yearB;
  }
  return ORDERED_SESSION_TERMS.indexOf(termA) - ORDERED_SESSION_TERMS.indexOf(termB);
}

/**
 * Utility to map backend trimester string to SessionEnum.
 */
export function trimesterToSessionTerm(trimester: string): SessionEnum | undefined {
  switch (trimester) {
    case 'HIVER':
      return SessionEnum.H;
    case 'ETE':
      return SessionEnum.E;
    case 'AUTOMNE':
      return SessionEnum.A;
    default:
      return undefined;
  }
}
