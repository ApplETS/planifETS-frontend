export type CourseStatus =
  | 'Completed'
  | 'In Progress'
  | 'Failed'
  | 'Not Offered'
  | 'Planned';

export const statusTagClasses: Record<CourseStatus, string> = {
  'Completed': 'bg-completedCourseTag text--primary-foreground  borderborder-border',
  'In Progress': 'bg-inProgressCourseTag text--primary-foreground border border-border',
  'Failed': 'bg-failedCourseTag text--primary-foreground border border-border',
  'Not Offered': 'bg-notOfferedCourseTag text--primary-foreground border border-border',
  'Planned': 'bg-primary text--primary-foreground border border-border',
};
