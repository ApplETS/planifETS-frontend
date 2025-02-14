import type { CourseStatus } from '../../../types/courseStatus';

export type Course = {
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  availability: string[];
  isFavorited?: boolean;
  status?: CourseStatus;
};
