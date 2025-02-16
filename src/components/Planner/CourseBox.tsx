'use client';

import type { Course } from '@/types/course';
import type { DraggedCourseBox } from '@/types/dnd';
import type { SessionName } from '@/types/session';
import type { FC } from 'react';
import type { CourseStatus } from '../../types/courseStatus';
import { DND_TYPES } from '@/types/dnd';

import { useCallback, useState } from 'react';
import { useDrag } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';
import BaseButton from '../atoms/buttons/BaseButton';
import CourseHeader from '../atoms/CourseHeader';
import StatusTag from './StatusTag';

type CourseBoxProps = {
  code: string;
  status: CourseStatus;
  credits: number;
  onDelete?: () => void;
  fromYear: number;
  fromSession: SessionName;
  course: Course;
  isDraggable?: boolean;
};

const CourseBox: FC<CourseBoxProps> = ({
  code,
  status,
  credits,
  onDelete,
  fromYear,
  fromSession,
  course,
  isDraggable = true,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_TYPES.COURSE_BOX,
    item: {
      type: DND_TYPES.COURSE_BOX,
      courseId: course.id,
      course,
      fromYear,
      fromSession,
    } as DraggedCourseBox,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isDraggable,
  }), [course, fromYear, fromSession, isDraggable]);

  const [isHovered, setIsHovered] = useState(false);

  const dragRef = useCallback((node: HTMLDivElement | null) => {
    drag(node);
  }, [drag]);

  return (
    <div
      ref={dragRef}
      className={`
        relative
        mb-2 cursor-pointer rounded-lg bg-sessionCourse
        p-4 shadow-sm transition duration-300 
        ease-in-out hover:-translate-y-0.5 
        hover:shadow-md
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
          aria-label="Supprimer le cours"
          data-testid={`delete-course-${code}-${fromSession}-${fromYear}`}
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
      <div className="text-sm text-gray-500">
        {credits}
        {' '}
        cr.
      </div>
    </div>
  );
};

export default CourseBox;
