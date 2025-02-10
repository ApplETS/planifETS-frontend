import type { CourseStatus } from '../../types/courseStatus';
import { statusTagClasses, statusTranslations } from '../../types/courseStatus';

type StatusTagProps = {
  status: CourseStatus;
};

export default function StatusTag({ status }: StatusTagProps) {
  return (
    <span
      className={`inline-block rounded-[5px] p-1 text-xs font-semibold ${statusTagClasses[status]}`}
    >
      {statusTranslations[status]}
    </span>
  );
}
