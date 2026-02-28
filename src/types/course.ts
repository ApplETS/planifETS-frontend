export type CourseStatus = 'Completed' | 'Offered' | 'Not Offered' | 'Planned';

export type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  availability: string[];
  unstructuredPrerequisite?: string;
  type?: string | null;
  typicalSessionIndex?: number | null;
};

export type CourseInstance = {
  courseId: number;
};
