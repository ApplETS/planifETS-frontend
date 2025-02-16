import type { CourseInstance } from './course';

export type SessionName = 'Hiver' | 'Été' | 'Automne';

export type Session = {
  key: string; // Format: "YEAR-SESSION" (e.g., "2024-AUTOMNE")
  name: SessionName;
  year: number;
  courseInstances: CourseInstance[];
  totalCredits: number;
};

export const generateSessionKey = (year: number, sessionName: SessionName): string =>
  `${year}-${sessionName}`;
