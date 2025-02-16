'use client';

import YearSection from '@/components/Planner/YearSection';
import ProgramSection from '@/components/ProgramSection';
import { usePlannerStore } from '@/store/plannerStore';
import { useSessionStore } from '@/store/sessionStore';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function PlannerPage() {
  const { initializePlanner, getYears, addYear } = usePlannerStore();
  const { getSessionsByYear, initializeSessions } = useSessionStore();

  useEffect(() => {
    initializePlanner();
    // Initialize sessions for each year
    getYears().forEach((year) => {
      initializeSessions(year);
    });
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
            isLastYear={year === Math.max(...years)}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="contained"
          color="primary"
          onClick={addYear}
          startIcon={<FaPlus />}
        >
          Ajouter une année
        </Button>
      </div>
    </div>
  );
}
