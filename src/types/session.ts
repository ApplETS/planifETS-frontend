import type { CourseInstance } from './course';

export enum SessionEnum {
  A = 'A', // AUTOMNE
  H = 'H', // HIVER
  E = 'E', // ETE
}

export type SessionName = SessionEnum;

export type Session = {
  key: string; // Example: "A2024"
  sessionName: SessionName;
  sessionYear: number;
  courseInstances: CourseInstance[];
  totalCredits: number;
};

export type SessionTiming = {
  isFuture: boolean;
  isCurrent: boolean;
  isPast: boolean;
};
