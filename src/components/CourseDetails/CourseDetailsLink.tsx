'use client';

import type { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/shadcn/ui/button';
import { useProgramStore } from '@/store/programStore';
import { getCourseDetailsHref } from '@/utils/courseDetailsUtils';

type CourseDetailsLinkProps = Pick<ComponentProps<typeof Button>, 'className' | 'size' | 'variant'> & {
  courseId: number;
  dataTestId?: string;
};

const CourseDetailsLink = ({
  className,
  courseId,
  dataTestId,
  size = 'sm',
  variant = 'outline',
}: CourseDetailsLinkProps) => {
  const t = useTranslations('PlannerPage');
  const selectedProgramIds = useProgramStore((state) => state.getSelectedProgramIds());
  const preferredProgramId = selectedProgramIds[0] ?? null;

  return (
    <Button asChild className={className} size={size} variant={variant}>
      <Link
        href={getCourseDetailsHref(courseId, preferredProgramId)}
        data-testid={dataTestId}
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('course-details')}
      </Link>
    </Button>
  );
};

export default CourseDetailsLink;
