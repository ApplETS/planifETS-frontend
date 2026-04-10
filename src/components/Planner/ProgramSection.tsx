'use client';

import type { FC } from 'react';

import ProgramSelector from './ProgramMultiSelector';

export const ProgramSection: FC = () => {
  return (
    <header className="w-full" data-print-section="programs">
      <div className="px-2">
        <ProgramSelector />
      </div>
    </header>
  );
};
