'use client';

import type { Course } from '@/types/course';
import type { FC } from 'react';
import FavoriteButton from '@/components/Sidebar/FavoriteButton';
import { useDraggableCourse } from '@/hooks/course/useDraggableCourse';
import { useCourseStore } from '@/store/courseStore';
import { DragType } from '@/types/dnd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CreditsTag from '../atoms/CreditsTag';
import Tag from '../atoms/Tag';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section: FC<SectionProps> = ({ title, children }) => (
  <div className="mt-2">
    <p className="text-sm font-semibold">{title}</p>
    <div className="mt-1 flex flex-wrap gap-2">{children}</div>
  </div>
);

type CourseCardProps = {
  course: Course;
};

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const { toggleFavorite, isFavorite } = useCourseStore();
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
        {course.prerequisites.map(preq => (
          <Tag key={preq} text={preq} />
        ))}
      </Section>
    );
  };

  const renderAvailability = () => (
    <Section title={t('available')}>
      {course.availability.map(session => (
        <Tag key={session} text={session} />
      ))}
    </Section>
  );

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
          <h3 className="text-lg font-semibold">{course.code}</h3>
          <p className="text-sm">{course.title}</p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <CreditsTag credits={course.credits} dataTestId={`course-card-${course.code}-credits`} />
        </div>
      </div>

      {renderPrerequisites()}
      {renderAvailability()}
    </div>
  );
};

export default CourseCard;
