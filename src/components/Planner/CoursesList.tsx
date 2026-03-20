import type { FC } from 'react';
import type { CourseInstance } from '@/types/course';
import type { SessionTiming, TermEnum } from '@/types/session';
import { useTranslations } from 'next-intl';
import { useCourseStatus } from '@/hooks/course/useCourseStatus';
import { useCourseStore } from '@/store/courseStore';
import { safeGetNumber } from '@/utils/safeAccess';
import { generateSessionKey } from '@/utils/sessionUtils';
import CourseCardSkeleton from '../skeletons/CourseCardSkeleton';
import CourseBox from './CourseBox';

type CoursesListProps = {
  hasCourses: boolean;
  courseInstances: CourseInstance[];
  sessionTiming: SessionTiming;
  onRemoveCourse: (courseId: number) => void;
  sessionYear: number;
  sessionTerm: TermEnum;
  duplicateCourseSessionIndex: ReadonlyMap<number, string[]>;
  canDragCourses?: boolean;
};

const EMPTY_DUPLICATE_SESSIONS: string[] = [];

const CoursesList: FC<CoursesListProps> = ({
  hasCourses,
  courseInstances,
  sessionTiming,
  onRemoveCourse,
  sessionYear,
  sessionTerm,
  duplicateCourseSessionIndex,
  canDragCourses = true,
}) => {
  const t = useTranslations('PlannerPage');

  const { getCourseStatus } = useCourseStatus();
  const courses = useCourseStore((state) => state.courses);
  const currentSessionKey = generateSessionKey(sessionYear, sessionTerm);

  return (
    <div className="flex-1 overflow-y-auto">
      {hasCourses
        ? (
          <div className="space-y-2">
            {courseInstances.map((instance) => {
              const course = safeGetNumber(courses, instance.courseId);
              const duplicateSessionKeys = duplicateCourseSessionIndex.get(instance.courseId)
                ?? EMPTY_DUPLICATE_SESSIONS;
              const otherDuplicateSessionKeys = duplicateSessionKeys.filter(
                (sessionKey) => sessionKey !== currentSessionKey,
              );
              if (!course) {
                return <CourseCardSkeleton key={instance.courseId} />;
              }

              return (
                <CourseBox
                  key={`${sessionTerm}-${sessionYear}-${instance.courseId}`}
                  code={course.code}
                  title={course.title}
                  status={
                    otherDuplicateSessionKeys.length > 0
                      ? 'Duplicate'
                      : getCourseStatus(instance.courseId, sessionYear, sessionTerm, sessionTiming)
                  }
                  duplicateSessionKeys={
                    otherDuplicateSessionKeys.length > 0
                      ? otherDuplicateSessionKeys
                      : undefined
                  }
                  isDraggable={canDragCourses}
                  credits={course.credits}
                  onDeleteAction={() => onRemoveCourse(instance.courseId)}
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
