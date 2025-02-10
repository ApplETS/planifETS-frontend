'use client';

import type { DragSourceMonitor } from 'react-dnd';
import type { DragItem } from '../../types/drag';

import { useDrag } from 'react-dnd';

export function useDraggableCourse({
  course,
  type,
  fromYear,
  fromSession,
  isDraggable = true,
}: DragItem & { isDraggable?: boolean }) {
  const [{ isDragging }, dragRef] = useDrag<DragItem, void, { isDragging: boolean }>(
    () => ({
      type,
      item:
        type === 'COURSE'
          ? { type: 'COURSE', course }
          : {
            type: 'COURSE_BOX',
            course,
            fromYear,
            fromSession,
          },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: () => isDraggable,
    }),
    [course, type, fromYear, fromSession, isDraggable],
  );

  return {
    isDragging,
    dragRef,
  };
}
