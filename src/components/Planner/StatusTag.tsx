import type { TagVariant } from '../atoms/Tag';
import type { CourseStatus } from '@/types/courseStatus';
import { useTranslations } from 'next-intl';

import Tag from '../atoms/Tag';

type StatusTagProps = {
  status: CourseStatus;
};

export default function StatusTag({ status }: StatusTagProps) {
  const t = useTranslations('PlannerPage');

  const VARIANT_STATUS: Record<CourseStatus, TagVariant> = {
    'Completed': 'success',
    'In Progress': 'warning',
    'Failed': 'danger',
    'Not Offered': 'danger',
    'Planned': 'info',
  };

  return (
    <Tag variant={VARIANT_STATUS[status]}>
      {t(`course.${status}`)}
    </Tag>
  );
}
