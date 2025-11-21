'use client';

import type { FC } from 'react';

import { useIsMobile } from '@/hooks/use-mobile';
import { usePlannerStore } from '@/store/plannerStore';
import CreditsTag from './atoms/CreditsTag';
import ProgramSelector from './ProgramSelector';

export const ProgramSection: FC = () => {
  const isMobile = useIsMobile();
  const totalCredits = usePlannerStore(state => state.getTotalCredits());

  return (
    <header className="w-full">
      <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-4 pl-2'}`}>
        <ProgramSelector />
        <CreditsTag credits={totalCredits} data-testid="total-credits" />
      </div>
    </header>
  );
};
