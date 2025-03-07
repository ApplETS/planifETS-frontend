// import type { ApiError } from '@/api/client';
import type { CourseDetail } from '@/api/types';
import { getCourseDetails } from '@/api/endpoints/courses';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

/**
 * Hook for fetching course details
 * @param courseId - ID of the course to fetch details for (null means no course selected)
 * @returns Object containing loading state, error state, and course details
 */
export function useCourseDetails(courseId: number | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [courseDetails, setCourseDetails] = useState<CourseDetail | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Clear data if no course is selected
    if (!courseId) {
      setCourseDetails(null);
      setError(null);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function fetchCourseDetails() {
      try {
        setIsLoading(true);
        setError(null);

        // Type assertion to ensure courseId is a number
        const details = await getCourseDetails(courseId as number);

        // Only update state if component is still mounted
        if (isMounted) {
          setCourseDetails(details);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch course details:', err);

          // Format error message
          const errorMessage =
            err instanceof Error
              ? err.message
              : 'Une erreur est survenue lors du chargement des détails du cours';

          // Display error notification
          enqueueSnackbar(errorMessage, { variant: 'error' });

          // Set error state
          setError(err instanceof Error ? err : new Error(errorMessage));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCourseDetails();

    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [courseId, enqueueSnackbar]);

  return { courseDetails, isLoading, error };
}
