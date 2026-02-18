import { SessionEnum } from '@/types/session';

export type TestCourse = {
  code: string;
  credits: number;
  sessionTerm: SessionEnum;
  sessionYear: number;
};

const CURRENT_YEAR = new Date().getFullYear();

// IMPORTANT NOTE: Only add new courses, do not modify or remove existing ones as they are used in tests
export const TEST_COURSES: Record<string, TestCourse> = {
  LOG240: {
    code: 'LOG240',
    credits: 3,
    sessionTerm: SessionEnum.E,
    sessionYear: CURRENT_YEAR,
  },
  LOG121: {
    code: 'LOG121',
    credits: 4,
    sessionTerm: SessionEnum.E,
    sessionYear: CURRENT_YEAR,
  },
  LOG680: {
    code: 'LOG680',
    credits: 4,
    sessionTerm: SessionEnum.H,
    sessionYear: CURRENT_YEAR,
  },
  LOG460: {
    code: 'LOG460',
    credits: 3,
    sessionTerm: SessionEnum.A,
    sessionYear: CURRENT_YEAR - 2,
  },
  LOG530: {
    code: 'LOG530',
    credits: 4,
    sessionTerm: SessionEnum.A,
    sessionYear: CURRENT_YEAR + 2,
  },
};
