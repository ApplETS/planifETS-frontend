export const API_ENDPOINTS = {
  PROGRAMS: {
    LIST: '/programs',
    BY_ID: (id: string) => `/programs/${id}`,
    COURSES: (id: string) => `/programs/${id}/courses`,
  },
  PROGRAM_COURSES: {
    DEFAULT: '/program-courses',
    COURSE_DETAILS: '/program-courses/details',
  },
  COURSES: {
    SEARCH: '/courses/search',
  },
  SESSIONS: {
    LATEST_AVAILABLE: () => `/sessions/latest-available`,
  },
} as const;
