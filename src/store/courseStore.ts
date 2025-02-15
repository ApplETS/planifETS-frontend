import type { Course, CourseStatus } from '@/types/course';
import { persistConfig } from 'lib/persistConfig';
import { create } from 'zustand';

type CourseState = {
  courses: Record<string, Course>;
  favoriteCourses: string[];
};

type CourseActions = {
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  removeCourse: (courseCode: string) => void;
  toggleFavorite: (courseCode: string) => void;
  updateCourseStatus: (courseCode: string, status: CourseStatus) => void;
  getCourse: (courseCode: string) => Course | undefined;
  getAllCourses: () => Course[];
  getFavoriteCourses: () => Course[];
  isFavorite: (courseCode: string) => boolean;
};

export const useCourseStore = create<CourseState & CourseActions>()(
  persistConfig('courseStore', (set, get) => ({
    courses: {},
    favoriteCourses: [],

    setCourses: (courses) => {
      const coursesRecord = courses.reduce<Record<string, Course>>((acc, course) => {
        acc[course.code] = course;
        return acc;
      }, {});

      set({ courses: coursesRecord });
    },

    addCourse: (course) => {
      set(state => ({
        courses: {
          ...state.courses,
          [course.code]: course,
        },
      }));
    },

    removeCourse: (courseCode) => {
      set((state) => {
        const { [courseCode]: _, ...rest } = state.courses;
        return { courses: rest };
      });
    },

    toggleFavorite: (courseCode) => {
      set((state) => {
        const favorites = [...state.favoriteCourses];
        const index = favorites.indexOf(courseCode);

        if (index !== -1) {
          favorites.splice(index, 1);
        } else {
          favorites.push(courseCode);
        }

        return { favoriteCourses: favorites };
      });
    },

    updateCourseStatus: (courseCode, status) => {
      set((state) => {
        const course = state.courses[courseCode];
        if (!course) {
          return state;
        }

        return {
          courses: {
            ...state.courses,
            [courseCode]: { ...course, status },
          },
        };
      });
    },

    getCourse: courseCode => get().courses[courseCode],

    getAllCourses: () => Object.values(get().courses),

    getFavoriteCourses: () =>
      Object.values(get().courses).filter(course =>
        get().favoriteCourses.includes(course.code),
      ),

    isFavorite: courseCode => get().favoriteCourses.includes(courseCode),
  })),
);
