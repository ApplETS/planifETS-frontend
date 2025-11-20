/**
 * Session Store
 * What it stores (user's persistent data):
 * - sessions: Record<string, Session> - Maps session keys to session data
 *   - Each session contains:
 *     - key: string (e.g., 'A2024')
 *     - sessionTerm: SessionEnum (A/H/E)
 *     - sessionYear: number
 *     - courseInstances: CourseInstance[]
 *        Array of { courseId: number, status: CourseStatus }
 */

import type { CourseInstance } from '@/types/course';
import type { Session } from '@/types/session';
import { create } from 'zustand';
import { persistConfig } from '@/lib/persistConfig';
import { SessionEnum } from '@/types/session';
import { determineInitialStatus } from '@/utils/courseUtils';
import { safeGet } from '@/utils/safeAccess';
import {
  createSessionsForYear,
  findCourseInSession,
  getSessionTiming,
  hasCourseInSession,
  updateMultipleSessions,
  updateSessionCourseInstances,
} from '@/utils/sessionUtils';

type SessionState = {
  sessions: Record<string, Session>;
};

type SessionActions = {
  addCourseToSession: (sessionKey: string, courseId: number) => void;
  removeCourseFromSession: (sessionKey: string, courseId: number) => void;
  moveCourse: (fromKey: string, toKey: string, courseId: number) => void;
  getSessionCourses: (sessionKey: string) => CourseInstance[];
  setSessions: (sessions: Record<string, Session>) => void;
  clearAllSessions: () => void;
  getSessionsByYear: (year: number) => Session[];
  initializeSessions: (year: number) => void;
  getSessionByKey: (sessionKey: string) => Session | undefined;
};

export const useSessionStore = create<SessionState & SessionActions>()(
  persistConfig(
    'session-store',
    (set, get) => ({
      sessions: {},

      initializeSessions: (year: number) => {
        set((state) => {
          const yearSessions = createSessionsForYear(year);

          return {
            sessions: {
              ...state.sessions,
              ...yearSessions,
            },
          };
        });
      },

      addCourseToSession: (sessionKey, courseId) => {
        const sessionLetter = sessionKey.charAt(0) as SessionEnum;
        const sessionYearStr = sessionKey.substring(1);
        const sessionYear = Number.parseInt(sessionYearStr, 10);

        if (Number.isNaN(sessionYear) || !Object.values(SessionEnum).includes(sessionLetter)) {
          console.error(`Invalid session key: ${sessionKey}`);
          return;
        }

        set((state) => {
          const session = safeGet(state.sessions, sessionKey);
          if (!session) {
            console.error(`Session not found: ${sessionKey}`);
            return state;
          }

          if (hasCourseInSession(session, courseId)) {
            console.warn(`Course ${courseId} is already in this session`);
            return state;
          }

          const timing = getSessionTiming(sessionYear, sessionLetter);

          const newCourseInstance: CourseInstance = {
            courseId,
            status: determineInitialStatus(timing),
          };

          const updatedCourseInstances = [...session.courseInstances, newCourseInstance];

          return {
            sessions: updateSessionCourseInstances(state.sessions, sessionKey, updatedCourseInstances),
          };
        });
      },

      getSessionCourses: (sessionKey) => {
        const session = safeGet(get().sessions, sessionKey);
        return session?.courseInstances || [];
      },

      getSessionsByYear: (year: number) => {
        const { sessions } = get();
        return Object.values(sessions).filter(session => session.sessionYear === year);
      },

      getSessionByKey: (sessionKey: string) => {
        return safeGet(get().sessions, sessionKey);
      },

      setSessions: sessions => set({ sessions }),

      clearAllSessions: () => set({ sessions: {} }),

      moveCourse: (fromKey, toKey, courseId) => {
        set((state) => {
          const fromSession = safeGet(state.sessions, fromKey);
          const toSession = safeGet(state.sessions, toKey);

          if (!fromSession || !toSession) {
            console.error('Session not found:', { fromKey, toKey });
            return state;
          }

          if (hasCourseInSession(toSession, courseId)) {
            return state;
          }

          const courseInstance = findCourseInSession(fromSession, courseId);

          if (!courseInstance) {
            console.error('Course instance not found:', courseId);
            return state;
          }

          // Calculate new status based on destination session timing
          const timing = getSessionTiming(toSession.sessionYear, toSession.sessionTerm);
          const updatedCourseInstance: CourseInstance = {
            ...courseInstance,
            status: determineInitialStatus(timing),
          };

          const updatedFromCourseInstances = fromSession.courseInstances.filter(
            instance => instance.courseId !== courseId,
          );

          const updatedToCourseInstances = [...toSession.courseInstances, updatedCourseInstance];

          return {
            sessions: updateMultipleSessions(state.sessions, [
              { sessionKey: fromKey, courseInstances: updatedFromCourseInstances },
              { sessionKey: toKey, courseInstances: updatedToCourseInstances },
            ]),
          };
        });
      },

      removeCourseFromSession: (sessionKey, courseId) => {
        set((state) => {
          const session = safeGet(state.sessions, sessionKey);
          if (!session) {
            return state;
          }

          const updatedCourseInstances = session.courseInstances.filter(
            instance => instance.courseId !== courseId,
          );

          return {
            sessions: updateSessionCourseInstances(state.sessions, sessionKey, updatedCourseInstances),
          };
        });
      },
    }),
  ),
);
