'use client';

import type { FC } from 'react';
import type { SessionEnum } from '@/types/session';
import { useCallback } from 'react';

import { useSessionDrop } from '@/hooks/session/useSessionDrop';
import { useSessionOperations } from '@/hooks/session/useSessionOperations';
import { useCourseStore } from '@/store/courseStore';
import { isCourseAvailableInSession } from '@/utils/sessionUtils';
import CoursesList from './CoursesList';
import SessionHeader from './SessionHeader';

type SessionProps = {
  sessionYear: number;
  sessionTerm: SessionEnum;
};

const Session: FC<SessionProps> = ({ sessionYear, sessionTerm }) => {
  const { courseInstances, sessionTiming, handleRemoveCourse, sessionTotalCredits }
    = useSessionOperations(sessionYear, sessionTerm);

  const { getCourse } = useCourseStore();
  const { drop, isOver, canDrop, draggedItem } = useSessionDrop({
    sessionYear,
    sessionTerm,
    sessionTiming,
  });

  const getSessionBorderStyle = () => {
    if (!draggedItem || !draggedItem.course) {
      return 'border-transparent';
    }

    const isAvailable = isCourseAvailableInSession(
      draggedItem.course.id,
      sessionTerm,
      sessionYear,
      getCourse,
    );

    // Show green for available sessions where drop is allowed
    if (isAvailable && canDrop) {
      return isOver
        ? 'bg-green-500/20 border border-green-500'
        : 'border border-green-500/40';
    }

    // Show red for unavailable sessions or when drop is not allowed
    if (isOver) {
      return 'bg-destructive/20 border border-destructive';
    }

    return 'border border-transparent';
  };

  const dropRef = useCallback(
    (node: HTMLDivElement | null) => {
      drop(node);
    },
    [drop],
  );

  return (
    <div
      ref={dropRef}
      className={`rounded-lg border-2 p-4 transition-all duration-300 bg-background ${getSessionBorderStyle()}
        ${isOver && canDrop ? 'bg-background/90' : ''}`}
      data-testid={`session-${sessionTerm}-${sessionYear}-drop-target`}
    >
      <SessionHeader
        sessionTerm={sessionTerm}
        sessionYear={sessionYear}
        totalCredits={sessionTotalCredits}
        isNoAvailabilityData={false}
      />
      <CoursesList
        hasCourses={courseInstances.length > 0}
        courseInstances={courseInstances}
        sessionTiming={sessionTiming}
        onRemoveCourse={handleRemoveCourse}
        sessionYear={sessionYear}
        sessionTerm={sessionTerm}
      />
    </div>
  );
};

export default Session;
