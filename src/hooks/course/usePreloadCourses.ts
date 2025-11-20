import type {
  ProgramCourseDetailedDto,
  ProgramCoursesDto,
} from '@/api/types/program';
import type { Course } from '@/types/course';
import { useEffect, useRef, useState } from 'react';

import { programService } from '@/api/services/program.service';
import { useCourseStore } from '@/store/courseStore';
import { usePlannerStore } from '@/store/plannerStore';
import { useSessionStore } from '@/store/sessionStore';
import { mapApiCourseToAppCourse } from '@/utils/courseUtils';

/**
 * Hook to preload courses that are in sessions or favorites
 * Fetches missing course data on mount using /program-courses/ids
 */
export const usePreloadCourses = () => {
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const { setCourses } = useCourseStore();

  useEffect(() => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    const fetchMissingCourses = async () => {
      // Get current state from stores
      const sessions = useSessionStore.getState().sessions;
      const favoriteCourseIds = usePlannerStore.getState().favoriteCourses;
      const courses = useCourseStore.getState().courses;

      // Collect all course IDs from sessions
      const sessionCourseIds = new Set<number>();
      Object.values(sessions).forEach((session) => {
        session.courseInstances.forEach((instance) => {
          sessionCourseIds.add(instance.courseId);
        });
      });

      // Combine with favorite IDs
      const allRequiredCourseIds = new Set([...sessionCourseIds, ...favoriteCourseIds]);

      // Find missing course IDs (not in cache)
      const missingCourseIds = Array.from(allRequiredCourseIds).filter(
        courseId => !courses[courseId],
      );

      if (missingCourseIds.length === 0) {
        return;
      }

      try {
        setLoading(true);

        const response = await programService.getCoursesByIds(missingCourseIds);

        if (response.data?.data) {
          const coursesByCode = new Map<string, Course>();

          response.data.data.forEach((programCourses: ProgramCoursesDto) => {
            programCourses.courses.forEach((course: ProgramCourseDetailedDto) => {
              const mappedCourse = mapApiCourseToAppCourse(course);
              if (mappedCourse) {
                coursesByCode.set(mappedCourse.code, mappedCourse);
              }
            });
          });

          setCourses(Array.from(coursesByCode.values()));
        }
      } catch (error) {
        console.error('Failed to preload courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissingCourses();
  }, [setCourses]);

  return { loading };
};
