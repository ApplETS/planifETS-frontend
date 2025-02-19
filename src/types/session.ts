import type { CourseInstance } from './course';

export enum SessionEnum {
  AUTOMNE = 'Automne',
  HIVER = 'Hiver',
  ETE = 'Été',
}

export type SessionName = SessionEnum;

export type Session = {
  key: string; // Example: "2024-AUTOMNE"
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
