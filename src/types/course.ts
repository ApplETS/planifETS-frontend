export type CourseStatus = 'Completed' | 'Offered' | 'Not Offered' | 'Planned';

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
};
