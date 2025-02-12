export type CourseStatus =
  | 'Completed'
  | 'In Progress'
  | 'Failed'
  | 'Not Offered'
  | 'Planned';

export const statusTranslations: Record<CourseStatus, string> = {
  'Completed': 'Complété',
  'In Progress': 'En progrès',
  'Failed': 'Échoué',
  'Not Offered': 'Non offert',
  'Planned': 'Planifié',
};

export const statusTagClasses: Record<CourseStatus, string> = {
  'Completed': 'bg-completedCourseTag text-textLightBackground border-favoris',
  'In Progress': 'bg-inProgressCourseTag text-textLightBackground border-favoris',
  'Failed': 'bg-failedCourseTag text-textLightBackground border-favoris',
  'Not Offered': 'bg-notOfferedCourseTag text-textLightBackground border-favoris',
  'Planned': 'bg-buttonTags text-textLightBackground border-favoris',
};
