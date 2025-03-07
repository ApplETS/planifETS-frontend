/**
 * API configuration settings
 */
export const API_CONFIG = {
  // Base URL from environment variable with fallback
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',

  // API endpoint paths
  endpoints: {
    courses: {
      getDetails: '/courses/:id/details',
      getSchedule: '/courses/:id/schedule',
      getInstructors: '/courses/:id/instructors',
      updateStatus: '/courses/status',
    },
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      verify: '/auth/verify',
    },
    user: {
      profile: '/user/profile',
      preferences: '/user/preferences',
    },
  },

  // Default request headers
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
};
