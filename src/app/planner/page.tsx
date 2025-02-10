'use client';

import type { YearData } from '@/types/planner';
import YearSection from '@/components/Planner/YearSection';
import ProgramSection from '@/components/ProgramSection';

import { CreditsProvider } from '@/context/credits/CreditsContext';
import { usePlannerContext } from '@/context/planner/usePlannerContext';
import Button from '@mui/material/Button';
import { FaPlus } from 'react-icons/fa';

export default function PlannerPage() {
  const {
    plannerData,
    addCourseToSession,
    moveCourseBetweenSessions,
    removeCourseFromSession,
    deleteYear,
    addYear,
  } = usePlannerContext();

  const handleAddYear = () => {
    addYear();
  };

  return (
    <CreditsProvider>
      <div className="flex w-full flex-col">
        <div className="w-full">
          <ProgramSection />
        </div>

        <div className="mt-6 w-full space-y-4" data-testid="year-sections">
          {plannerData.map((yearData: YearData) => (
            <YearSection
              key={yearData.year}
              year={yearData.year}
              sessions={yearData.sessions}
              addCourseToSession={addCourseToSession}
              moveCourseBetweenSessions={moveCourseBetweenSessions}
              removeCourseFromSession={removeCourseFromSession}
              deleteYear={deleteYear}
              isLastYear={yearData.year === Math.max(...plannerData.map((y: YearData) => y.year))}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddYear}
            startIcon={<FaPlus />}
          >
            Ajouter une année
          </Button>
        </div>
      </div>
    </CreditsProvider>
  );
}
