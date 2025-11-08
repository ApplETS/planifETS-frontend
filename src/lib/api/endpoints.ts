export const API_ENDPOINTS = {
  PROGRAMS: {
    LIST: '/programs',
    BY_ID: (id: string) => `/programs/${id}`,
    COURSES: (id: string) => `/programs/${id}/courses`,
  },
  COURSES: {
    LIST: '/courses',
    BY_ID: (id: string) => `/courses/${id}`,
    PREREQUISITES: (id: string) => `/courses/${id}/prerequisites`,
  },
  SESSIONS: {
    BY_ID: (id: string) => `/sessions/${id}`,
  },
} as const;
