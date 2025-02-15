import type { Course } from './course';

type DragItemType = 'COURSE' | 'COURSE_BOX';

export type DragItem = {
  course: Course;
  type: DragItemType;
  fromYear?: number;
  fromSession?: string;
};
