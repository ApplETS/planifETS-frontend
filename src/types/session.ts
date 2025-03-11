import type { CourseInstance } from './course';

export enum SessionEnum {
  A = 'A', // AUTOMNE
  H = 'H', // HIVER
  E = 'E', // ETE
}

export type Session = {
  key: string; // Example: "A2024"
  sessionTerm: SessionEnum;
  sessionYear: number;
  courseInstances: CourseInstance[];
  totalCredits: number;
};

export type SessionTiming = {
  isFuture: boolean;
  isCurrent: boolean;
  isPast: boolean;
};
