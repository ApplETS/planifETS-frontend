'use client';

import { useCallback, useEffect, useRef } from 'react';
import { courseService } from '../services/course.service';
import { useApi } from './useApi';

export function useCourseByIdApi(courseId: number | null) {
  const previousCourseIdRef = useRef<number | null>(null);
  const apiFunction = useCallback(() => courseService.getCourseById(courseId ?? 0), [courseId]);
  const { data, loading, error, execute, reset } = useApi(apiFunction);

  useEffect(() => {
    if (!courseId) {
      previousCourseIdRef.current = null;
      reset();
      return;
    }

    if (previousCourseIdRef.current === courseId) {
      return;
    }

    previousCourseIdRef.current = courseId;
    reset();
    void execute();
  }, [courseId, execute, reset]);

  return { data, loading, error };
}
