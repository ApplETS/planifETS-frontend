'use client';

import type { Course } from '@/types/course';
import type { FC } from 'react';

import type { SessionName } from '../../context/planner/types/Session';
import { useAuthStore } from '@/store/authStore';
import { useCallback, useEffect, useState } from 'react';
import { useSessionDrop } from '../../hooks/planner/useSessionDrop';
import { ConfirmationDialog } from '../ConfirmationDialog';
import CoursesList from './CoursesList';
import SessionHeader from './SessionHeader';

type SessionProps = {
  sessionName: SessionName;
  courses: Course[];
  totalCredits: number;
  year: number;
  addCourseToSession: (year: number, sessionName: SessionName, course: Course) => void;
  moveCourseBetweenSessions: (
    fromYear: number,
    fromSession: SessionName,
    toYear: number,
    toSession: SessionName,
    course: Course
  ) => void;
  removeCourseFromSession: (
    year: number,
    sessionName: SessionName,
    courseCode: string
  ) => void;
};

type TimeInfo = {
  isCurrentSession: boolean;
  isFutureSession: boolean;
  isPastSession: boolean;
};

const Session: FC<SessionProps> = ({
  sessionName,
  courses,
  totalCredits,
  year,
  addCourseToSession,
  moveCourseBetweenSessions,
  removeCourseFromSession,
}) => {
  const { isLoggedIn } = useAuthStore();

  const [timeInfo, setTimeInfo] = useState<TimeInfo>({
    isCurrentSession: false,
    isFutureSession: false,
    isPastSession: false,
  });

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let isCurrentSession = false;
    let isFutureSession = false;
    let isPastSession = false;

    if (year < currentYear) {
      isPastSession = true;
    } else if (year > currentYear) {
      isFutureSession = true;
    } else {
      // Same year, check the session
      if (sessionName === 'Hiver' && currentMonth < 4) {
        isCurrentSession = true;
      } else if (sessionName === 'Été' && currentMonth >= 4 && currentMonth < 8) {
        isCurrentSession = true;
      } else if (sessionName === 'Automne' && currentMonth >= 8) {
        isCurrentSession = true;
      } else if (sessionName === 'Hiver' && currentMonth >= 4) {
        isPastSession = true;
      } else if (sessionName === 'Été' && currentMonth >= 8) {
        isPastSession = true;
      } else {
        isFutureSession = true;
      }
    }

    setTimeInfo({
      isCurrentSession,
      isFutureSession,
      isPastSession,
    });
  }, [year, sessionName]);

  const {
    drop,
    isOver,
    canDrop,
    isAvailableForDraggedCourse,
    isConfirmationOpen,
    confirmationMessage,
    confirmationTitle,
    handleConfirm,
    handleCancel,
  } = useSessionDrop({
    year,
    sessionName,
    timeInfo,
    addCourseToSession,
    moveCourseBetweenSessions,
  });

  // Determine if this is a future session with no availability data (beyond H26)
  // TODO: Use backend endpoint to fetch latest available session
  const isNoAvailabilityData
    = (year === 2026 && (sessionName === 'Été' || sessionName === 'Automne'))
      || year > 2026;

  const dropRef = useCallback(
    (node: HTMLDivElement | null) => {
      drop(node);
      // Ensure the function returns void to satisfy the LegacyRef type
      return undefined;
    },
    [drop],
  );

  const visibleCourses = isLoggedIn || !timeInfo.isPastSession ? courses : [];

  return (
    <div className="flex h-full flex-col">
      <SessionHeader
        sessionName={sessionName}
        totalCredits={totalCredits}
        year={year}
        isNoAvailabilityData={isNoAvailabilityData}
      />
      <div
        ref={dropRef}
        className={`flex min-h-24 flex-1 select-none flex-col overflow-auto rounded-md bg-sessions p-4 shadow-inner transition-all duration-200
          ${isOver && canDrop ? 'bg-dropTarget scale-[1.02] ring-2 ring-green-300' : ''}
          ${isAvailableForDraggedCourse ? 'bg-sessions/90 shadow-lg ring-1 ring-green-300' : ''}
          ${!isAvailableForDraggedCourse && isOver ? 'ring-2 ring-notOfferedCourseTag' : ''}
          ${timeInfo.isPastSession ? 'opacity-50' : ''}`}
        data-testid={`session-${sessionName}-${year}-drop-target`}
      >
        <CoursesList
          hasCourses={courses.length > 0}
          visibleCourses={visibleCourses}
          timeInfo={timeInfo}
          removeCourseFromSession={removeCourseFromSession}
          year={year}
          sessionName={sessionName}
          canDragCourses={!timeInfo.isPastSession}
        />
      </div>
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        title={confirmationTitle}
        message={confirmationMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Session;
