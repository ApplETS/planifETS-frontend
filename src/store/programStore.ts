import { create } from 'zustand';
import { persistConfig } from '../../lib/persistConfig';

type ProgramState = {
  selectedPrograms: string[];
  programCourseIds: Record<string, number[]>;
};

type ProgramActions = {
  getSelectedPrograms: () => string[];
  getProgramCourseIds: (program: string | null) => number[];
  setSelectedPrograms: (programs: string[]) => void;
  setProgramCourses: (program: string, courseIds: number[]) => void;
  addProgramCourse: (program: string, courseId: number) => void;
  removeProgramCourse: (program: string, courseId: number) => void;
  clearProgramCourseIds: (program?: string) => void;
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
