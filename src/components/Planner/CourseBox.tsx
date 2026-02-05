'use client';

import type { FC } from 'react';
import type { Course } from '@/types/course';
import type { CourseStatus } from '@/types/courseStatus';
import type { SessionEnum } from '@/types/session';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useDrag } from 'react-dnd';

import CourseHeader from '@/components/atoms/CourseHeader';
import StatusTag from '@/components/atoms/StatusTag';
import { Button } from '@/shadcn/ui/button';
import { DragType } from '@/types/dnd';

type CourseBoxProps = {
  code: string;
  title: string;
  status: CourseStatus;
  credits: number;
  onDelete?: () => void;
  fromSessionYear: number;
  fromSessionTerm: SessionEnum;
  course: Course;
  isDraggable?: boolean;
  unknownAvailability?: boolean;
};

const CourseBox: FC<CourseBoxProps> = ({
  code,
  title,
  status,
  credits,
  onDelete,
  fromSessionYear,
  fromSessionTerm,
  course,
  isDraggable = true,
  unknownAvailability = false,
}) => {
  const t = useTranslations('PlannerPage');

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragType.COURSE_BOX,
      item: {
        type: DragType.COURSE_BOX,
        courseId: course.id,
        course,
        fromSessionYear,
        fromSessionTerm,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: () => isDraggable,
    }),
    [course, fromSessionYear, fromSessionTerm, isDraggable],
  );

  const [isHovered, setIsHovered] = useState(false);

  const dragRef = useCallback(
    (node: HTMLDivElement | null) => {
      drag(node);
    },
    [drag],
  );

  return (
    <div
      ref={dragRef}
      className={`
        shadow-xs
        relative mb-2 cursor-pointer rounded-lg
        bg-muted p-4
        hover:shadow-md text-foreground
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${isDragging && unknownAvailability ? 'border-2 border-blue-200' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`course-box-${code}`}
    >
      {isHovered && onDelete && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute right-2 top-2"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label={t('delete-course')}
          data-testid={`delete-course-${code}-${fromSessionTerm}-${fromSessionYear}`}
        >
          <Trash className="size-3" />
        </Button>
      )}
      <div className="flex flex-col flex-wrap sm:flex-row">
        <div className="flex flex-col">
          <CourseHeader
            code={code}
            title={title}
            credits={credits}
            dataTestid={`course-box-${code}-credits`}
          />
        </div>
        <div className="mt-2 flex flex-wrap sm:mt-0 sm:flex-nowrap sm:items-center">
        </div>
      </div>
      <div className="text-sm text-muted-foreground">

        <StatusTag status={status} />
      </div>
    </div>
  );
};

export default CourseBox;
