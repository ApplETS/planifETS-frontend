'use client';

import type { FC } from 'react';

import { useIsMobile } from '@/hooks/use-mobile';
import ProgramSelector from './ProgramSelector';

export const ProgramSection: FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full">
      <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-4 pl-2'}`}>
        <ProgramSelector />
      </div>
    </header>
  );
};
