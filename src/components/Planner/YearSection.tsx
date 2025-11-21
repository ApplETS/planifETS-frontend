'use client';

import type { Session as SessionType } from '@/types/session';

import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/shadcn/ui/button';
import { usePlannerStore } from '@/store/plannerStore';
import Session from './Session';

type YearSectionProps = {
  year: number;
  sessions: SessionType[];
  isFirstYear: boolean;
  isLastYear: boolean;
};

const EMPTY_SESSIONS: SessionType[] = [];

const YearSection: React.FC<YearSectionProps> = ({ year, sessions = EMPTY_SESSIONS, isFirstYear, isLastYear }) => {
  const t = useTranslations('PlannerPage');
  const [isHovered, setIsHovered] = useState(false);
  const deleteYear = usePlannerStore(state => state.deleteYear);

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && isLastYear && !isFirstYear && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute -right-1 z-10 size-7"
          onClick={() => deleteYear(year)}
          aria-label="Delete year"
        >
          <Trash className="size-4" />
        </Button>
      )}
      <div className="rounded-lg border border-primary bg-secondary p-4 shadow-lg">
        <h2 className="mb-2.5 text-xl font-semibold text-foreground">
          {t('year-with-value', { value: year })}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {sessions.map(session => (
            <Session
              key={session.key}
              sessionYear={year}
              sessionTerm={session.sessionTerm}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearSection;
