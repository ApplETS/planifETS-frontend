export const TEST_COURSES = {
  LOG240: {
    code: 'LOG240',
    credits: 3,
    sessionName: 'Été',
    sessionYear: 2025,
  },
  LOG121: {
    code: 'LOG121',
    credits: 4,
    sessionName: 'Été',
    sessionYear: 2025,
  },
} as const;

export type TestCourse = typeof TEST_COURSES[keyof typeof TEST_COURSES];
