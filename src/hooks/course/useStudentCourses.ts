import type { Session } from '@/types/session';
import { coursesData } from '@/app/planner/courses-data';
import { useAuthStore } from '@/store/authStore';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { useCallback } from 'react';

export const useStudentCourses = () => {
  const courseStore = useCourseStore();
  const sessionStore = useSessionStore();
  const { isLoggedIn } = useAuthStore();

  const fetchAndInitializeStudentData = useCallback(async () => {
    if (!isLoggedIn) {
      return;
    }

    try {
      // Initialize course catalog
      courseStore.setCourses(coursesData.courses);

      // Convert sessions array to Record<string, Session>
      const sessionsRecord = coursesData.sessions.reduce((acc, yearData) => {
        yearData.sessions.forEach((session) => {
          acc[session.key] = session;
        });
        return acc;
      }, {} as Record<string, Session>);

      // Initialize sessions
      sessionStore.setSessions(sessionsRecord);
    } catch (error) {
      console.error('Failed to fetch student courses:', error);
    }
  }, [isLoggedIn, courseStore, sessionStore]);

  const clearStudentData = useCallback(() => {
    sessionStore.clearAllSessions();
  }, [sessionStore]);

  return {
    fetchAndInitializeStudentData,
    clearStudentData,
  };
};
