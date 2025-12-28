'use client';

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

export default function Session({ sessionYear, sessionTerm }: SessionProps) {
  const { courseInstances, sessionTiming, handleRemoveCourse, sessionTotalCredits }
    = useSessionOperations(sessionYear, sessionTerm);

  const { getCourse } = useCourseStore();
  const { drop, isOver, canDrop, draggedItem } = useSessionDrop({
    sessionYear,
    sessionTerm,
    sessionTiming,
  });

  // Only change border color, not thickness, for drag-and-drop and hover
  const getSessionBorderColor = () => {
    if (!draggedItem || !draggedItem.course) {
      return isOver ? 'border-blue-400' : 'border-border';
    }
    const isAvailable = isCourseAvailableInSession(
      draggedItem.course.id,
      sessionTerm,
      sessionYear,
      getCourse,
    );

    // Show green for available sessions where drop is allowed
    if (isAvailable && canDrop) {
      return isOver ? 'border-green-400' : 'border-green-600';
    }

    // Show red for unavailable sessions or when session unavailable
    if (isOver) {
      return 'border-red-500';
    }
    return 'border-border';
  };

  const dropRef = useCallback(
    (node: HTMLDivElement | null) => {
      drop(node);
    },
    [drop],
  );

  const isCurrentSession = sessionTiming.isCurrent;

  return (
    <div
      ref={dropRef}
      className={`rounded-lg border-2 p-4 transition-all duration-300 bg-background ${getSessionBorderColor()}`}
      data-testid={`session-${sessionTerm}-${sessionYear}-drop-target`}
      style={{ position: 'relative', zIndex: isOver ? 10 : undefined }}
    >
      <SessionHeader
        sessionTerm={sessionTerm}
        sessionYear={sessionYear}
        totalCredits={sessionTotalCredits}
        isNoAvailabilityData={false}
        isCurrentSession={isCurrentSession}
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
