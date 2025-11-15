import type { FC } from 'react';
import type { Course } from '@/types/course';
import type { DraggedCourseCard } from '@/types/dnd';
import { useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { DragType } from '@/types/dnd';

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
      className={`cursor-pointer rounded-lg bg-card text-card-foreground p-4 shadow-xs transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      data-testid={`course-card-${course.code}`}
    >
      <div className="font-medium text-foreground">{course.code}</div>
      <div className="text-sm text-muted-foreground">{course.title}</div>
      <div className="mt-1 text-sm text-muted-foreground">
        {course.credits}
        {' '}
        cr.
      </div>
    </div>
  );
};

export default CourseCard;
