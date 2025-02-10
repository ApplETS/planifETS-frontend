import type { Course } from './Course';

export type Session = {
  name: string;
  courses: Course[];
  totalCredits: number;
};

export type PlannerData = {
  year: number;
  sessions: Session[];
};
