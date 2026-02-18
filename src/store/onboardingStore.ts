/**
 * Onboarding Store
 * Purpose: Track whether user has completed initial onboarding and store their start session
 * What it stores (user's persistent data):
 * - hasCompletedOnboarding: boolean - Whether user has completed onboarding flow
 * - startYear: number - The year the user started their program
 * - startTerm: TermEnum - The session term the user started (H, E, or A)
 */

import type { TermEnum } from '@/types/session';
import { create } from 'zustand';
import { persistConfig } from '@/lib/persistConfig';

type OnboardingState = {
  hasCompletedOnboarding: boolean;
  startYear: number | null;
  startTerm: TermEnum | null;
};

type OnboardingActions = {
  completeOnboarding: (startYear: number, startTerm: TermEnum) => void;
  getStartSession: () => { startYear: number; startTerm: TermEnum } | null;
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persistConfig('onboarding-store', (set, get) => ({
    hasCompletedOnboarding: false,
    startYear: null,
    startTerm: null,

    completeOnboarding: (startYear: number, startTerm: TermEnum) => {
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
