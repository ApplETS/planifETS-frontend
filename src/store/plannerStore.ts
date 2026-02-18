/**
 * Planner Store
 * What it stores (user's persistent data):
 * - name: (e.g., 'Default Planner', 'Fall 2024 Plan')
 * - sessionKeys: string[] - Array of session keys that exist (e.g., ['A2024', 'H2025', 'E2025'])
 * - favoriteCourses: number[] - User's favorited course IDs (moved from courseStore)
 */

import type { TermEnum } from '@/types/session';

import { create } from 'zustand';
import { persistConfig } from '@/lib/persistConfig';
import { safeHas } from '@/utils/safeAccess';
import {
  extractYearFromSessionKey,
  generateSessionKey,
  generateSessionRange,
  ORDERED_SESSION_TERMS,
} from '@/utils/sessionUtils';

import { useCourseStore } from './courseStore';
import { useSessionStore } from './sessionStore';

type PlannerState = {
  name: string;
  sessionKeys: string[];
  favoriteCourses: number[];
};

type PlannerActions = {
  initializePlanner: (startYear: number, startTerm: TermEnum) => void;
  addYear: () => void;
  deleteYear: (year: number) => void;
  getSessionKeysForYear: (year: number) => string[];
  getYears: () => number[];
  getTotalCredits: () => number;
  toggleFavorite: (courseId: number) => void;
  isFavorite: (courseId: number) => boolean;
};

export const usePlannerStore = create<PlannerState & PlannerActions>()(
  persistConfig('planner-store', (set, get) => ({
    name: 'Default Planner',
    sessionKeys: [],
    favoriteCourses: [],

    toggleFavorite: (courseId: number) => {
      set((state) => {
        const favorites = [...state.favoriteCourses];
        const index = favorites.indexOf(courseId);

        if (index !== -1) {
          favorites.splice(index, 1);
        } else {
          favorites.push(courseId);
        }

        return { favoriteCourses: favorites };
      });
    },

    isFavorite: (courseId: number) => get().favoriteCourses.includes(courseId),

    getTotalCredits: () => {
      const sessionStore = useSessionStore.getState();
      const courseStore = useCourseStore.getState();

      return get().sessionKeys.reduce((total, sessionKey) => {
        const courseInstances = sessionStore.getSessionCourses(sessionKey);
        const sessionCredits = courseInstances.reduce((sessionTotal, instance) => {
          const course = courseStore.getCourse(instance.courseId);
          return sessionTotal + (course?.credits ?? 0);
        }, 0);
        return total + sessionCredits;
      }, 0);
    },

    initializePlanner: (startYear: number, startTerm: TermEnum) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const endYear = Math.max(currentYear, startYear);

      const sessionKeys = generateSessionRange(startYear, startTerm, endYear);

      sessionKeys.forEach((key) => {
        const year = extractYearFromSessionKey(key);
        useSessionStore.getState().initializeSessions(year);
      });

      set({ sessionKeys });
    },

    addYear: () => {
      set((state) => {
        const years = state.sessionKeys.map(extractYearFromSessionKey);

        const maxYear = Math.max(...years, 0);
        const newYear = maxYear + 1;
        const newKeys = ORDERED_SESSION_TERMS.map((sessionTerm: TermEnum) =>
          generateSessionKey(newYear, sessionTerm),
        );

        useSessionStore.getState().initializeSessions(newYear);

        return {
          sessionKeys: [...state.sessionKeys, ...newKeys],
        };
      });
    },

    getSessionKeysForYear: (year: number) => {
      return get().sessionKeys.filter((key) => extractYearFromSessionKey(key) === year);
    },

    getYears: () => {
      const state = get();
      const years = state.sessionKeys.map(extractYearFromSessionKey);

      return [...new Set(years)].sort((a, b) => a - b);
    },

    deleteYear: (year: number) => {
      const keysToDelete = get().getSessionKeysForYear(year);

      const sessionStore = useSessionStore.getState();
      const newSessions = { ...sessionStore.sessions };

      keysToDelete.forEach((key) => {
        // Safe to use delete since we're modifying, not reading
        if (safeHas(newSessions, key)) {
          delete newSessions[key];
        }
      });
      sessionStore.setSessions(newSessions);

      set((state) => ({
        sessionKeys: state.sessionKeys.filter(
          (key) => extractYearFromSessionKey(key) !== year,
        ),
      }));
    },
  })),
);
