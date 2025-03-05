import type { CourseStatus } from '../../types/courseStatus';
import { useTranslations } from 'next-intl';
import { statusTagClasses } from '../../types/courseStatus';

type StatusTagProps = {
  status: CourseStatus;
};

export default function StatusTag({ status }: StatusTagProps) {
  const t = useTranslations('PlannerPage');

  return (
    <span
      className={`inline-block rounded-[5px] p-1 text-xs font-semibold ${statusTagClasses[status]}`}
    >
      {t(`course.${status}`)}
    </span>
  );
}
