type CreditSplit = {
  totalCourseCredits: number;
  totalStageCredits: number;
};

export function accumulateCreditSplit(
  courseInstances: { courseId: number }[],
  courses: Record<number, { credits?: number | null; type?: string | null; title?: string | null }>,
): CreditSplit {
  return courseInstances.reduce(
    (acc, inst) => {
      const course = courses[inst.courseId];
      if (!course) {
        return acc;
      }

      const credits = course.credits ?? 0;

      if (course.type === 'STAGE' || course.title?.startsWith('Stage')) {
        acc.totalStageCredits += credits;
      } else {
        acc.totalCourseCredits += credits;
      }

      return acc;
    },
    { totalCourseCredits: 0, totalStageCredits: 0 },
  );
}
