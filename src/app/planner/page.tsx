'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import YearSection from '@/components/Planner/YearSection';
import { ProgramSection } from '@/components/ProgramSection';
import { usePreloadCourses } from '@/hooks/course/usePreloadCourses';

import { useStoreHydration } from '@/hooks/useStoreHydration';
import { Button } from '@/shadcn/ui/button';
import { useCourseStore } from '@/store/courseStore';
import { usePlannerStore } from '@/store/plannerStore';
import { useSessionStore } from '@/store/sessionStore';

export default function PlannerPage() {
  const t = useTranslations('Commons');

  const { initializePlanner, getYears, addYear } = usePlannerStore();
  const { getSessionsByYear, sessions } = useSessionStore();
  const { courses } = useCourseStore();
  const hasHydrated = useStoreHydration();

  usePreloadCourses();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const plannerState = usePlannerStore.getState();
    const sessionState = useSessionStore.getState();

    // Only initialize if both stores are empty (first time user)
    if (plannerState.sessionKeys.length === 0 && Object.keys(sessionState.sessions).length === 0) {
      initializePlanner();
    }
  }, [initializePlanner, hasHydrated]);

  const years = getYears();

  // Calculate total credits across all sessions
  const totalCredits = Object.values(sessions).reduce((sum, session) => {
    return sum + session.courseInstances.reduce((s, ci) => {
      const course = courses[ci.courseId];
      return s + (course?.credits ?? 0);
    }, 0);
  }, 0);

  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        <ProgramSection />
      </div>

      <div className="w-full flex flex-col gap-4 p-2" data-testid="year-sections">
        {years.map(year => (
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
          <Plus className="mr-2" />
          {t('add-year')}
        </Button>
      </div>
    </div>
  );
}
