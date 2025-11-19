/**
 * Program Store
 * Purpose: Store which programs the user has selected to view and track course associations
 * Key principle: Store only user's program choices (IDs/codes), not the program catalog data
 * What it stores (user's persistent data):
 * - selectedPrograms: string[] - Array of selected program codes/IDs
 * - programCourseIds: Record<string, number[]> - Maps program codes/IDs to arrays of associated course IDs
 */

import { create } from 'zustand';
import { persistConfig } from '@/lib/persistConfig';

type ProgramState = {
  selectedPrograms: number[];
  programCourseIds: Record<number, number[]>;
};

type ProgramActions = {
  getSelectedPrograms: () => number[];
  getProgramCourseIds: (program: number | null) => number[];
  setSelectedPrograms: (programs: number[]) => void;
  setProgramCourses: (program: number, courseIds: number[]) => void;
  addProgramCourse: (program: number, courseId: number) => void;
  removeProgramCourse: (program: number, courseId: number) => void;
  clearProgramCourseIds: (program?: number) => void;
};

export const useProgramStore = create<ProgramState & ProgramActions>()(
  persistConfig('program-store', (set, get) => ({
    selectedPrograms: [],
    programCourseIds: {},

    getSelectedPrograms: () => get().selectedPrograms,

    getProgramCourseIds: (program) => {
      if (!program) {
        return [];
      }
      return get().programCourseIds[program] || [];
    },

    setSelectedPrograms: programs => set({ selectedPrograms: programs }),

    setProgramCourses: (program, courseIds) =>
      set(state => ({
        programCourseIds: {
          ...state.programCourseIds,
          [program]: courseIds,
        },
      })),

    addProgramCourse: (program, courseId) =>
      set((state) => {
        const currentCourses = state.programCourseIds[program] || [];
        if (currentCourses.includes(courseId)) {
          return state;
        }

        return {
          programCourseIds: {
            ...state.programCourseIds,
            [program]: [...currentCourses, courseId],
          },
        };
      }),

    removeProgramCourse: (program, courseId) =>
      set((state) => {
        const currentCourses = state.programCourseIds[program] || [];
        return {
          programCourseIds: {
            ...state.programCourseIds,
            [program]: currentCourses.filter(id => id !== courseId),
          },
        };
      }),

    clearProgramCourseIds: program =>
      set((state) => {
        if (program) {
          const { [program]: _, ...rest } = state.programCourseIds;
          return { programCourseIds: rest };
        }
        return { programCourseIds: {} };
      }),
  })),
);
