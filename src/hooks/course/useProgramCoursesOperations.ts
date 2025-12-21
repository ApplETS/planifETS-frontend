import type { Course } from '@/types/course';
import { useMemo } from 'react';
import { useCourseStore } from '@/store/courseStore';
import { usePlannerStore } from '@/store/plannerStore';
import { useProgramStore } from '@/store/programStore';
import { FAVORITE_TAB_INDEX } from '@/utils/constants';

export const useProgramCoursesOperations = (searchQuery: string, activeTab: number) => {
  const selectedPrograms = useProgramStore(state => state.getSelectedPrograms());
  const courses = useCourseStore(state => state.courses);
  const favoriteCourseIds = usePlannerStore(state => state.favoriteCourses);

  const programCoursesData = useMemo(() => {
    if (!selectedPrograms.length) {
      return { courses: [], courseIds: [], hasSelectedPrograms: false };
    }

    const coursesArray = Object.values(courses);
    const uniqueCourseIds = new Set<number>();
    const coursesMap = new Map<string, Course>();

    coursesArray.forEach((course) => {
      if (course?.id && course?.code) {
        coursesMap.set(course.code, course);
        uniqueCourseIds.add(course.id);
      }
    });

    return {
      courses: Array.from(coursesMap.values()),
      courseIds: Array.from(uniqueCourseIds),
      hasSelectedPrograms: true,
    };
  }, [selectedPrograms, courses]);

  const favoriteCourses = useMemo(() => {
    const coursesArray = Object.values(courses);
    return coursesArray.filter(course => course && favoriteCourseIds.includes(course.id));
  }, [courses, favoriteCourseIds]);

  const displayedCourses = useMemo(() => {
    // Favorites tab should always show all favorite courses, independent of search query
    if (activeTab === FAVORITE_TAB_INDEX) {
      return favoriteCourses;
    }

    const coursesToDisplay = programCoursesData.courses;

    if (!searchQuery.trim()) {
      return coursesToDisplay;
    }

    const lowerQuery = searchQuery.toLowerCase();

    return coursesToDisplay.filter(course =>
      course.code.toLowerCase().includes(lowerQuery)
      || course.title.toLowerCase().includes(lowerQuery),
    );
  }, [activeTab, favoriteCourses, programCoursesData.courses, searchQuery]);

  const hasCoursesInStore = Object.values(courses).length > 0 && selectedPrograms.length > 0;

  return {
    displayedCourses,
    hasSelectedPrograms: programCoursesData.hasSelectedPrograms || hasCoursesInStore,
    programCoursesData,
  };
};
