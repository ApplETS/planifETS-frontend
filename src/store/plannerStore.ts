import { SessionEnum, type SessionName } from '@/types/session';
import { extractYearFromSessionKey, generateSessionKey } from '@/utils/sessionUtils';
import { persistConfig } from 'lib/persistConfig';
import { create } from 'zustand';
import { useSessionStore } from './sessionStore';

type PlannerState = {
  name: string;
  sessionKeys: string[];
  totalCredits: number;
};

type PlannerActions = {
  initializePlanner: () => void;
  addYear: () => void;
  deleteYear: (year: number) => void;
  getSessionKeysForYear: (year: number) => string[];
  getYears: () => number[];
  recalculateTotalCredits: () => void;
};

const NUMBER_OF_YEARS_TO_CREATE = 4;

export const usePlannerStore = create<PlannerState & PlannerActions>()(
  persistConfig('planner-store', (set, get) => ({
    name: 'Default Planner',
    sessionKeys: [],
    totalCredits: 0,

    recalculateTotalCredits: () => {
      const sessionStore = useSessionStore.getState();
      const totalCredits = get().sessionKeys.reduce((total, sessionKey) => {
        const session = sessionStore.getSessionByKey(sessionKey);
        return total + (session?.totalCredits ?? 0);
      }, 0);
      set({ totalCredits });
    },

    initializePlanner: () => {
      const currentYear = new Date().getFullYear();
      const sessionKeys: string[] = [];

      for (let year = currentYear; year < currentYear + NUMBER_OF_YEARS_TO_CREATE; year++) {
        Object.values(SessionEnum).forEach((sessionName: SessionName) => {
          sessionKeys.push(generateSessionKey(year, sessionName));
        });
        useSessionStore.getState().initializeSessions(year);
      }

      set({ sessionKeys });
      get().recalculateTotalCredits();
    },

    addYear: () => {
      set((state) => {
        const years = state.sessionKeys
          .map(key => key.split('-')[0])
          .filter((year): year is string => year !== undefined)
          .map(year => Number.parseInt(year, 10));

        const maxYear = Math.max(...years, 0);
        const newYear = maxYear + 1;
        const newKeys = Object.values(SessionEnum).map((sessionName: SessionName) =>
          generateSessionKey(newYear, sessionName),
        );

        useSessionStore.getState().initializeSessions(newYear);

        return {
          sessionKeys: [...state.sessionKeys, ...newKeys],
        };
      });
      get().recalculateTotalCredits();
    },

    getSessionKeysForYear: (year: number) => {
      const yearStr = year.toString();
      return get().sessionKeys.filter(key => key.substring(1) === yearStr);
    },

    getYears: () => {
      const state = get();
      const years = state.sessionKeys
        .map(extractYearFromSessionKey);

      return [...new Set(years)].sort((a, b) => a - b);
    },

    deleteYear: (year: number) => {
      const yearStr = year.toString();
      const keysToDelete = get().sessionKeys.filter(key => key.substring(1) === yearStr);

      const sessionStore = useSessionStore.getState();

      keysToDelete.forEach((key) => {
        delete sessionStore.sessions[key];
      });
      sessionStore.setSessions({ ...sessionStore.sessions });

      set(state => ({
        sessionKeys: state.sessionKeys.filter(key => key.substring(1) !== yearStr),
      }));
      get().recalculateTotalCredits();
    },
  })),
);
