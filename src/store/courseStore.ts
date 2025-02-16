import type { Course } from '@/types/course';
import { persistConfig } from 'lib/persistConfig';
import { create } from 'zustand';

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
  getAllCourses: () => Course[];
  getFavoriteCourses: () => Course[];
  isFavorite: (courseId: number) => boolean;
};

export const useCourseStore = create<CourseState & CourseActions>()(
  persistConfig('course-store', (set, get) => ({
    courses: {},
    favoriteCourses: [],

    setCourses: (courses) => {
      const coursesRecord = courses.reduce<Record<number, Course>>((acc, course) => {
        if (course.id) {
          acc[course.id] = course;
        }
        return acc;
      }, {});
      set({ courses: coursesRecord });
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

    removeCourse: (courseId) => {
      set((state) => {
        const { [courseId]: _, ...rest } = state.courses;
        return { courses: rest };
      });
    },

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

    getCourse: courseId => get().courses[courseId],
    getAllCourses: () => Object.values(get().courses),
    getFavoriteCourses: () => {
      const courses = get().courses;
      return get().favoriteCourses.map(id => courses[id]).filter((course): course is Course => !!course);
    },
    isFavorite: courseId => get().favoriteCourses.includes(courseId),
  })),
);
