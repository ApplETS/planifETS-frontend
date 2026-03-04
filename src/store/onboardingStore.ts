/**
 * Onboarding Store
 * Purpose: Track whether user has completed initial onboarding and store their start session
 * What it stores (user's persistent data):
 * - hasCompletedOnboarding: boolean - Whether user has completed onboarding flow
 * - startYear: number - The year the user started their program
 */

import { create } from 'zustand';
import { persistConfig } from '@/lib/persistConfig';

type OnboardingState = {
  hasCompletedOnboarding: boolean;
  startYear: number | null;
};

type OnboardingActions = {
  completeOnboarding: (startYear: number) => void;
  getStartYear: () => { startYear: number } | null;
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persistConfig('onboarding-store', (set, get) => ({
    hasCompletedOnboarding: false,
    startYear: null,

    completeOnboarding: (startYear: number) => {
      set({
        hasCompletedOnboarding: true,
        startYear,
      });
    },

    getStartYear: () => {
      const { startYear } = get();
      if (startYear === null) {
        return null;
      }
      return { startYear };
    },
  })),
);
