import type { FC } from 'react';
import type { CourseInstance } from '@/types/course';
import type { SessionEnum, SessionTiming } from '@/types/session';
import { useTranslations } from 'next-intl';
import { useCourseStatus } from '@/hooks/course/useCourseStatus';
import { useCourseStore } from '@/store/courseStore';
import { safeGetNumber } from '@/utils/safeAccess';
import CourseCardSkeleton from '../skeletons/CourseCardSkeleton';
import CourseBox from './CourseBox';

type CoursesListProps = {
  hasCourses: boolean;
  courseInstances: CourseInstance[];
  sessionTiming: SessionTiming;
  onRemoveCourse: (courseId: number) => void;
  sessionYear: number;
  sessionTerm: SessionEnum;
  canDragCourses?: boolean;
};

const CoursesList: FC<CoursesListProps> = ({
  hasCourses,
  courseInstances,
  sessionTiming,
  onRemoveCourse,
  sessionYear,
  sessionTerm,
  canDragCourses = true,
}) => {
  const t = useTranslations('PlannerPage');

  const { getCourseStatus } = useCourseStatus();
  const courses = useCourseStore((state) => state.courses);

  return (
    <div className="flex-1 overflow-y-auto">
      {hasCourses
        ? (
          <div className="space-y-2">
            {courseInstances.map((instance) => {
              const course = safeGetNumber(courses, instance.courseId);
              if (!course) {
                return <CourseCardSkeleton key={instance.courseId} />;
              }

              return (
                <CourseBox
                  key={`${sessionTerm}-${sessionYear}-${instance.courseId}`}
                  code={course.code}
                  status={getCourseStatus(instance.courseId, sessionYear, sessionTerm, sessionTiming)}
                  isDraggable={canDragCourses}
                  credits={course.credits}
                  onDelete={() => onRemoveCourse(instance.courseId)}
                  fromSessionYear={sessionYear}
                  fromSessionTerm={sessionTerm}
                  course={course}
                />
              );
            })}
          </div>
        )
        : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            {t('drag-courses-to-add-course')}
          </div>
        )}
    </div>
  );
};

export default CoursesList;
