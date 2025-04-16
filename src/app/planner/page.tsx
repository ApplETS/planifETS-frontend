'use client';

import YearSection from '@/components/Planner/YearSection';
import { ProgramSection } from '@/components/ProgramSection';
import { usePlannerStore } from '@/store/plannerStore';
import { useSessionStore } from '@/store/sessionStore';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function PlannerPage() {
  const t = useTranslations('PlannerPage');

  const { initializePlanner, getYears, addYear } = usePlannerStore();
  const { getSessionsByYear, initializeSessions } = useSessionStore();

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

      <div className="mt-6 w-full space-y-4" data-testid="year-sections">
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
        <Button
          variant="contained"
          color="primary"
          onClick={addYear}
          startIcon={<FaPlus />}
          data-testid="add-year-button"
        >
          {t('add-a-year')}
        </Button>
      </div>
    </div>
  );
}
