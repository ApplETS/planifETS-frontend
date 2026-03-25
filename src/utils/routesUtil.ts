// ETS website
export const getETSCourseDetailsHref = (courseCode: string) => `https://www.etsmtl.ca/etudes/cours/${courseCode}`;

export const appRoutes = {
  planner: '/planner',
  courseSearch: '/course',
} as const;

export const navbarLinks = [
  {
    key: 'planner',
    href: appRoutes.planner,
    labelKey: 'planner',
  },
  {
    key: 'courseDetails',
    href: appRoutes.courseSearch,
    labelKey: 'courseDetails',
  },
] as const;

// Internal routes
export const getCourseDetailsHref = (courseId: number) => `${appRoutes.courseSearch}/${courseId}`;
