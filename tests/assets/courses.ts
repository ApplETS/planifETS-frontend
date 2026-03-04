import { TermEnum } from '@/types/session';

export type TestCourse = {
  code: string;
  credits: number;
  sessionTerm: TermEnum;
  sessionYear: number;
};

const CURRENT_YEAR = new Date().getFullYear();

// IMPORTANT NOTE: Only add new courses, do not modify or remove existing ones as they are used in tests
export const TEST_COURSES: Record<string, TestCourse> = {
  // LOG
  LOG240: {
    code: 'LOG240',
    credits: 3,
    sessionTerm: TermEnum.E,
    sessionYear: CURRENT_YEAR,
  },
  LOG121: {
    code: 'LOG121',
    credits: 4,
    sessionTerm: TermEnum.E,
    sessionYear: CURRENT_YEAR,
  },
  LOG680: {
    code: 'LOG680',
    credits: 4,
    sessionTerm: TermEnum.H,
    sessionYear: CURRENT_YEAR,
  },
  LOG460: {
    code: 'LOG460',
    credits: 3,
    sessionTerm: TermEnum.A,
    sessionYear: CURRENT_YEAR - 2,
  },
  LOG530: {
    code: 'LOG530',
    credits: 4,
    sessionTerm: TermEnum.A,
    sessionYear: CURRENT_YEAR + 2,
  },
  // MEC
  MEC129: {
    code: 'MEC129',
    credits: 4,
    sessionTerm: TermEnum.E,
    sessionYear: CURRENT_YEAR,
  },
  MEC222: {
    code: 'MEC222',
    credits: 3,
    sessionTerm: TermEnum.E,
    sessionYear: CURRENT_YEAR,
  },
};
