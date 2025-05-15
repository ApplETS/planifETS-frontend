import type { CourseStatus } from '../../types/courseStatus';
import { useTranslations } from 'next-intl';
import Tag from '../atoms/Tag';

type StatusTagProps = {
  status: CourseStatus;
};

export default function StatusTag({ status }: StatusTagProps) {
  const t = useTranslations('PlannerPage');

  const statusVariantMap: Record<CourseStatus, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
    'Completed': 'success',
    'In Progress': 'warning',
    'Failed': 'danger',
    'Not Offered': 'info',
    'Planned': 'primary',
  };

  return (
    <Tag
      variant={statusVariantMap[status]}
    >
      {t(`course.${status}`)}
    </Tag>
  );
}
