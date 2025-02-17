'use client';

import type { SessionName } from '@/types/session';
import type { FC } from 'react';
import { useSessionDrop } from '@/hooks/planner/useSessionDrop';
import { useSessionOperations } from '@/hooks/session/useSessionOperations';
import { useCallback } from 'react';
import CoursesList from './CoursesList';
import SessionHeader from './SessionHeader';

type SessionProps = {
  year: number;
  sessionName: SessionName;
};

const Session: FC<SessionProps> = ({ year, sessionName }) => {
  const {
    courseInstances,
    sessionTiming,
    handleRemoveCourse,
    handleMoveCourse,
    sessionTotalCredits,
  } = useSessionOperations(year, sessionName);

  const { drop, isOver, canDrop } = useSessionDrop({
    year,
    sessionName,
    sessionTiming,
  });

  const dropRef = useCallback((node: HTMLDivElement | null) => {
    drop(node);
  }, [drop]);

  return (
    <div
      ref={dropRef}
      className={`rounded-lg border ${
        isOver && canDrop ? 'border-buttonTags bg-sessions/50' : 'border-transparent'
      } bg-sessions p-4 transition-colors duration-200`}
      data-testid={`session-${sessionName}-${year}-drop-target`}
    >
      <SessionHeader
        sessionName={sessionName}
        year={year}
        totalCredits={sessionTotalCredits}
        isNoAvailabilityData={false}
      />
      <CoursesList
        hasCourses={courseInstances.length > 0}
        courseInstances={courseInstances}
        sessionTiming={sessionTiming}
        onRemoveCourse={handleRemoveCourse}
        onMoveCourse={handleMoveCourse}
        year={year}
        sessionName={sessionName}
      />
    </div>
  );
};

export default Session;
