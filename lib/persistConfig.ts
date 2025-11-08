import type { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import forage from './localForageConfig';

/**
 * Central persist configuration using LocalForage.
 *
 * @param name - Unique name for the store.
 * @param create - Zustand state creator.
 * @returns Zustand store with persist middleware.
 */
export const persistConfig = <T>(
  name: string,
  create: StateCreator<T>,
) =>
  persist(create, {
    name,
    storage: forage,
    partialize: (state: T) => {
      const serializedState: Partial<T> = {};
      Object.keys(state as object).forEach((key) => {
        const value = state[key as keyof T];
        if (typeof value !== 'function') {
          serializedState[key as keyof T] = value;
        }
      });
      return serializedState;
    },
    version: 1,
  });

export const resetStore = async () => {
  await forage.clear();
};
