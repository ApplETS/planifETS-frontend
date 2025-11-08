export type ProgramDto = {
  id: string;
  code: string;
  name: string;
  description?: string;
  credits: number;
  duration: number;
};

export type ProgramCourseDto = {
  id: string;
  code: string;
  title: string;
  credits: number;
  session: string;
  prerequisites?: string[];
};

// /program-courses endpoint
export type SessionAvailabilityDto = {
  sessionCode: string;
  availability: ('JOUR' | 'SOIR' | 'INTENSIF')[];
};

export type CoursePrerequisiteDto = {
  code: string;
  title: string;
};

export type ProgramCourseDetailedDto = {
  code: string;
  title: string;
  credits: number;
  sessionAvailability: SessionAvailabilityDto[];
  prerequisites: CoursePrerequisiteDto[];
  type: 'TRONC' | 'CONCE' | 'CONDI' | null;
  typicalSessionIndex: number | null;
  unstructuredPrerequisite: string | null;
};

export type ProgramCoursesDto = {
  programCode: string;
  programTitle: string;
  courses: ProgramCourseDetailedDto[];
};

export type ProgramCoursesErrorDto = {
  invalidProgramCodes: string[];
};

export type ProgramCoursesResponseDto = {
  data: ProgramCoursesDto[];
  errors?: ProgramCoursesErrorDto;
};
