'use client';

import type { DraggedItem } from '@/types/dnd';
import type { SessionEnum, SessionTiming } from '@/types/session';
import { useDrop } from 'react-dnd';
import { useSessionStore } from '@/store/sessionStore';
import { DragType } from '@/types/dnd';
import { generateSessionKey } from '@/utils/sessionUtils';
import { useSessionOperations } from './useSessionOperations';

type UseSessionDropProps = {
  sessionYear: number;
  sessionTerm: SessionEnum;
  sessionTiming: SessionTiming;
};

export const useSessionDrop = ({ sessionYear, sessionTerm, sessionTiming }: UseSessionDropProps) => {
  const { handleAddCourse, handleMoveCourse } = useSessionOperations(sessionYear, sessionTerm);
  const sessionStore = useSessionStore();
  const sessionKey = generateSessionKey(sessionYear, sessionTerm);

  const [{ isOver, canDrop, draggedItem }, drop] = useDrop(() => ({
    accept: [DragType.COURSE_CARD, DragType.COURSE_BOX],
    canDrop: (item: DraggedItem) => {
      if (!item) {
        return false;
      }

      const courseId = item.course.id;
      const sessionCourses = sessionStore.getSessionCourses(sessionKey);

      if (sessionCourses.some(c => c.courseId === courseId)) {
        return false;
      }

      if (item.type === DragType.COURSE_BOX) {
        return !(item.fromSessionYear === sessionYear && item.fromSessionTerm === sessionTerm);
      }

      return true;
    },
    drop: (item: DraggedItem) => {
      if (!item) {
        return;
      }

      if (item.type === DragType.COURSE_BOX) {
        const fromSessionKey = generateSessionKey(item.fromSessionYear, item.fromSessionTerm);
        const toSessionKey = generateSessionKey(sessionYear, sessionTerm);
        sessionStore.moveCourse(fromSessionKey, toSessionKey, item.course.id);
      } else {
        handleAddCourse(item.course.id);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggedItem: monitor.getItem(),
    }),
  }), [sessionYear, sessionTerm, sessionTiming, handleAddCourse, handleMoveCourse, sessionStore, sessionKey]);

  return { drop, isOver, canDrop, draggedItem };
};
