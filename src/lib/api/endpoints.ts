export const API_ENDPOINTS = {
  PROGRAMS: {
    LIST: '/api/programs',
    BY_ID: (programId: string) => `/api/programs/${programId}`,
    COURSES: (programId: string) => `/api/programs/${programId}/courses`,
  },
  PROGRAM_COURSES: {
    IDS: '/api/program-courses/ids',
    PROGRAMS: '/api/program-courses/programs',
    COURSE_DETAILS: '/api/program-courses/details',
  },
  COURSES: {
    SEARCH: '/api/courses/search',
  },
  SESSIONS: {
    LATEST_AVAILABLE: () => `/api/sessions/latest-available`,
  },
} as const;
