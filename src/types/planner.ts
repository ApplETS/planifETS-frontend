import type { Session, SessionName } from '../context/planner/types/Session';

export type Course = {
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  availability: string[];
  isFavorited?: boolean;
  status?:
    | 'Completed'
    | 'In Progress'
    | 'Failed'
    | 'Not Offered'
    | 'Planned'; // TODO: add 'TBD'/'À déterminer' status
};

export type YearData = {
  year: number;
  sessions: Session[];
};

export type YearSectionProps = {
  year: number;
  sessions: Session[];
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
  isLastYear: boolean;
};
