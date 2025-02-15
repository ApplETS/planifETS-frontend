import type { Course } from '@/types/course';
import type { FC } from 'react';
import type { SessionName } from '../../context/planner/types/Session';

import type { CourseStatus } from '../../types/courseStatus';
import React from 'react';
import CourseBox from './CourseBox';

type CoursesListProps = {
  hasCourses: boolean;
  visibleCourses: Course[];
  timeInfo: {
    isCurrentSession: boolean;
    isFutureSession: boolean;
    isPastSession: boolean;
  };
  removeCourseFromSession: (
    year: number,
    sessionName: SessionName,
    courseCode: string
  ) => void;
  year: number;
  sessionName: SessionName;
  canDragCourses?: boolean;
};

const getCourseStatus = (
  courseStatus: string | undefined,
  timeInfo: {
    isCurrentSession: boolean;
    isPastSession: boolean;
  },
): CourseStatus => {
  if (timeInfo.isCurrentSession) {
    return 'In Progress';
  }

  if (timeInfo.isPastSession) {
    return courseStatus === 'Failed' ? 'Failed' : 'Completed';
  }

  return (courseStatus as CourseStatus) || 'Planned';
};

const CoursesList: FC<CoursesListProps> = ({
  hasCourses,
  visibleCourses,
  timeInfo,
  removeCourseFromSession,
  year,
  sessionName,
  canDragCourses = true,
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {hasCourses
        ? (
          <div className="space-y-2">
            {visibleCourses.map(course => (
              <CourseBox
                key={course.code}
                code={course.code}
                status={getCourseStatus(course.status, timeInfo)}
                isDraggable={canDragCourses}
                credits={course.credits}
                onDelete={timeInfo.isPastSession ? undefined : () => removeCourseFromSession(year, sessionName, course.code)}
                fromYear={year}
                fromSession={sessionName}
                course={course}
              />
            ))}
          </div>
        )
        : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            {timeInfo.isPastSession
              ? 'Aucune modification autorisée pour cette session passée.'
              : 'Glissez les cours ici pour les ajouter à cette session.'}
          </div>
        )}
    </div>
  );
};

export default CoursesList;
