'use client';

import type { Course } from '@/types/course';
import type { DraggedItem } from '@/types/dnd';
import type { SessionEnum } from '@/types/session';
import type { DragSourceMonitor } from 'react-dnd';
import { DragType } from '@/types/dnd';
import { useDrag } from 'react-dnd';

type BaseProps = {
  course: Course;
  isDraggable?: boolean;
};

type CourseCardProps = BaseProps & {
  type: DragType.COURSE_CARD;
};

type CourseBoxProps = BaseProps & {
  type: DragType.COURSE_BOX;
  fromSessionYear: number;
  fromSessionTerm: SessionEnum;
};

type UseDraggableCourseProps = CourseCardProps | CourseBoxProps;

export function useDraggableCourse(props: UseDraggableCourseProps) {
  const { course, isDraggable = true } = props;

  const [{ isDragging }, dragRef] = useDrag<DraggedItem, void, { isDragging: boolean }>(
    () => ({
      type: props.type,
      item:
        props.type === DragType.COURSE_CARD
          ? {
            type: DragType.COURSE_CARD,
            course,
          }
          : {
            type: DragType.COURSE_BOX,
            courseId: course.id,
            course,
            fromSessionYear: props.fromSessionYear,
            fromSessionTerm: props.fromSessionTerm,
          },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: () => isDraggable,
    }),
    [props, course, isDraggable],
  );

  return {
    isDragging,
    dragRef,
  };
}
