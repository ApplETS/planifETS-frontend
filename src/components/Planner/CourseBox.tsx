'use client';

import type { FC } from 'react';
import type { CourseStatus } from '../../types/courseStatus';
import type { Course } from '@/types/course';
import type { SessionEnum } from '@/types/session';
import { useTranslations } from 'next-intl';

import { useCallback, useState } from 'react';
import { useDrag } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';
import { DragType } from '@/types/dnd';
import BaseButton from '../atoms/buttons/BaseButton';
import CourseHeader from '../atoms/CourseHeader';
import StatusTag from './StatusTag';

type CourseBoxProps = {
  code: string;
  status: CourseStatus;
  credits: number;
  onDelete?: () => void;
  fromSessionYear: number;
  fromSessionTerm: SessionEnum;
  course: Course;
  isDraggable?: boolean;
};

const CourseBox: FC<CourseBoxProps> = ({
  code,
  status,
  credits,
  onDelete,
  fromSessionYear,
  fromSessionTerm,
  course,
  isDraggable = true,
}) => {
  const t = useTranslations('PlannerPage');

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragType.COURSE_BOX,
    item: {
      type: DragType.COURSE_BOX,
      courseId: course.id,
      course,
      fromSessionYear,
      fromSessionTerm,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isDraggable,
  }), [course, fromSessionYear, fromSessionTerm, isDraggable]);

  const [isHovered, setIsHovered] = useState(false);

  const dragRef = useCallback((node: HTMLDivElement | null) => {
    drag(node);
  }, [drag]);

  return (
    <div
      ref={dragRef}
      className={`
        shadow-xs
        relative mb-2 cursor-pointer rounded-lg
        bg-muted p-4 transition duration-300
        ease-in-out hover:-translate-y-0.5
        hover:shadow-md text-foreground
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`course-box-${code}`}
    >
      {isHovered && onDelete && (
        <BaseButton
          variant="danger"
          size="sm"
          className="absolute right-2 top-2"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label={t('delete-course')}
          data-testid={`delete-course-${code}-${fromSessionTerm}-${fromSessionYear}`}
        >
          <FaTrash />
        </BaseButton>
      )}
      <div className="flex flex-col flex-wrap sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <CourseHeader code={code} />
        </div>
        <div className="mt-2 flex flex-wrap sm:mt-0 sm:flex-nowrap sm:items-center">
          <StatusTag status={status} />
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {credits}
        {' '}
        {t('credits-short')}
      </div>
    </div>
  );
};

export default CourseBox;
