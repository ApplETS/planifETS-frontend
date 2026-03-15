'use client';

import type { FC } from 'react';
import type { Course, CourseStatus } from '@/types/course';
import type { TermEnum } from '@/types/session';
import { useCallback } from 'react';
import { useDrag } from 'react-dnd';

import CourseHeader from '@/components/atoms/CourseHeader';

import StatusTag from '@/components/atoms/StatusTag';
import CourseActionsMenu from '@/components/Planner/CourseActionsMenu';
import { useProgramStore } from '@/store/programStore';
import { DragType } from '@/types/dnd';

type CourseBoxProps = {
  code: string;
  title: string;
  status: CourseStatus;
  credits: number;
  onDelete?: () => void;
  fromSessionYear: number;
  fromSessionTerm: TermEnum;
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
  const selectedProgramIds = useProgramStore((state) => state.getSelectedProgramIds());
  const preferredProgramId = selectedProgramIds[0] ?? null;

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
        relative cursor-grab active:cursor-grabbing rounded-lg
        bg-muted p-3
        hover:shadow-md text-foreground
        ${isDragging ? 'opacity-50 cursor-grabbing' : 'opacity-100'}
        ${isDragging && unknownAvailability ? 'border-2 border-blue-200' : ''}
      `}
      data-testid={`course-box-${code}`}
    >
      <div className="flex flex-col flex-wrap sm:flex-row mb-2">
        <div className="flex flex-col w-full">
          <CourseHeader
            code={code}
            title={title}
            credits={credits}
            dataTestid={`course-box-${code}-credits`}
            actions={(
              <CourseActionsMenu
                courseId={course.id}
                courseCode={code}
                preferredProgramId={preferredProgramId}
                fromSessionYear={fromSessionYear}
                fromSessionTerm={fromSessionTerm}
                onDeleteAction={onDelete}
              />
            )}
          />
        </div>
      </div>

      <StatusTag status={status} />
    </div>
  );
};

export default CourseBox;
