'use client';

import type { Session as SessionType } from '@/types/session';

import { usePlannerStore } from '@/store/plannerStore';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import BaseButton from '../atoms/buttons/BaseButton';
import Session from './Session';

type YearSectionProps = {
  year: number;
  sessions: SessionType[];
  isLastYear: boolean;
};

const EMPTY_SESSIONS: SessionType[] = [];

const YearSection: React.FC<YearSectionProps> = ({ year, sessions = EMPTY_SESSIONS, isLastYear }) => {
  const [isHovered, setIsHovered] = useState(false);
  const deleteYear = usePlannerStore(state => state.deleteYear);

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && isLastYear && (
        <BaseButton
          variant="danger"
          size="sm"
          className="absolute -right-1 -top-1 z-10"
          onClick={() => deleteYear(year)}
          aria-label="Delete year"
        >
          <FaTrash />
        </BaseButton>
      )}
      <div className="rounded-lg border border-buttonTags bg-yearSection p-4 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">{year}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {sessions.map(session => (
            <Session
              key={session.key}
              sessionYear={year}
              sessionName={session.sessionName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearSection;
