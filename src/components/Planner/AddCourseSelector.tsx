'use client';

import type { Course } from '@/types/course';
import type { TermEnum } from '@/types/session';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

import { courseService } from '@/api/services/course.service';
import { useCourseOperations } from '@/hooks/course/useCourseOperations';
import { showSuccess } from '@/lib/toast';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shadcn/ui/command';
import { mapApiCourseToAppCourse } from '@/utils/courseUtil';
import { formatSessionShort, generateSessionKey } from '@/utils/sessionUtil';

type Props = {
  sessionYear: number;
  sessionTerm: TermEnum;
  onClose: () => void;
};

export default function AddCourseSelector({ sessionYear, sessionTerm, onClose }: Readonly<Props>) {
  const t = useTranslations('PlannerPage');
  const { addCourseToSession } = useCourseOperations();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  const sessionCode = generateSessionKey(sessionYear, sessionTerm);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setListOpen(false);
      return;
    }
    setLoading(true);
    try {
      const response = await courseService.searchCourses({ query: q.trim(), limit: 30 });
      if (response.data) {
        const mapped = response.data.courses
          .map(mapApiCourseToAppCourse)
          .filter((c): c is Course => c !== null);
        setResults(mapped);
        setListOpen(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query).catch(() => {});
    }, 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  const handleSelect = (course: Course) => {
    addCourseToSession(sessionYear, sessionTerm, course);
    showSuccess(t('course-added-to-session', { session: formatSessionShort(sessionCode) }));
    onClose();
  };

  const handleValueChange = (v: string) => {
    setQuery(v);
    setListOpen(v.trim() !== '');
  };

  const handleBlur = () => setTimeout(onClose, 150);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Command shouldFilter={false} className="overflow-visible bg-transparent">
      <CommandInput
        value={query}
        onValueChange={handleValueChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={t('search-course')}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <div className="relative">
        {listOpen && (
          <div className="absolute top-1 z-50 w-full overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-md animate-in">
            <CommandList>
              <CommandGroup>
                {results.map((course) => (
                  <CommandItem
                    key={course.id}
                    value={course.code}
                    className="px-4 py-2.5 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => handleSelect(course)}
                  >
                    <span className="font-mono font-medium shrink-0">{course.code}</span>
                    <span className="ml-2 truncate">{course.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {!loading && query.trim() !== '' && results.length === 0 && (
                <CommandEmpty>{t('no-courses-found')}</CommandEmpty>
              )}
            </CommandList>
          </div>
        )}
      </div>
    </Command>
  );
}
