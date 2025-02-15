import type { SessionName } from '@/context/planner/types/Session';

export type CourseStatus =
  | 'Completed'
  | 'In Progress'
  | 'Failed'
  | 'Not Offered'
  | 'Planned';

export type Course = {
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  availability: SessionName[];
  status?: CourseStatus;
};

export type CourseInstance = Course & {
  status: CourseStatus;
  sessionKey: string; // Format: "YEAR-SESSION" (e.g., "2024-AUTOMNE")
};
