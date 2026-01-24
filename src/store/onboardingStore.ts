/**
 * Onboarding Store
 * Purpose: Track whether user has completed initial onboarding and store their start session
 * What it stores (user's persistent data):
 * - hasCompletedOnboarding: boolean - Whether user has completed onboarding flow
 * - startYear: number - The year the user started their program
 * - startTerm: SessionEnum - The session term the user started (H, E, or A)
 */

import type { SessionEnum } from '@/types/session';
import { create } from 'zustand';
import { persistConfig } from '@/lib/persistConfig';

type OnboardingState = {
  hasCompletedOnboarding: boolean;
  startYear: number | null;
  startTerm: SessionEnum | null;
};

type OnboardingActions = {
  completeOnboarding: (startYear: number, startTerm: SessionEnum) => void;
  getStartSession: () => { startYear: number; startTerm: SessionEnum } | null;
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persistConfig('onboarding-store', (set, get) => ({
    hasCompletedOnboarding: false,
    startYear: null,
    startTerm: null,

    completeOnboarding: (startYear: number, startTerm: SessionEnum) => {
      set({
        hasCompletedOnboarding: true,
        startYear,
        startTerm,
      });
    },

    getStartSession: () => {
      const { startYear, startTerm } = get();
      if (startYear === null || startTerm === null) {
        return null;
      }
      return { startYear, startTerm };
    },
  })),
);
