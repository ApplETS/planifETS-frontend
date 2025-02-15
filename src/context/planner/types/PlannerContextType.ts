import type { Course } from '@/types/course';
import type { SessionName } from './Session';
import type { YearData } from './YearData';

export type PlannerContextType = {
  plannerData: YearData[];
  addCourseToSession: (year: number, sessionName: SessionName, course: Course) => void;
  moveCourseBetweenSessions: (
    fromYear: number,
    fromSession: SessionName,
    toYear: number,
    toSession: SessionName,
    course: Course
  ) => void;
  removeCourseFromSession: (
    year: number,
    sessionName: SessionName,
    courseCode: string
  ) => void;
  deleteYear: (year: number) => void;
  addYear: () => void;
};
