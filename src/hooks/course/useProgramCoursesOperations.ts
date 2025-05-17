import type { Course } from '@/types/course';
import { useEffect, useMemo } from 'react';
import { programCourses } from '@/data/program-courses';
import { useCourseStore } from '@/store/courseStore';
import { useProgramStore } from '@/store/programStore';
import { FAVORITE_TAB_INDEX } from '@/utils/constants';

export const useProgramCoursesOperations = (searchQuery: string, activeTab: number) => {
  const selectedPrograms = useProgramStore(state => state.getSelectedPrograms());
  const { setCourses, courses, getFavoriteCourses } = useCourseStore();

  const programCoursesData = useMemo(() => {
    if (!selectedPrograms.length) {
      return { courses: [], courseIds: [], hasSelectedPrograms: false };
    }

    const uniqueCourseIds = new Set<number>();
    const coursesMap = new Map<string, Course>();

    selectedPrograms.forEach((programId) => {
      (programCourses[programId] || []).forEach((course) => {
        if (course?.id && course?.code) {
          coursesMap.set(course.code, course);
          uniqueCourseIds.add(course.id);
        } else {
          console.error('Invalid course data:', course);
        }
      });
    });

    return {
      courses: Array.from(coursesMap.values()),
      courseIds: Array.from(uniqueCourseIds),
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
