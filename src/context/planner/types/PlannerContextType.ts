import type { Course } from './Course';
import type { SessionName } from './Session';
import type { YearData } from './YearData';

export type DuplicateAddData = {
  existingYear: number;
  existingSessionName: SessionName;
  newYear: number;
  newSessionName: SessionName;
  course: Course;
};

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
  duplicateAddData: DuplicateAddData | null;
  confirmAddCourseAnyway: () => void;
  cancelAddCourseAnyway: () => void;
};
