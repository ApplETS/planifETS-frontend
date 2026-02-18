import type { Course } from './course';
import type { TermEnum } from './session';

export enum DragType {
  COURSE_CARD = 'COURSE_CARD',
  COURSE_BOX = 'COURSE_BOX',
}

export type DraggedCourseCard = {
  type: DragType.COURSE_CARD;
  course: Course;
};

export type DraggedCourseBox = {
  type: DragType.COURSE_BOX;
  courseId: number;
  course: Course;
  fromSessionYear: number;
  fromSessionTerm: TermEnum;
};

export type DraggedItem = DraggedCourseCard | DraggedCourseBox;
