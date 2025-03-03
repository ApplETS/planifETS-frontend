import type { Course } from '@/types/course';
import { programCourses } from '@/data/program-courses';
import { useCourseStore } from '@/store/courseStore';
import { useProgramStore } from '@/store/programStore';
import { FAVORITE_TAB_INDEX } from '@/utils/constants';
import { useEffect, useMemo } from 'react';

export const useProgramCoursesOperations = (searchQuery: string, activeTab: number) => {
  const selectedPrograms = useProgramStore(state => state.getSelectedPrograms());
  const { setCourses, courses, getFavoriteCourses } = useCourseStore();

  // Step 1: Get program courses and sync with store
  const programCoursesData = useMemo(() => {
    if (!selectedPrograms.length) {
      return { courses: [], courseIds: [], hasSelectedPrograms: false };
    }

    const uniqueCoursesMap = new Map<string, Course>();
    const courseIds: number[] = [];

    selectedPrograms.forEach((programId) => {
      const programCourseList = programCourses[programId] || [];

      programCourseList.forEach((course) => {
        if (course?.id && course?.code) {
          uniqueCoursesMap.set(course.code, course);
          courseIds.push(course.id);
        }
      });
    });

    return {
      courses: Array.from(uniqueCoursesMap.values()),
      courseIds: [...new Set(courseIds)],
      hasSelectedPrograms: true,
    };
  }, [selectedPrograms]);

  useEffect(() => {
    if (programCoursesData.courses.length > 0) {
      setCourses(programCoursesData.courses);
    }
  }, [programCoursesData.courses, setCourses]);

  const displayedCourses = useMemo(() => {
    let coursesToDisplay: Course[];

    if (activeTab === FAVORITE_TAB_INDEX) {
      coursesToDisplay = getFavoriteCourses();
    } else {
      coursesToDisplay = programCoursesData.courses;
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      return coursesToDisplay.filter(course =>
        course.code.toLowerCase().includes(lowerQuery)
        || course.title.toLowerCase().includes(lowerQuery),
      );
    }

    return coursesToDisplay;
  }, [programCoursesData.courses, activeTab, searchQuery, getFavoriteCourses]);

  const hasCoursesInStore = Object.values(courses).length > 0 && selectedPrograms.length > 0;

  return {
    displayedCourses,
    hasSelectedPrograms: programCoursesData.hasSelectedPrograms || hasCoursesInStore,
    programCoursesData,
  };
};
