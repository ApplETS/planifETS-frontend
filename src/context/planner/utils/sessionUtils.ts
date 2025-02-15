import type { Course } from '@/types/course';

import type { Session, SessionName, SessionTiming } from '../types/Session';
import type { TimeInfo } from '../types/TimeInfo';
import { SESSION_NAMES } from '../types/Session';

// Session-related constants
const SESSION_MONTH_RANGES = {
  [SESSION_NAMES.WINTER]: { start: 0, end: 3 }, // January - April
  [SESSION_NAMES.SUMMER]: { start: 4, end: 7 }, // May - August
  [SESSION_NAMES.AUTUMN]: { start: 8, end: 11 }, // September - December
} as const;

/**
 * Determines the current session based on the month
 */
export const getCurrentSession = (month: number = new Date().getMonth()): SessionName => {
  if (month <= SESSION_MONTH_RANGES[SESSION_NAMES.WINTER].end) {
    return SESSION_NAMES.WINTER;
  }
  if (month <= SESSION_MONTH_RANGES[SESSION_NAMES.SUMMER].end) {
    return SESSION_NAMES.SUMMER;
  }
  return SESSION_NAMES.AUTUMN;
};

/**
 * Gets timing information for a specific session
 */
export const getSessionTiming = (year: number, sessionName: SessionName): SessionTiming => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentSession = getCurrentSession();

  const isFuture = year > currentYear || (
    year === currentYear && (
      (currentSession === SESSION_NAMES.WINTER && sessionName !== SESSION_NAMES.WINTER)
      || (currentSession === SESSION_NAMES.SUMMER && sessionName === SESSION_NAMES.AUTUMN)
    )
  );

  const isCurrent = year === currentYear && sessionName === currentSession;
  const isPast = !isFuture && !isCurrent;

  return Object.freeze({ isFuture, isCurrent, isPast });
};

/**
 * Generates a session code in the format: first letter of season + last two digits of year
 * Example: "Automne 2024" -> "A24"
 */
export const generateSessionCode = (sessionName: SessionName, year: number): string => {
  return `${sessionName.charAt(0)}${year.toString().slice(-2)}`;
};

/**
 * Checks if a course is available in a given session
 */
export const isCourseAvailable = (
  course: Course,
  sessionName: SessionName,
  year: number,
): boolean => {
  const sessionCode = generateSessionCode(sessionName, year);
  return course.availability.includes(sessionCode);
};

/**
 * Updates course status based on availability and time info
 */
export const determineCourseStatus = (
  course: Course,
  sessionName: SessionName,
  year: number,
  timeInfo: TimeInfo,
): Course['status'] => {
  if (timeInfo.isPastSession) {
    return course.status === 'Failed' ? 'Failed' : 'Completed';
  }

  if (timeInfo.isCurrentSession) {
    return 'In Progress';
  }

  if (!isCourseAvailable(course, sessionName, year)) {
    return 'Not Offered';
  }

  return 'Planned';
};

/**
 * Calculates total credits for a session
 */
export const calculateSessionCredits = (courses: Course[]): number => {
  return courses.reduce((sum, course) => sum + course.credits, 0);
};

/**
 * Updates a session's courses and recalculates credits
 */
export const updateSessionCourses = (
  session: Session,
  updatedCourses: Course[],
): Session => {
  return Object.freeze({
    ...session,
    courses: [...updatedCourses],
    totalCredits: calculateSessionCredits(updatedCourses),
  });
};
