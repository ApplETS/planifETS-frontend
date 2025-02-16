import type { Course } from './course';
import type { SessionName } from './session';

export const DND_TYPES = {
  COURSE: 'COURSE',
  COURSE_BOX: 'COURSE_BOX',
} as const;

export type DraggedCourse = {
  type: typeof DND_TYPES.COURSE;
  courseId: number;
  course: Course;
};

export type DraggedCourseBox = {
  type: typeof DND_TYPES.COURSE_BOX;
  courseId: number;
  course: Course;
  fromYear?: number;
  fromSession?: SessionName;
};

export type DraggedItem = DraggedCourse | DraggedCourseBox;
