export const getCourseDetailsHref = (
  courseId: number,
  programId?: number | null,
) => {
  const searchParams = new URLSearchParams();

  if (programId) {
    searchParams.set('programId', programId.toString());
  }

  const query = searchParams.toString();
  return query ? `/course/${courseId}?${query}` : `/course/${courseId}`;
};
