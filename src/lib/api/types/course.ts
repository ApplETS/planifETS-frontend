import type { CoursePrerequisiteDto, SessionAvailabilityDto } from './program';

export type BasicCourseDto = {
  id: number;
  code: string;
  title: string;
  description?: string;
  credits: number;
  cycle?: number;
  createdAt: string;
  updatedAt: string;
};

export type SearchCourseResult = {
  id: number;
  code: string;
  title: string;
  credits: number;
  cycle?: number;
  sessionAvailability: SessionAvailabilityDto[];
  prerequisites: CoursePrerequisiteDto[];
  type?: 'TRONC' | 'CONCE' | 'CONDI' | 'PROFI' | 'STAGE' | null;
  typicalSessionIndex?: number | null;
  unstructuredPrerequisite?: string | null;
};

export type SearchCoursesDto = {
  courses: SearchCourseResult[];
  total: number;
  hasMore: boolean;
};

export type CourseSearchParams = {
  query: string;
  programCodes?: string;
  limit?: number;
  offset?: number;
};
