import type { CourseInstance } from '@/types/course';
import type { SessionName } from '@/types/session';
import type { FC } from 'react';
import { useCourseStatus } from '@/hooks/course/useCourseStatus';
import { useCourseStore } from '@/store/courseStore';
import CourseBox from './CourseBox';

type CoursesListProps = {
  hasCourses: boolean;
  courseInstances: CourseInstance[];
  timeInfo: {
    isCurrentSession: boolean;
    isFutureSession: boolean;
    isPastSession: boolean;
  };
  onRemoveCourse: (courseId: number) => void;
  onMoveCourse: (toYear: number, toSession: SessionName, courseId: number) => void;
  year: number;
  sessionName: SessionName;
  canDragCourses?: boolean;
};

const CoursesList: FC<CoursesListProps> = ({
  hasCourses,
  courseInstances,
  timeInfo,
  onRemoveCourse,
  year,
  sessionName,
  canDragCourses = true,
}) => {
  const { getCourseStatus } = useCourseStatus();
  const { getCourse } = useCourseStore();

  return (
    <div className="flex-1 overflow-y-auto">
      {hasCourses
        ? (
          <div className="space-y-2">
            {courseInstances.map((instance) => {
              const course = getCourse(instance.courseId);
              if (!course) {
                return null;
              }

              return (
                <CourseBox
                  key={course.code}
                  code={course.code}
                  status={getCourseStatus(instance.courseId, year, sessionName, timeInfo)}
                  isDraggable={canDragCourses}
                  credits={course.credits}
                  onDelete={() => onRemoveCourse(instance.courseId)}
                  fromYear={year}
                  fromSession={sessionName}
                  course={course}
                />
              );
            })}
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
