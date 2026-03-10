/**
 * Course Store - (sort of cache, not persisted)
 *
 * What it stores (cleared on restart to always have up-to-date data):
 * - courses: Record<number, Course>
 *   - Contains: id, code, title, credits, prerequisites, availability
 */

import type { Course } from '@/types/course';
import { create } from 'zustand';
import { safeGetNumber } from '@/utils/safeAccess';

type CourseState = {
  courses: Record<number, Course>;
};

type CourseActions = {
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  removeCourse: (courseId: number) => void;
  getCourse: (courseId: number) => Course | undefined;
  getCoursesById: (courseIds: number[]) => Course[];
  clearCourses: () => void;
};

export const useCourseStore = create<CourseState & CourseActions>()((set, get) => ({
  courses: {},

  getCourse: (courseId) => safeGetNumber(get().courses, courseId),

  getCoursesById: (courseIds) => {
    const courses = get().courses;
    return courseIds
      .map((id) => safeGetNumber(courses, id))
      .filter((course): course is Course => !!course);
  },

  addCourse: (course) => {
    if (!course.id) {
      return;
    }
    set((state) => ({
      courses: {
        ...state.courses,
        [course.id]: course,
      },
    }));
  },

  setCourses: (courses) => {
    set((state) => {
      // Merge new courses with existing cache (don't replace)
      const coursesRecord = courses.reduce<Record<number, Course>>((acc, course) => {
        if (course.id) {
          acc[course.id] = course;
        }
        return acc;
      }, { ...state.courses });
      return { courses: coursesRecord };
    });
  },

  removeCourse: (courseId) => {
    set((state) => {
      const { [courseId]: _, ...rest } = state.courses;
      return { courses: rest };
    });
  },

  clearCourses: () => {
    set({ courses: {} });
  },
}));
