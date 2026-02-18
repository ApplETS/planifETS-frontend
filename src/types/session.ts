import type { CourseInstance } from './course';

export enum TermEnum {
  A = 'A', // AUTOMNE
  H = 'H', // HIVER
  E = 'E', // ETE
}

export type Session = {
  key: string; // Example: "A2024"
  sessionTerm: TermEnum;
  sessionYear: number;
  courseInstances: CourseInstance[];
  isKnownSessionAvailability?: boolean; // true if availability is known, false if unknown
};

export type SessionTiming = {
  isFuture: boolean;
  isCurrent: boolean;
  isPast: boolean;
};
