import { create } from 'zustand';
import { persistConfig } from '../../lib/persistConfig';

type ProgramState = {
  selectedProgram: string | null;
  setSelectedProgram: (program: string | null) => void;
};

export const useProgramStore = create<ProgramState>()(
  persistConfig('programStore', set => ({
    selectedProgram: null,
    setSelectedProgram: program => set({ selectedProgram: program }),
  })),
);
