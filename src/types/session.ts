import type { CourseInstance } from './course';

export enum SessionEnum {
  AUTOMNE = 'Automne',
  HIVER = 'Hiver',
  ETE = 'Été',
}

export type SessionName = SessionEnum;

export type Session = {
  key: string; // Example: "2024-AUTOMNE"
  name: SessionName;
  year: number;
  courseInstances: CourseInstance[];
  totalCredits: number;
};

export const generateSessionKey = (year: number, sessionName: SessionName): string => {
  return `${year}-${sessionName}`;
};

export type SessionTiming = {
  isFuture: boolean;
  isCurrent: boolean;
  isPast: boolean;
};
