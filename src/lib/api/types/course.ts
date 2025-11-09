import type { SessionAvailabilityDto } from './program';

export type PrerequisiteResult = {
  id: number;
  code: string;
  title: string;
  credits: number | null;
  cycle: number | null;
};

export type SearchCourseResult = {
  id: number;
  code: string;
  title: string;
  credits: number | null;
  cycle: number | null;
  sessionAvailability: SessionAvailabilityDto[];
  typicalIndex?: number | null;
  prerequisites?: PrerequisiteResult[];
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
