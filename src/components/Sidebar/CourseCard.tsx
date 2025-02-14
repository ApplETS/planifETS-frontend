'use client';

import type { FC } from 'react';
import type { Course } from '../../context/planner/types/Course';

import FavoriteButton from '@/components/Sidebar/FavoriteButton';
import { useState } from 'react';
import { useDraggableCourse } from '../../hooks/course/useDraggableCourse';
import CreditsBadge from '../atoms/CreditsBadge';
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
  onToggleFavorite: () => void;
};

const CourseCard: FC<CourseCardProps> = ({ course, onToggleFavorite }) => {
  const { isDragging, dragRef } = useDraggableCourse({
    course,
    type: 'COURSE',
  });

  const [isHovered, setIsHovered] = useState(false);

  const renderPrerequisites = () => {
    if (course.prerequisites.length === 0) {
      return null;
    }

    return (
      <Section title="Prérequis:">
        {course.prerequisites.map(preq => (
          <Tag key={preq}>{preq}</Tag>
        ))}
      </Section>
    );
  };

  const renderAvailability = () => (
    <Section title="Disponible:">
      {course.availability.map(session => (
        <Tag key={session}>{session}</Tag>
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
      className={`relative w-full cursor-grab rounded-md bg-sessions p-4 text-textDarkBackground shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      data-testid={`course-card-${course.code}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: 'visible' }}
    >
      <FavoriteButton
        isFavorited={course.isFavorited ?? false}
        onToggleFavorite={onToggleFavorite}
        isHovered={isHovered}
      />

      <h3 className="flex items-center justify-between text-lg">
        <span>{course.code}</span>
        <CreditsBadge credits={course.credits} />
      </h3>
      <p className="mt-1 text-sm">{course.title}</p>

      {renderPrerequisites()}
      {renderAvailability()}
    </div>
  );
};

export default CourseCard;
