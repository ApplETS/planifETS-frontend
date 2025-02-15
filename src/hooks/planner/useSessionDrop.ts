import type { Course } from '@/types/course';

import type { SessionName } from '../../context/planner/types/Session';

import { useCallback } from 'react';
import { useDragLayer, useDrop } from 'react-dnd';
import { isCourseAvailable } from '../../context/planner/utils/sessionUtils';
import { useConfirmationDialog } from '../common/confirmationDialog/useConfirmationDialog';

type DropItem = {
  type: string;
  course: Course;
  fromYear?: number;
  fromSession?: SessionName;
};

type UseSessionDropProps = {
  year: number;
  sessionName: SessionName;
  timeInfo: {
    isPastSession: boolean;
  };
  addCourseToSession: (year: number, sessionName: SessionName, course: Course) => void;
  moveCourseBetweenSessions: (
    fromYear: number,
    fromSession: SessionName,
    toYear: number,
    toSession: SessionName,
    course: Course
  ) => void;
};

/**
 * Hook for managing drag and drop functionality of courses into sessions
 * @param {UseSessionDropProps} props - Props containing session information and handlers
 * @param {number} props.year - The academic year
 * @param {SessionName} props.sessionName - Name of the session (e.g., 'Automne', 'Hiver', 'Été')
 * @param {object} props.timeInfo - Information about the session's timing
 * @param {boolean} props.timeInfo.isPastSession - Whether the session is in the past
 * @param {Function} props.addCourseToSession - Handler to add a course to a session
 * @param {Function} props.moveCourseBetweenSessions - Handler to move a course between sessions
 * @returns {object} Drop target props and confirmation dialog state
 */
export const useSessionDrop = ({
  year,
  sessionName,
  timeInfo,
  addCourseToSession,
  moveCourseBetweenSessions,
}: UseSessionDropProps) => {
  const { isDragging, item } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
  }));

  const {
    isConfirmationDialogOpen: isConfirmationOpen,
    confirmationDialogMessage: confirmationMessage,
    confirmationDialogTitle: confirmationTitle,
    handleConfirm,
    handleCancel,
    showConfirmation,
  } = useConfirmationDialog();

  const isAvailableForDraggedCourse
    = isDragging && item?.course && isCourseAvailable(item.course, sessionName, year);

  const handleCourseMove = useCallback((dropItem: DropItem) => {
    // Use setTimeout to defer the state update until after the render cycle
    setTimeout(() => {
      if (dropItem.fromYear !== undefined && dropItem.fromSession !== undefined) {
        moveCourseBetweenSessions(
          dropItem.fromYear,
          dropItem.fromSession,
          year,
          sessionName,
          dropItem.course,
        );
      } else {
        addCourseToSession(year, sessionName, dropItem.course);
      }
    }, 0);
  }, [addCourseToSession, moveCourseBetweenSessions, year, sessionName]);

  const [{ isOver, canDrop }, drop] = useDrop<DropItem, void, { isOver: boolean; canDrop: boolean }>({
    accept: ['COURSE', 'COURSE_BOX'],
    canDrop: (dropItem) => {
      if (timeInfo.isPastSession) {
        return false;
      }
      if (!dropItem.course) {
        return false;
      }

      // Allow dropping even if course is not available
      return true;
    },
    drop: (dropItem) => {
      if (timeInfo.isPastSession) {
        return;
      }
      if (!dropItem.course) {
        return;
      }

      const isAvailable = isCourseAvailable(dropItem.course, sessionName, year);
      if (!isAvailable) {
        showConfirmation({
          title: 'Cours non disponible',
          message: `Le cours ${dropItem.course.code} n'est pas disponible pour la session ${sessionName} ${year}. \n\nVoulez-vous quand même l'ajouter?`,
          onConfirm: () => handleCourseMove(dropItem),
        });
        return;
      }

      handleCourseMove(dropItem);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return {
    drop,
    isOver,
    canDrop,
    isAvailableForDraggedCourse,
    isConfirmationOpen,
    confirmationMessage,
    confirmationTitle,
    handleConfirm,
    handleCancel,
  };
};
