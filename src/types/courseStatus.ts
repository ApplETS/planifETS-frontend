export type CourseStatus =
  | 'Completed'
  | 'In Progress'
  | 'Failed'
  | 'Not Offered'
  | 'Planned';

export const statusTagClasses: Record<CourseStatus, string> = {
  'Completed': 'bg-completedCourseTag text-textLightBackground  borderborder-border',
  'In Progress': 'bg-inProgressCourseTag text-textLightBackground border border-border',
  'Failed': 'bg-failedCourseTag text-textLightBackground border border-border',
  'Not Offered': 'bg-notOfferedCourseTag text-textLightBackground border border-border',
  'Planned': 'bg-buttonTags text-textLightBackground border border-border',
};
