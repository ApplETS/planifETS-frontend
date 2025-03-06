'use client';

import type { DraggedItem } from '@/types/dnd';
import type { SessionName, SessionTiming } from '@/types/session';
import { useSessionStore } from '@/store/sessionStore';
import { DragType } from '@/types/dnd';
import { generateSessionKey } from '@/utils/sessionUtils';
import { useDrop } from 'react-dnd';
import { useSessionOperations } from './useSessionOperations';

type UseSessionDropProps = {
  sessionYear: number;
  sessionName: SessionName;
  sessionTiming: SessionTiming;
};

export const useSessionDrop = ({ sessionYear, sessionName, sessionTiming }: UseSessionDropProps) => {
  const { handleAddCourse, handleMoveCourse } = useSessionOperations(sessionYear, sessionName);
  const sessionStore = useSessionStore();
  const sessionKey = generateSessionKey(sessionYear, sessionName);

  const [{ isOver, canDrop, draggedItem }, drop] = useDrop(() => ({
    accept: [DragType.COURSE_CARD, DragType.COURSE_BOX],
    canDrop: (item: DraggedItem) => {
      if (!item || sessionTiming.isPast) {
        return false;
      }

      const courseId = item.course.id;
      const sessionCourses = sessionStore.getSessionCourses(sessionKey);

      if (sessionCourses.some(c => c.courseId === courseId)) {
        return false;
      }

      if (item.type === DragType.COURSE_BOX) {
        return !(item.fromSessionYear === sessionYear && item.fromSessionName === sessionName);
      }

      return true;
    },
    drop: (item: DraggedItem) => {
      if (!item) {
        return;
      }

      if (item.type === DragType.COURSE_BOX) {
        const fromSessionKey = generateSessionKey(item.fromSessionYear, item.fromSessionName);
        const toSessionKey = generateSessionKey(sessionYear, sessionName);
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
  }), [sessionYear, sessionName, sessionTiming, handleAddCourse, handleMoveCourse, sessionStore, sessionKey]);

  return { drop, isOver, canDrop, draggedItem };
};
