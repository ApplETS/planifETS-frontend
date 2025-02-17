import type { CourseInstance } from '@/types/course';
import type { Session, SessionName } from '@/types/session';
import { determineInitialStatus } from '@/utils/courseUtils';
import {
  calculateTotalCredits,
  createSessionsForYear,
  getSessionTiming,
} from '@/utils/sessionUtils';
import { persistConfig } from 'lib/persistConfig';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { useCourseStore } from './courseStore';
import { usePlannerStore } from './plannerStore';

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
  updateSessionTotalCredits: (sessionKey: string) => void;
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

    calculateSessionCredits: (courseInstances) => {
      const courseStore = useCourseStore.getState();
      return calculateTotalCredits(courseInstances, courseStore.getCourse);
    },

    updateSessionTotalCredits: (sessionKey: string) => {
      set((state) => {
        const session = state.sessions[sessionKey];
        if (!session) {
          return state;
        }

        const totalCredits = get().calculateSessionCredits(session.courseInstances);

        return {
          sessions: {
            ...state.sessions,
            [sessionKey]: {
              ...session,
              totalCredits,
            },
          },
        };
      });
      usePlannerStore.getState().recalculateTotalCredits();
    },

    addCourseToSession: (sessionKey, courseId) => {
      const [year = '', sessionName = ''] = sessionKey.split('-');
      if (!year || !sessionName) {
        return;
      }

      set((state) => {
        const session = state.sessions[sessionKey];
        if (!session) {
          console.error(`Session not found${sessionKey}`);
          return state;
        }

        const courseExists = session.courseInstances.some(
          instance => instance.courseId === courseId,
        );
        if (courseExists) {
          const course = useCourseStore.getState().getCourse(courseId);
          enqueueSnackbar(`${course?.code || 'Course'} is already in this session`, {
            variant: 'warning',
          });
          return state;
        }

        const timing = getSessionTiming(Number(year), sessionName as SessionName);

        const newCourseInstance: CourseInstance = {
          courseId,
          status: determineInitialStatus(timing),
        };

        const updatedCourseInstances = [
          ...(session.courseInstances || []),
          newCourseInstance,
        ];

        return {
          sessions: {
            ...state.sessions,
            [sessionKey]: {
              key: sessionKey,
              name: sessionName as SessionName,
              year: Number.parseInt(year, 10),
              courseInstances: updatedCourseInstances,
              totalCredits: get().calculateSessionCredits(updatedCourseInstances),
            },
          },
        };
      });
      get().updateSessionTotalCredits(sessionKey);
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

        return {
          sessions: {
            ...state.sessions,
            [sessionKey]: {
              ...session,
              courseInstances: updatedCourseInstances,
              totalCredits: get().calculateSessionCredits(updatedCourseInstances),
            },
          },
        };
      });
      get().updateSessionTotalCredits(sessionKey);
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
            },
            [toKey]: {
              ...toSession,
              courseInstances: updatedToCourseInstances,
              totalCredits: get().calculateSessionCredits(updatedToCourseInstances),
            },
          },
        };
      });

      get().updateSessionTotalCredits(fromKey);
      get().updateSessionTotalCredits(toKey);
    },

    getSessionCourses: (sessionKey) => {
      const session = get().sessions[sessionKey];
      return session?.courseInstances || [];
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
