'use client';

import type { FC } from 'react';

import PlannerSelector from './PlannerSelector';
import ProgramSelector from './ProgramMultiSelector';

export const ProgramSection: FC<{ plannerDisabled: boolean }> = ({ plannerDisabled }) => {
  return (
    <header className="w-full" data-print-section="programs">
      <div className="flex flex-col gap-2 px-2 lg:flex-row lg:items-stretch">
        <PlannerSelector disabled={plannerDisabled} />
        <div className="min-w-0 w-full flex-1 lg:order-first">
          <ProgramSelector />
        </div>
      </div>
    </header>
  );
};
