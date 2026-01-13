import { SessionEnum } from '@/types/session';

const CURRENT_YEAR = new Date().getFullYear();

export const TEST_COURSES = {
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
} as const;

export type TestCourse = typeof TEST_COURSES[keyof typeof TEST_COURSES];
