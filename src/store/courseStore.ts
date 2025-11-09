import type { Course } from '@/types/course';
import { create } from 'zustand';

import { persistConfig } from '@/lib/persistConfig';

type CourseState = {
  courses: Record<number, Course>;
  favoriteCourses: number[];
};

type CourseActions = {
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  removeCourse: (courseId: number) => void;
  toggleFavorite: (courseId: number) => void;
  getCourse: (courseId: number) => Course | undefined;
  getCoursesById: (courseIds: number[]) => Course[];
  getFavoriteCourses: () => Course[];
  isFavorite: (courseId: number) => boolean;
};

export const useCourseStore = create<CourseState & CourseActions>()(
  persistConfig('course-store', (set, get) => ({
    courses: {},
    favoriteCourses: [],

    getCourse: courseId => get().courses[courseId],

    getCoursesById: (courseIds) => {
      const courses = get().courses;
      return courseIds
        .map(id => courses[id])
        .filter((course): course is Course => !!course);
    },

    addCourse: (course) => {
      if (!course.id) {
        return;
      }
      set(state => ({
        courses: {
          ...state.courses,
          [course.id]: course,
        },
      }));
    },

    setCourses: (courses) => {
      set((state) => {
        const coursesRecord = courses.reduce<Record<number, Course>>((acc, course) => {
          if (course.id) {
            acc[course.id] = course;
          }
          return acc;
        }, { ...state.courses });
        return { courses: coursesRecord };
      });
    },

    getFavoriteCourses: () => {
      const courses = get().courses;
      return get().favoriteCourses.map(id => courses[id]).filter((course): course is Course => !!course);
    },

    isFavorite: courseId => get().favoriteCourses.includes(courseId),

    toggleFavorite: (courseId) => {
      set((state) => {
        const favorites = [...state.favoriteCourses];
        const index = favorites.indexOf(courseId);

        if (index !== -1) {
          favorites.splice(index, 1);
        } else {
          favorites.push(courseId);
        }

        return { favoriteCourses: favorites };
      });
    },

    removeCourse: (courseId) => {
      set((state) => {
        const { [courseId]: _, ...rest } = state.courses;
        return { courses: rest };
      });
    },
  })),
);
