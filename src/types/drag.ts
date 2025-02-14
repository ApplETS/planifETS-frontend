import type { Course } from './planner';

type DragItemType = 'COURSE' | 'COURSE_BOX';

export type DragItem = {
  course: Course;
  type: DragItemType;
  fromYear?: number;
  fromSession?: string;
};
