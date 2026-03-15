'use client';

import { ExternalLink, Heart, MoreHorizontal, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';
import { usePlannerStore } from '@/store/plannerStore';
import { getCourseDetailsHref } from '@/utils/courseDetailsUtils';

type CourseActionsMenuProps = {
  courseId: number;
  courseCode: string;
  preferredProgramId: number | null;
  fromSessionYear: number;
  fromSessionTerm: string;
  onDeleteAction?: () => void;
};

export default function CourseActionsMenu({
  courseId,
  courseCode,
  preferredProgramId,
  fromSessionYear,
  fromSessionTerm,
  onDeleteAction: onDelete,
}: CourseActionsMenuProps) {
  const t = useTranslations('PlannerPage');
  const { toggleFavorite, isFavorite } = usePlannerStore();
  const isCourseFavorited = isFavorite(courseId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 border border-gray-400 hover:bg-primary/20 dark:hover:bg-primary/20"
          aria-label={t('delete-course')}
          data-testid={`course-actions-${courseCode}-${fromSessionTerm}-${fromSessionYear}`}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem asChild>
          <Link
            href={getCourseDetailsHref(courseId, preferredProgramId)}
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center gap-2"
          >
            <ExternalLink className="size-4" />
            {t('course-details')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={(e) => {
            e.stopPropagation();
            toggleFavorite(courseId);
          }}
          data-testid={`favorite-course-${courseId}-${fromSessionTerm}-${fromSessionYear}`}
        >
          <Heart
            className={`size-4 ${isCourseFavorited ? 'text-red-600' : 'text-foreground'}`}
            fill={isCourseFavorited ? 'currentColor' : 'none'}
          />
          {isCourseFavorited ? t('remove-from-favorites') : t('add-to-favorites')}
        </DropdownMenuItem>

        {onDelete
          ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                data-testid={`delete-course-${courseCode}-${fromSessionTerm}-${fromSessionYear}`}
              >
                <Trash className="size-4 text-destructive" />
                {t('delete-course')}
              </DropdownMenuItem>
            </>
          )
          : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
