import type { DraggedItem } from '@/types/dnd';
import type { SessionName } from '@/types/session';
import { DND_TYPES } from '@/types/dnd';
import { useDrop } from 'react-dnd';
import { useSessionOperations } from '../session/useSessionOperations';

type UseSessionDropProps = {
  year: number;
  sessionName: SessionName;
  timeInfo: {
    isPastSession: boolean;
    isCurrentSession: boolean;
    isFutureSession: boolean;
  };
};

/**
 * Hook for managing drag and drop functionality of courses into sessions
 * @param {UseSessionDropProps} props - Props containing session information and handlers
 * @param {number} props.year - The academic year
 * @param {SessionName} props.sessionName - Name of the session (e.g., 'Automne', 'Hiver', 'Été')
 * @param {object} props.timeInfo - Information about the session's timing
 * @param {boolean} props.timeInfo.isPastSession - Whether the session is in the past
 * @returns {object} Drop target props and confirmation dialog state
 */
export const useSessionDrop = ({ year, sessionName, timeInfo }: UseSessionDropProps) => {
  const { handleAddCourse, handleMoveCourse } = useSessionOperations(year, sessionName);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [DND_TYPES.COURSE, DND_TYPES.COURSE_BOX],
    canDrop: (item: DraggedItem) => {
      if (!item || timeInfo.isPastSession) {
        return false;
      }

      // For course box (moving between sessions), always allow
      if (item.type === DND_TYPES.COURSE_BOX) {
        return true;
      }

      // For new courses, always allow for now
      return true;
    },
    drop: (item: DraggedItem) => {
      if (!item) {
        return;
      }

      // eslint-disable-next-line no-console
      console.log('Dropping item:', item);

      if (item.type === DND_TYPES.COURSE_BOX && item.fromYear && item.fromSession) {
        handleMoveCourse(item.fromYear, item.fromSession, item.courseId);
      } else if (item.type === DND_TYPES.COURSE) {
        // eslint-disable-next-line no-console
        console.log('Adding course:', item.courseId);
        const courseId = item.courseId || item.course.id;
        handleAddCourse(courseId);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [year, sessionName, timeInfo, handleAddCourse, handleMoveCourse]);

  return { drop, isOver, canDrop };
};
