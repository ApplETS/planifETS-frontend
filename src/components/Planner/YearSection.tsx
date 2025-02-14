'use client';

import type { Course } from '../../context/planner/types/Course';
import type { SessionName, Session as SessionType } from '../../context/planner/types/Session';

import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import BaseButton from '../atoms/buttons/BaseButton';
import Session from './Session';

type YearSectionProps = {
  year: number;
  sessions: SessionType[];
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
  deleteYear: (year: number) => void;
  isLastYear: boolean;
};

export default function YearSection({
  year,
  sessions,
  addCourseToSession,
  moveCourseBetweenSessions,
  removeCourseFromSession,
  deleteYear,
  isLastYear,
}: YearSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {sessions.map(session => (
            <Session
              key={session.name}
              sessionName={session.name}
              courses={session.courses}
              totalCredits={session.totalCredits}
              year={year}
              addCourseToSession={addCourseToSession}
              moveCourseBetweenSessions={moveCourseBetweenSessions}
              removeCourseFromSession={removeCourseFromSession}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
