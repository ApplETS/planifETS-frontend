export type CourseStatus = 'Planned' | 'In Progress' | 'Completed' | 'Not Offered';

export type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  availability: string[];
};

export type CourseInstance = {
  courseId: number;
  status: CourseStatus;
};
