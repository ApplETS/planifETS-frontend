export type ProgramDto = {
  id: number;
  code: string;
  title: string;
  description?: string;
  credits: string;
  cycle: number;
  url: string;
  isHorairePdfParsable: boolean;
  isPlanificationPdfParsable: boolean;
  horaireCoursPdfJson: string | null;
  planificationPdfJson: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProgramListDto = {
  programId: number;
  programCode: string;
  programTitle: string;
};

export type CourseRequirementType = 'TRONC' | 'CONCE' | 'CONDI' | 'PROFI';

export type CourseAvailabilityDto = 'JOUR' | 'SOIR' | 'INTENSIF';
export type SessionTrimesterDto = 'HIVER' | 'ETE' | 'AUTOMNE';

// /program-courses endpoint
export type SessionAvailabilityDto = {
  sessionCode: string;
  availability: CourseAvailabilityDto[];
};

export type CoursePrerequisiteDto = {
  id?: number;
  code: string;
  title: string;
  credits?: number | null;
  cycle?: number | null;
};

export type ProgramCourseDetailedDto = {
  id: number;
  code: string;
  title: string;
  credits: number;
  cycle?: number;
  sessionAvailability: SessionAvailabilityDto[];
  prerequisites: CoursePrerequisiteDto[];
  type: CourseRequirementType | null;
  typicalSessionIndex: number | null;
  unstructuredPrerequisite: string | null;
};

export type DetailedProgramCourseSessionDto = {
  trimester: SessionTrimesterDto;
  year: number;
};

export type DetailedProgramCourseInstanceDto = {
  availability: CourseAvailabilityDto[];
  sessionYear: number;
  sessionTrimester: SessionTrimesterDto;
  session: DetailedProgramCourseSessionDto;
};

export type DetailedProgramCourseInfoDto = {
  code: string;
  title: string;
  credits: number;
  description: string;
  cycle: number;
  courseInstances: DetailedProgramCourseInstanceDto[];
};

export type DetailedProgramCoursePrerequisiteDto = {
  prerequisite: {
    course: {
      id: number;
      code: string;
      title: string;
    };
  };
};

export type DetailedProgramCourseDto = {
  courseId: number;
  programId: number;
  type: CourseRequirementType | null;
  typicalSessionIndex: number | null;
  unstructuredPrerequisite: string | null;
  course: DetailedProgramCourseInfoDto;
  prerequisites: DetailedProgramCoursePrerequisiteDto[];
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
