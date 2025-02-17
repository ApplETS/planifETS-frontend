import type { Course } from './course';

type DragItemType = 'COURSE_CARD' | 'COURSE_BOX';

export type DragItem = {
  course: Course;
  type: DragItemType;
  fromSessionYear?: number;
  fromSessionName?: string;
};
