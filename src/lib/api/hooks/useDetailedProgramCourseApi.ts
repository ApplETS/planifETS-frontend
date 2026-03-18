'use client';

import { useCallback, useEffect, useRef } from 'react';
import { courseService } from '../services/course.service';
import { useApi } from './useApi';

export function useDetailedProgramCourseApi(
  courseId: number | null,
  programId: number | null,
) {
  const previousRequestKey = useRef('');
  const apiFunction = useCallback(
    () =>
      courseService.getDetailedProgramCourse({
        courseId: courseId ?? 0,
        programId: programId ?? 0,
      }),
    [courseId, programId],
  );
  const { data, loading, error, isOffline, execute, reset } = useApi(apiFunction);

  useEffect(() => {
    if (!courseId || !programId) {
      if (previousRequestKey.current === '') {
        return;
      }

      previousRequestKey.current = '';
      reset();
      return;
    }

    const requestKey = `${courseId}:${programId}`;
    if (previousRequestKey.current === requestKey) {
      return;
    }

    previousRequestKey.current = requestKey;
    reset();
    void execute();
  }, [courseId, execute, programId, reset]);

  return { data, loading, error, isOffline, reset };
}
