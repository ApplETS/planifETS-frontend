import type { TagVariant } from '@/components/atoms/Tag';
import type { CourseStatus } from '@/types/course';

import { useLocale, useTranslations } from 'next-intl';

import Tag from '@/components/atoms/Tag';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shadcn/ui/tooltip';
import {
  extractYearFromSessionKey,
  getTranslationKey,
} from '@/utils/sessionUtils';

type StatusTagProps = {
  status: CourseStatus;
  duplicateSessionKeys?: string[];
};

export default function StatusTag({
  status,
  duplicateSessionKeys,
}: StatusTagProps) {
  const t = useTranslations('PlannerPage');
  const locale = useLocale();

  const VARIANT_STATUS: Record<CourseStatus, TagVariant> = {
    'Completed': 'success',
    'Duplicate': 'duplicate',
    'Not Offered': 'danger',
    'Offered': 'success',
    'Planned': 'info',
  };

  const content = (
    <Tag variant={VARIANT_STATUS[status]}>
      {t(`course.${status}`)}
    </Tag>
  );

  if (status !== 'Duplicate' || !duplicateSessionKeys || duplicateSessionKeys.length === 0) {
    return content;
  }

  const duplicateSessions = duplicateSessionKeys.map((sessionKey) => {
    const sessionTerm = sessionKey.charAt(0);
    const sessionYear = extractYearFromSessionKey(sessionKey);

    return `${t(getTranslationKey(sessionTerm))} ${sessionYear}`;
  });
  const formattedSessionList = new Intl.ListFormat(locale, {
    style: 'long',
    type: 'conjunction',
  }).format(duplicateSessions);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">
          {content}
        </span>
      </TooltipTrigger>
      <TooltipContent sideOffset={6} className="w-auto max-w-[20rem] text-left text-wrap">
        {t('duplicate-course-sessions', { sessions: formattedSessionList })}
      </TooltipContent>
    </Tooltip>
  );
}
