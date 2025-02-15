import type { Course } from '@/types/course';

export const SESSION_NAMES = {
  AUTUMN: 'Automne',
  WINTER: 'Hiver',
  SUMMER: 'Été',
} as const;

export type SessionName = typeof SESSION_NAMES[keyof typeof SESSION_NAMES];

export type Session = {
  name: SessionName;
  courses: Course[];
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

// Type guard to check if a string is a valid SessionName
export const isSessionName = (name: string): name is SessionName => {
  return Object.values(SESSION_NAMES).includes(name as SessionName);
};

// Type guard to check if an object is a valid Session
export const isSession = (obj: unknown): obj is Session => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const session = obj as Session;
  return (
    isSessionName(session.name)
    && Array.isArray(session.courses)
    && typeof session.totalCredits === 'number'
  );
};
