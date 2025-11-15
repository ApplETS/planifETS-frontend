import type { Course } from '@/types/course';
import { useMemo } from 'react';
import { useCourseStore } from '@/store/courseStore';
import { useProgramStore } from '@/store/programStore';
import { FAVORITE_TAB_INDEX } from '@/utils/constants';

export const useProgramCoursesOperations = (searchQuery: string, activeTab: number) => {
  const selectedPrograms = useProgramStore(state => state.getSelectedPrograms());
  const { courses, getFavoriteCourses } = useCourseStore();

  const programCoursesData = useMemo(() => {
    if (!selectedPrograms.length) {
      return { courses: [], courseIds: [], hasSelectedPrograms: false };
    }

    // Get courses from the store (they are loaded by ProgramSelector via API)
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

  const displayedCourses = useMemo(() => {
    let coursesToDisplay: Course[];

    if (activeTab === FAVORITE_TAB_INDEX) {
      coursesToDisplay = getFavoriteCourses();
    } else {
      coursesToDisplay = programCoursesData.courses;
    }

    if (!searchQuery.trim()) {
      return coursesToDisplay;
    }

    const lowerQuery = searchQuery.toLowerCase();

    const filteredCourses = coursesToDisplay.filter(course =>
      course.code.toLowerCase().includes(lowerQuery)
      || course.title.toLowerCase().includes(lowerQuery),
    );

    return filteredCourses;
  }, [programCoursesData.courses, activeTab, searchQuery, getFavoriteCourses]);

  const hasCoursesInStore = Object.values(courses).length > 0 && selectedPrograms.length > 0;

  return {
    displayedCourses,
    hasSelectedPrograms: programCoursesData.hasSelectedPrograms || hasCoursesInStore,
    programCoursesData,
  };
};
