import type { Course } from '@/types/course';
import type { DraggedCourseCard } from '@/types/dnd';
import type { FC } from 'react';
import { DragType } from '@/types/dnd';
import { useCallback } from 'react';
import { useDrag } from 'react-dnd';

type CourseCardProps = {
  course: Course;
};

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragType.COURSE_CARD,
    item: {
      type: DragType.COURSE_CARD,
      course,
    } as DraggedCourseCard,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }), [course]);

  const dragRef = useCallback((node: HTMLDivElement | null) => {
    drag(node);
  }, [drag]);

  return (
    <div
      ref={dragRef}
      className={`cursor-pointer rounded-lg bg-white p-4 shadow-xs transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      data-testid={`course-card-${course.code}`}
    >
      <div className="font-medium">{course.code}</div>
      <div className="text-sm text-gray-600">{course.title}</div>
      <div className="mt-1 text-sm text-gray-500">
        {course.credits}
        {' '}
        cr.
      </div>
    </div>
  );
};

export default CourseCard;
