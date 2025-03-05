import type { CourseInstance } from '@/types/course';
import type { SessionName, SessionTiming } from '@/types/session';
import type { FC } from 'react';
import { useCourseStatus } from '@/hooks/course/useCourseStatus';
import { useCourseStore } from '@/store/courseStore';
import { useTranslations } from 'next-intl';
import CourseBox from './CourseBox';

type CoursesListProps = {
  hasCourses: boolean;
  courseInstances: CourseInstance[];
  sessionTiming: SessionTiming;
  onRemoveCourse: (courseId: number) => void;
  onMoveCourse: (toSessionYear: number, toSessionName: SessionName, courseId: number) => void; // FIXME: This might not be used?
  sessionYear: number;
  sessionName: SessionName;
  canDragCourses?: boolean;
};

const CoursesList: FC<CoursesListProps> = ({
  hasCourses,
  courseInstances,
  sessionTiming,
  onRemoveCourse,
  sessionYear,
  sessionName,
  canDragCourses = true,
}) => {
  const t = useTranslations('PlannerPage');

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
                  status={getCourseStatus(instance.courseId, sessionYear, sessionName, sessionTiming)}
                  isDraggable={canDragCourses}
                  credits={course.credits}
                  onDelete={() => onRemoveCourse(instance.courseId)}
                  fromSessionYear={sessionYear}
                  fromSessionName={sessionName}
                  course={course}
                />
              );
            })}
          </div>
        )
        : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            {sessionTiming.isPast
              ? t('no-course-modif-past-session')
              : t('drag-courses-to-add-course')}
          </div>
        )}
    </div>
  );
};

export default CoursesList;
