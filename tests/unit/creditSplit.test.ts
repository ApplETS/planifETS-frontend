import { describe, expect, it } from 'vitest';
import { accumulateCreditSplit } from '@/utils/creditUtil';

describe('accumulateCreditSplit', () => {
  it('counts STAGE courses as internship credits', () => {
    const courses = {
      1: { credits: 9, type: 'STAGE' },
      2: { credits: 3, type: 'TRONC' },
    };
    const instances = [{ courseId: 1 }, { courseId: 2 }];

    const result = accumulateCreditSplit(instances, courses);

    expect(result.totalStageCredits).toBe(9);
    expect(result.totalCourseCredits).toBe(3);
  });

  it('returns zero internship credits when no STAGE courses are present', () => {
    const courses = {
      1: { credits: 3, type: 'TRONC' },
      2: { credits: 4, type: 'CONCE' },
    };
    const instances = [{ courseId: 1 }, { courseId: 2 }];

    const result = accumulateCreditSplit(instances, courses);

    expect(result.totalStageCredits).toBe(0);
    expect(result.totalCourseCredits).toBe(7);
  });

  it('returns zero for both when courseInstances is empty', () => {
    const result = accumulateCreditSplit([], {});

    expect(result.totalCourseCredits).toBe(0);
    expect(result.totalStageCredits).toBe(0);
  });

  it('skips course instances whose courseId is not in courses', () => {
    const courses = {
      1: { credits: 3, type: 'TRONC' },
    };
    const instances = [{ courseId: 1 }, { courseId: 999 }];

    const result = accumulateCreditSplit(instances, courses);

    expect(result.totalCourseCredits).toBe(3);
    expect(result.totalStageCredits).toBe(0);
  });

  it('treats courses with null type as regular credits', () => {
    const courses = {
      1: { credits: 3, type: null },
    };
    const instances = [{ courseId: 1 }];

    const result = accumulateCreditSplit(instances, courses);

    expect(result.totalCourseCredits).toBe(3);
    expect(result.totalStageCredits).toBe(0);
  });

  it('treats courses with null credits as 0', () => {
    const courses = {
      1: { credits: null, type: 'STAGE' },
      2: { credits: null, type: 'TRONC' },
    };
    const instances = [{ courseId: 1 }, { courseId: 2 }];

    const result = accumulateCreditSplit(instances, courses);

    expect(result.totalStageCredits).toBe(0);
    expect(result.totalCourseCredits).toBe(0);
  });

  it('accumulates multiple STAGE courses', () => {
    const courses = {
      1: { credits: 9, type: 'STAGE' },
      2: { credits: 9, type: 'STAGE' },
      3: { credits: 9, type: 'STAGE' },
    };
    const instances = [{ courseId: 1 }, { courseId: 2 }, { courseId: 3 }];

    const result = accumulateCreditSplit(instances, courses);

    expect(result.totalStageCredits).toBe(27);
    expect(result.totalCourseCredits).toBe(0);
  });
});
