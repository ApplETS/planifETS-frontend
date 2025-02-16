import { SessionEnum, type SessionName } from '@/types/session';
import { generateSessionKey } from '@/utils/sessionUtils';
import { persistConfig } from 'lib/persistConfig';
import { create } from 'zustand';
import { useSessionStore } from './sessionStore';

type PlannerState = {
  name: string;
  sessionKeys: string[];
};

type PlannerActions = {
  initializePlanner: () => void;
  addYear: () => void;
  deleteYear: (year: number) => void;
  getSessionKeysForYear: (year: number) => string[];
  getYears: () => number[];
};

export const usePlannerStore = create<PlannerState & PlannerActions>()(
  persistConfig('planner-store', (set, get) => ({
    name: 'Default Planner',
    sessionKeys: [],

    initializePlanner: () => {
      const currentYear = new Date().getFullYear();
      const sessionKeys: string[] = [];

      for (let year = currentYear; year < currentYear + 4; year++) {
        Object.values(SessionEnum).forEach((session: SessionName) => {
          sessionKeys.push(generateSessionKey(year, session));
        });
        useSessionStore.getState().initializeSessions(year);
      }

      set({ sessionKeys });
    },

    addYear: () => {
      set((state) => {
        const years = state.sessionKeys
          .map(key => key.split('-')[0])
          .filter((year): year is string => year !== undefined)
          .map(year => Number.parseInt(year, 10));

        const maxYear = Math.max(...years, 0);
        const newYear = maxYear + 1;
        const newKeys = Object.values(SessionEnum).map((session: SessionName) =>
          generateSessionKey(newYear, session),
        );

        useSessionStore.getState().initializeSessions(newYear);

        return {
          sessionKeys: [...state.sessionKeys, ...newKeys],
        };
      });
    },

    deleteYear: (year: number) => {
      const keysToDelete = get().sessionKeys.filter(key => key.startsWith(`${year}-`));
      const sessionStore = useSessionStore.getState();
      keysToDelete.forEach((key) => {
        delete sessionStore.sessions[key];
      });
      sessionStore.setSessions({ ...sessionStore.sessions });

      set(state => ({
        sessionKeys: state.sessionKeys.filter(key => !key.startsWith(`${year}-`)),
      }));
    },

    getSessionKeysForYear: (year: number) => {
      return get().sessionKeys.filter(key => key.startsWith(`${year}-`));
    },

    getYears: () => {
      return [...new Set(get().sessionKeys.map(key => key.split('-')[0]).filter((year): year is string => year !== undefined).map(year => Number.parseInt(year, 10)),
      )].sort();
    },
  })),
);
