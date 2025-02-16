import type { Course, CourseInstance } from '@/types/course';

export const SESSION_NAMES = {
  AUTUMN: 'Automne',
  WINTER: 'Hiver',
  SUMMER: 'Été',
} as const;

export type SessionName = typeof SESSION_NAMES[keyof typeof SESSION_NAMES];

export type Session = {
  name: SessionName;
  year: number;
  courses: Course[];
  courseInstances: CourseInstance[];
  totalCredits: number;
};

export type SessionTiming = {
  readonly isFuture: boolean;
  readonly isCurrent: boolean;
  readonly isPast: boolean;
};

export type SessionTarget = {
  readonly year: number;
  readonly session: SessionName;
};

export const generateSessionKey = (year: number, name: SessionName): string =>
  `${year}-${name}`;

// Type guards
export const isSessionName = (name: string): name is SessionName => {
  return Object.values(SESSION_NAMES).includes(name as SessionName);
};

export const isSession = (obj: unknown): obj is Session => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const session = obj as Session;
  return (
    isSessionName(session.name)
    && Array.isArray(session.courses)
    && Array.isArray(session.courseInstances)
    && typeof session.totalCredits === 'number'
    && typeof session.year === 'number'
  );
};
