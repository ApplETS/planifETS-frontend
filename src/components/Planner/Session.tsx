'use client';

import type { TermEnum } from '@/types/session';
import { useCallback } from 'react';

import { useSessionDrop } from '@/hooks/session/useSessionDrop';
import { useSessionOperations } from '@/hooks/session/useSessionOperations';
import { useCourseStore } from '@/store/courseStore';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey, isCourseAvailableInSession } from '@/utils/sessionUtils';
import CoursesList from './CoursesList';
import SessionHeader from './SessionHeader';

type SessionProps = {
  sessionYear: number;
  sessionTerm: TermEnum;
};

export default function Session({ sessionYear, sessionTerm }: SessionProps) {
  const { courseInstances, sessionTiming, handleRemoveCourse, sessionTotalCredits }
    = useSessionOperations(sessionYear, sessionTerm);

  const { getCourse } = useCourseStore();
  const sessionKey = generateSessionKey(sessionYear, sessionTerm);
  const session = useSessionStore((state) => state.sessions[sessionKey]);
  const isKnownSessionAvailability = session?.isKnownSessionAvailability;
  const { drop, isOver, canDrop, draggedItem } = useSessionDrop({
    sessionYear,
    sessionTerm,
    sessionTiming,
  });
  const getSessionBorderColor = () => {
    if (!draggedItem || !draggedItem.course) {
      return isOver ? 'border-blue-400' : 'border-border';
    }
    if (isKnownSessionAvailability === false) {
      if (isOver) {
        return 'border-blue-500';
      }
      if (canDrop) {
        return 'border-blue-700';
      }
      return 'border-blue-500';
    }
    const isAvailable = isCourseAvailableInSession(
      draggedItem.course.id,
      sessionTerm,
      sessionYear,
      getCourse,
    );
    if (isAvailable && canDrop) {
      return isOver ? 'border-green-400' : 'border-green-600';
    }
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
        isNoAvailabilityData={isKnownSessionAvailability === false && courseInstances.length > 0}
        isCurrentSession={sessionTiming.isCurrent}
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
