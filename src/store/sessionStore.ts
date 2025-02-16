import type { CourseInstance, CourseStatus } from '@/types/course';
import type { Session, SessionName } from '@/types/session';
import { getSessionTiming } from '@/context/planner/utils/sessionUtils';
import { calculateTotalCredits, createSessionsForYear } from '@/utils/sessionUtils';
import { persistConfig } from 'lib/persistConfig';
import { create } from 'zustand';
import { useCourseStore } from './courseStore';

type SessionState = {
  sessions: Record<string, Session>;
};

type SessionActions = {
  addCourseToSession: (sessionKey: string, courseId: number) => void;
  removeCourseFromSession: (sessionKey: string, courseId: number) => void;
  moveCourse: (fromKey: string, toKey: string, courseId: number) => void;
  getSessionCourses: (sessionKey: string) => CourseInstance[];
  calculateSessionCredits: (courseInstances: CourseInstance[]) => number;
  setSessions: (sessions: Record<string, Session>) => void;
  clearAllSessions: () => void;
  getSessionsByYear: (year: number) => Session[];
  initializeSessions: (year: number) => void;
  getSessionByKey: (sessionKey: string) => Session | undefined;
};

export const useSessionStore = create<SessionState & SessionActions>()(
  persistConfig('session-store', (set, get) => ({
    sessions: {},

    initializeSessions: (year: number) => {
      set(state => ({
        sessions: {
          ...state.sessions,
          ...createSessionsForYear(year),
        },
      }));
    },

    addCourseToSession: (sessionKey, courseId) => {
      const [year = '', sessionName = ''] = sessionKey.split('-');
      if (!year || !sessionName) {
        return;
      }

      set((state) => {
        const session = state.sessions[sessionKey];
        const timeInfo = getSessionTiming(Number(year), sessionName as SessionName);

        const initialStatus: CourseStatus = timeInfo.isCurrent
          ? 'In Progress'
          : timeInfo.isPast
            ? 'Completed'
            : 'Planned';

        const newCourseInstance: CourseInstance = {
          courseId,
          status: initialStatus,
        };

        return {
          sessions: {
            ...state.sessions,
            [sessionKey]: {
              key: sessionKey,
              name: sessionName as SessionName,
              year: Number.parseInt(year, 10),
              courseInstances: [
                ...(session?.courseInstances || []),
                newCourseInstance,
              ],
              totalCredits: calculateTotalCredits([
                ...(session?.courseInstances || []),
                newCourseInstance,
              ]),
            },
          },
        };
      });
    },

    removeCourseFromSession: (sessionKey, courseId) => {
      set((state) => {
        const session = state.sessions[sessionKey];
        if (!session) {
          return state;
        }

        const updatedCourseInstances = session.courseInstances.filter(
          instance => instance.courseId !== courseId,
        );
        const totalCredits = get().calculateSessionCredits(updatedCourseInstances);

        return {
          sessions: {
            ...state.sessions,
            [sessionKey]: {
              ...session,
              courseInstances: updatedCourseInstances,
              totalCredits,
              year: new Date().getFullYear(),
            },
          },
        };
      });
    },

    moveCourse: (fromKey, toKey, courseId) => {
      set((state) => {
        const fromSession = state.sessions[fromKey];
        const toSession = state.sessions[toKey];
        if (!fromSession || !toSession) {
          return state;
        }

        const courseInstance = fromSession.courseInstances.find(
          instance => instance.courseId === courseId,
        );
        if (!courseInstance) {
          return state;
        }

        const updatedFromCourseInstances = fromSession.courseInstances.filter(
          instance => instance.courseId !== courseId,
        );
        const updatedToCourseInstances = [...toSession.courseInstances, courseInstance];

        return {
          sessions: {
            ...state.sessions,
            [fromKey]: {
              ...fromSession,
              courseInstances: updatedFromCourseInstances,
              totalCredits: get().calculateSessionCredits(updatedFromCourseInstances),
              year: new Date().getFullYear(),
            },
            [toKey]: {
              ...toSession,
              courseInstances: updatedToCourseInstances,
              totalCredits: get().calculateSessionCredits(updatedToCourseInstances),
              year: new Date().getFullYear(),
            },
          },
        };
      });
    },

    getSessionCourses: (sessionKey) => {
      const session = get().sessions[sessionKey];
      return session?.courseInstances || [];
    },

    calculateSessionCredits: (courseInstances) => {
      return courseInstances.reduce((total, instance) => {
        const course = useCourseStore.getState().getCourse(instance.courseId);
        return total + (course?.credits || 0);
      }, 0);
    },

    setSessions: sessions => set({ sessions }),

    clearAllSessions: () => set({ sessions: {} }),

    getSessionsByYear: (year: number) => {
      const { sessions } = get();
      return Object.values(sessions).filter(session => session.year === year);
    },

    getSessionByKey: (sessionKey: string) => {
      return get().sessions[sessionKey];
    },
  })),
);
