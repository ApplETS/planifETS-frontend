'use client';

import { useCallback, useEffect, useRef } from 'react';
import { courseService } from '../services/course.service';
import { useApi } from './useApi';

export function useCourseByIdApi(courseId: number | null) {
  const previousCourseId = useRef<number | null>(null);
  const apiFunction = useCallback(
    () => courseService.getCourseById(courseId ?? 0),
    [courseId],
  );
  const { data, loading, error, isOffline, execute, reset } = useApi(apiFunction);

  useEffect(() => {
    if (!courseId) {
      if (previousCourseId.current === null) {
        return;
      }

      previousCourseId.current = null;
      reset();
      return;
    }

    if (previousCourseId.current === courseId) {
      return;
    }

    previousCourseId.current = courseId;
    reset();
    void execute();
  }, [courseId, execute, reset]);

  return { data, loading, error, isOffline, reset };
}
