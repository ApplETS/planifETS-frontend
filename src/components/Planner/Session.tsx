'use client';

import type { SessionName } from '@/types/session';
import type { FC } from 'react';
import { useSessionDrop } from '@/hooks/planner/useSessionDrop';
import { useSessionOperations } from '@/hooks/session/useSessionOperations';
import { useCourseStore } from '@/store/courseStore';
import { isCourseAvailableInSession } from '@/utils/sessionUtils';
import { useCallback } from 'react';
import CoursesList from './CoursesList';
import SessionHeader from './SessionHeader';

type SessionProps = {
  sessionYear: number;
  sessionName: SessionName;
};

const Session: FC<SessionProps> = ({ sessionYear, sessionName }) => {
  const {
    courseInstances,
    sessionTiming,
    handleRemoveCourse,
    handleMoveCourse,
    sessionTotalCredits,
  } = useSessionOperations(sessionYear, sessionName);

  const { getCourse } = useCourseStore();
  const { drop, isOver, canDrop, draggedItem } = useSessionDrop({
    sessionYear,
    sessionName,
    sessionTiming,
  });

  const getSessionBorderStyle = () => {
    if (!draggedItem) {
      return 'border-transparent';
    }

    const isAvailable = isCourseAvailableInSession(
      draggedItem.course.id,
      sessionName,
      sessionYear,
      getCourse,
    );

    if (isAvailable) {
      return isOver && canDrop
        ? 'border-sessionAvailable-borderHover bg-sessionAvailable-bgHover/5'
        : 'border-sessionAvailable-border/40';
    }

    return isOver
      ? 'border-sessionUnavailable-borderHover bg-sessionUnavailable-bgHover/5'
      : 'border-transparent';
  };

  const dropRef = useCallback((node: HTMLDivElement | null) => {
    drop(node);
  }, [drop]);

  return (
    <div
      ref={dropRef}
      className={`rounded-lg border-2 ${getSessionBorderStyle()} 
        bg-sessions p-4 transition-all duration-300
        ${isOver && canDrop ? 'bg-sessions/90' : ''}`}
      data-testid={`session-${sessionName}-${sessionYear}-drop-target`}
    >
      <SessionHeader
        sessionName={sessionName}
        sessionYear={sessionYear}
        totalCredits={sessionTotalCredits}
        isNoAvailabilityData={false}
      />
      <CoursesList
        hasCourses={courseInstances.length > 0}
        courseInstances={courseInstances}
        sessionTiming={sessionTiming}
        onRemoveCourse={handleRemoveCourse}
        onMoveCourse={handleMoveCourse}
        sessionYear={sessionYear}
        sessionName={sessionName}
      />
    </div>
  );
};

export default Session;
