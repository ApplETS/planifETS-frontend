import type { Course } from '@/types/course';
import { programCourses } from '@/data/program-courses';
import { useCourseStore } from '@/store/courseStore';
import { useProgramStore } from '@/store/programStore';
import { useEffect, useMemo } from 'react';

export const useProgramCoursesOperations = (searchQuery: string, activeTab: number) => {
  const programStore = useProgramStore();
  const { setCourses, getCoursesById, getFavoriteCourses, courses } = useCourseStore();

  const programCoursesData = useMemo(() => {
    const selectedPrograms = programStore.getSelectedPrograms();
    const hasPrograms = selectedPrograms.length > 0;

    if (!hasPrograms) {
      return {
        uniqueCourses: [] as Course[],
        allCourseIds: [] as number[],
        hasSelectedPrograms: false,
      };
    }

    const coursesByCode: Record<string, Course> = {};
    const allCourseIds: number[] = [];

    selectedPrograms.forEach((program) => {
      if (programCourses[program]) {
        const validCourses = programCourses[program].filter(course => course?.id && course?.code);
        validCourses.forEach((course) => {
          coursesByCode[course.code] = course;
          allCourseIds.push(course.id);
        });
      }
    });

    return {
      uniqueCourses: Object.values(coursesByCode),
      allCourseIds: [...new Set(allCourseIds)],
      hasSelectedPrograms: true,
    };
  }, [programStore]);

  useEffect(() => {
    const selectedPrograms = programStore.getSelectedPrograms();
    if (selectedPrograms.length > 0) {
      setCourses(programCoursesData.uniqueCourses);
    }
  }, [programStore, programCoursesData.uniqueCourses, setCourses]);

  const displayedCourses = useMemo(() => {
    let baseCourses: Course[] = [];

    if (activeTab === 1) {
      baseCourses = getFavoriteCourses();
    } else if (programCoursesData.allCourseIds.length > 0) {
      const coursesById = getCoursesById(programCoursesData.allCourseIds);

      baseCourses = Object.values(
        coursesById.reduce((acc, course) => {
          if (course.code) {
            acc[course.code] = course;
          }
          return acc;
        }, {} as Record<string, Course>),
      );

      // Fallback if courses are not yet in the store but we have computed them
      if (baseCourses.length === 0 && programCoursesData.uniqueCourses.length > 0) {
        baseCourses = programCoursesData.uniqueCourses;
      }
    }

    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      return baseCourses.filter(course =>
        course.code.toLowerCase().includes(lowerQuery)
        || course.title.toLowerCase().includes(lowerQuery),
      );
    }

    return baseCourses;
  }, [
    programCoursesData,
    activeTab,
    searchQuery,
    getCoursesById,
    getFavoriteCourses,
  ]);

  const hasCoursesInStore = Object.values(courses).length > 0 && programStore.getSelectedPrograms().length > 0;

  return {
    displayedCourses,
    hasSelectedPrograms: programCoursesData.hasSelectedPrograms || hasCoursesInStore,
    programCoursesData,
  };
};
