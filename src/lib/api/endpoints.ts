export const API_ENDPOINTS = {
  PROGRAMS: {
    LIST: '/programs',
    BY_ID: (programId: string) => `/programs/${programId}`,
    COURSES: (programId: string) => `/programs/${programId}/courses`,
  },
  PROGRAM_COURSES: {
    IDS: '/program-courses/ids',
    PROGRAMS: '/program-courses/programs',
    COURSE_DETAILS: '/program-courses/details',
  },
  COURSES: {
    SEARCH: '/courses/search',
  },
  SESSIONS: {
    LATEST_AVAILABLE: () => `/sessions/latest-available`,
  },
} as const;
