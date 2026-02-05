'use client';

import type { FC } from 'react';
import type { Course } from '@/types/course';
import type { SessionEnum } from '@/types/session';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import CourseHeader from '@/components/atoms/CourseHeader';
import FavoriteButton from '@/components/atoms/FavoriteButton';
import Tag from '@/components/atoms/Tag';
import { useCourseOperations } from '@/hooks/course/useCourseOperations';
import { useDraggableCourse } from '@/hooks/course/useDraggableCourse';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shadcn/ui/tooltip';
import { usePlannerStore } from '@/store/plannerStore';
import { useSessionStore } from '@/store/sessionStore';

import { DragType } from '@/types/dnd';
import { filterCurrentAndFutureSessions, formatSessionShort, generateSessionKey, sortSessionsChronologically } from '@/utils/sessionUtils';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section: FC<SectionProps> = ({ title, children }) => (
  <div className="mt-2">
    <p className="text-sm font-semibold text-foreground">{title}</p>
    <div className="mt-1 flex flex-wrap gap-2">{children}</div>
  </div>
);

type CourseCardProps = {
  course: Course;
};

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const { toggleFavorite, isFavorite } = usePlannerStore();
  const { dragRef, isDragging } = useDraggableCourse({
    course,
    type: DragType.COURSE_CARD,
  });
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations('PlannerPage');

  const renderPrerequisites = () => {
    if (course.prerequisites.length === 0) {
      return null;
    }

    return (
      <Section title={t('prerequisites')}>
        {course.prerequisites.map((preq) => (
          <Tag key={preq} variant="primary">
            {preq}
          </Tag>
        ))}
      </Section>
    );
  };

  const { addCourseToSession, removeCourseFromSession } = useCourseOperations();
  const sessionStore = useSessionStore();
  const renderAvailability = () => {
    const filteredSessions = filterCurrentAndFutureSessions(course.availability);
    if (!filteredSessions || filteredSessions.length === 0) {
      return null;
    }

    return (
      <Section title={t('available')}>
        {sortSessionsChronologically(filteredSessions).map((session: string) => {
          const sessionTerm = session.charAt(0) as SessionEnum;
          const sessionYear = Number(session.substring(1));
          const sessionKey = generateSessionKey(sessionYear, sessionTerm);
          const sessionObj = sessionStore.getSessionByKey?.(sessionKey);
          const alreadyAdded = sessionObj && sessionObj.courseInstances.some((ci) => ci.courseId === course.id);

          return (
            <Tooltip key={session}>
              <TooltipTrigger asChild>
                <Tag
                  variant={alreadyAdded ? 'success' : 'sessionAvailable'}
                  onClick={() => {
                    if (!sessionObj) {
                      toast.error(t('session-not-created', { session: formatSessionShort(session) }));
                      return;
                    }

                    if (alreadyAdded) {
                      removeCourseFromSession(sessionYear, sessionTerm, course.id);
                      toast.success(t('course-removed-from-session', { session: formatSessionShort(session) }));
                      return;
                    }

                    addCourseToSession(sessionYear, sessionTerm, course);
                    toast.success(t('course-added-to-session', { session: formatSessionShort(session) }));
                  }}
                >
                  {formatSessionShort(session)}
                </Tag>
              </TooltipTrigger>
              <TooltipContent sideOffset={4}>
                {alreadyAdded ? t('remove-from-session-tooltip', { session: formatSessionShort(session) }) : t('add-to-session-tooltip', { session: formatSessionShort(session) })}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </Section>
    );
  };

  return (
    <div
      ref={(node) => {
        if (node) {
          dragRef(node);
        }
      }}
      className={`relative w-full cursor-grab rounded-md bg-background p-4 shadow-md
        ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      data-testid={`course-card-${course.code}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FavoriteButton
        isFavorited={isFavorite(course.id)}
        onToggle={() => toggleFavorite(course.id)}
        isHovered={isHovered}
      />
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <CourseHeader
            code={course.code}
            title={course.title}
            credits={course.credits}
            dataTestid={`course-card-${course.code}-credits`}
          />
        </div>
      </div>

      {renderPrerequisites()}
      {renderAvailability()}
    </div>
  );
};

export default CourseCard;
