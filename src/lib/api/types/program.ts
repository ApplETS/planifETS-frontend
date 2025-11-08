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
