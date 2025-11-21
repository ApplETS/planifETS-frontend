'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import YearSection from '@/components/Planner/YearSection';
import { ProgramSection } from '@/components/ProgramSection';
import { usePreloadCourses } from '@/hooks/course/usePreloadCourses';
import { Button } from '@/shadcn/ui/button';
import { usePlannerStore } from '@/store/plannerStore';
import { useSessionStore } from '@/store/sessionStore';

export default function PlannerPage() {
  const t = useTranslations('PlannerPage');

  const { initializePlanner, getYears, addYear } = usePlannerStore();
  const { getSessionsByYear, initializeSessions } = useSessionStore();

  usePreloadCourses();

  useEffect(() => {
    const sessionStore = useSessionStore.getState();

    if (Object.keys(sessionStore.sessions).length === 0) {
      initializePlanner();

      getYears().forEach((year) => {
        const yearSessions = sessionStore.getSessionsByYear(year);
        if (yearSessions.length === 0) {
          initializeSessions(year);
        }
      });
    }
  }, [initializePlanner, getYears, initializeSessions]);

  const years = getYears();

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

      <div className="mt-4 flex justify-center">
        <Button variant="default" size="default" onClick={addYear}>
          <FaPlus className="mr-2" />
          {t('add-year')}
        </Button>
      </div>
    </div>
  );
}
