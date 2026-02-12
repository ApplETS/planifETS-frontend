'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import OnboardingDialog from '@/components/dialogs/OnboardingDialog';
import YearSection from '@/components/Planner/YearSection';
import { ProgramSection } from '@/components/ProgramSection';
import { usePreloadCourses } from '@/hooks/course/usePreloadCourses';
import { useLatestAvailableSessionApi } from '@/hooks/session/useLatestAvailableSessionApi';

import { useStoreHydration } from '@/hooks/useStoreHydration';
import { Button } from '@/shadcn/ui/button';
import { useCourseStore } from '@/store/courseStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { usePlannerStore } from '@/store/plannerStore';
import { useSessionStore } from '@/store/sessionStore';

export default function PlannerPage() {
  const t = useTranslations('Commons');

  const { initializePlanner, getYears, addYear } = usePlannerStore();
  const { getSessionsByYear, sessions } = useSessionStore();
  const { courses } = useCourseStore();
  const { hasCompletedOnboarding } = useOnboardingStore();
  const hasHydrated = useStoreHydration();

  useLatestAvailableSessionApi();
  usePreloadCourses();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    // Only initialize if onboarding is complete and stores are empty
    if (hasCompletedOnboarding) {
      const plannerState = usePlannerStore.getState();
      const sessionState = useSessionStore.getState();
      const onboardingState = useOnboardingStore.getState();

      // Only initialize if both stores are empty (first time after onboarding)
      if (
        plannerState.sessionKeys.length === 0
        && Object.keys(sessionState.sessions).length === 0
      ) {
        const startSession = onboardingState.getStartSession();
        if (startSession) {
          initializePlanner(startSession.startYear, startSession.startTerm);
        }
      }
    }
  }, [initializePlanner, hasHydrated, hasCompletedOnboarding]);

  const years = getYears();

  // Calculate total credits across all sessions
  const totalCredits = Object.values(sessions).reduce((sum, session) => {
    return (
      sum
      + session.courseInstances.reduce((s, ci) => {
        const course = courses[ci.courseId];
        return s + (course?.credits ?? 0);
      }, 0)
    );
  }, 0);

  // Show onboarding dialog if not completed yet and hydrated
  if (hasHydrated && !hasCompletedOnboarding) {
    return <OnboardingDialog isOpen={true} />;
  }

  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        <ProgramSection />
      </div>

      <div className="w-full flex flex-col gap-4 p-2" data-testid="year-sections">
        {years.map((year) => (
          <YearSection
            key={year}
            year={year}
            sessions={getSessionsByYear(year)}
            isFirstYear={year === Math.min(...years)}
            isLastYear={year === Math.max(...years)}
          />
        ))}
      </div>

      <div className="mt-2 flex justify-center items-center gap-4">
        <Button
          variant="secondary"
          size="default"
          className="pointer-events-none select-none cursor-default"
          tabIndex={-1}
          data-testid="total-credits"
        >
          {totalCredits}
          {' '}
          {t('total-credits')}
        </Button>
        <Button variant="default" size="default" onClick={addYear}>
          <Plus />
          {t('add-year')}
        </Button>
      </div>
    </div>
  );
}
