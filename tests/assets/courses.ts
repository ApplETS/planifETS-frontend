import { SessionEnum } from '@/types/session';

export const TEST_COURSES = {
  LOG240: {
    code: 'LOG240',
    credits: 3,
    sessionName: SessionEnum.E,
    sessionYear: 2025,
  },
  LOG121: {
    code: 'LOG121',
    credits: 4,
    sessionName: SessionEnum.E,
    sessionYear: 2025,
  },
} as const;

export type TestCourse = typeof TEST_COURSES[keyof typeof TEST_COURSES];
