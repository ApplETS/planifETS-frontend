'use client';

import type { SearchCourseResult } from '@/api/types/course';

import { Command as CommandPrimitive } from 'cmdk';
import { Check, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { courseService } from '@/api/services/course.service';
import { handleApiError } from '@/api/utils/error-handler';
import { cn } from '@/shadcn/lib/utils';
import { Command, CommandGroup, CommandItem, CommandList } from '@/shadcn/ui/command';

type CourseSearchSelectProps = {
  currentCourseId: number | null;
};

type SearchState = {
  results: SearchCourseResult[];
  loading: boolean;
  error: string | null;
};

type SearchAction
  = | { type: 'reset' }
    | { type: 'clearError' }
    | { type: 'start' }
    | { type: 'success'; results: SearchCourseResult[] }
    | { type: 'failure'; error: string };

const SEARCH_RESULTS_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 250;
const INITIAL_SEARCH_STATE: SearchState = {
  results: [],
  loading: false,
  error: null,
};

const getCourseLabel = (course: Pick<SearchCourseResult, 'code' | 'title'>) =>
  `${course.code} - ${course.title}`;

const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'reset':
      return INITIAL_SEARCH_STATE;
    case 'clearError':
      if (state.error === null) {
        return state;
      }

      return {
        ...state,
        error: null,
      };
    case 'start':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'success':
      return {
        results: action.results,
        loading: false,
        error: null,
      };
    case 'failure':
      return {
        results: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const CourseSearchSelect = ({
  currentCourseId,
}: CourseSearchSelectProps) => {
  const router = useRouter();
  const tCommons = useTranslations('Commons');
  const tPlanner = useTranslations('PlannerPage');

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [{ results, loading, error }, dispatch] = React.useReducer(
    searchReducer,
    INITIAL_SEARCH_STATE,
  );
  const requestIdRef = React.useRef(0);

  const trimmedQuery = query.trim();
  const showDropdown = open && (trimmedQuery.length > 0 || loading || error !== null);

  React.useEffect(() => {
    if (!open || !trimmedQuery) {
      requestIdRef.current += 1;
      dispatch({ type: 'reset' });
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    const timeoutId = globalThis.setTimeout(async () => {
      dispatch({ type: 'start' });

      try {
        const response = await courseService.searchCourses({
          query: trimmedQuery,
          limit: SEARCH_RESULTS_LIMIT,
        });

        if (requestId !== requestIdRef.current) {
          return;
        }

        dispatch({
          type: 'success',
          results: response.data?.courses ?? [],
        });
      } catch (requestError) {
        if (requestId !== requestIdRef.current) {
          return;
        }

        dispatch({
          type: 'failure',
          error: handleApiError(requestError),
        });
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [open, trimmedQuery]);

  const handleSelect = (course: SearchCourseResult) => {
    setOpen(false);
    setQuery('');

    if (course.id === currentCourseId) {
      return;
    }

    React.startTransition(() => {
      router.push(`/course/${course.id}`);
    });
  };

  const handleValueChange = (nextQuery: string) => {
    setQuery(nextQuery);
    dispatch({ type: 'clearError' });
  };

  return (
    <div ref={containerRef} className="relative">
      <Command shouldFilter={false} className="overflow-visible bg-transparent">
        <div
          className="flex h-10 items-center gap-3 rounded-2xl border border-border bg-background px-3"
          data-testid="course-details-search-shell"
        >
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <CommandPrimitive.Input
            value={query}
            onValueChange={handleValueChange}
            onFocus={() => setOpen(true)}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget as Node | null;
              if (!containerRef.current?.contains(nextTarget)) {
                setOpen(false);
              }
            }}
            placeholder={tPlanner('search-course')}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            data-testid="course-details-search-input"
          />
        </div>

        {showDropdown
          ? (
            <div className="absolute inset-x-0 top-[calc(100%+0.1rem)] z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-lg">
              <CommandList className="max-h-80">
                {loading
                  ? (
                    <div
                      className="px-4 py-6 text-sm text-muted-foreground"
                      data-testid="course-details-search-loading"
                    >
                      {tCommons('loading')}
                    </div>
                  )
                  : null}

                {error
                  ? (
                    <div
                      className="px-4 py-6 text-sm text-destructive"
                      data-testid="course-details-search-error"
                    >
                      {error}
                    </div>
                  )
                  : null}

                {!loading && !error && trimmedQuery && results.length === 0
                  ? (
                    <div
                      className="px-4 py-6 text-sm text-muted-foreground"
                      data-testid="course-details-search-empty"
                    >
                      {tPlanner('no-courses-found')}
                    </div>
                  )
                  : null}

                {!loading && !error && results.length > 0
                  ? (
                    <CommandGroup>
                      {results.map((course) => (
                        <CommandItem
                          key={course.id}
                          value={getCourseLabel(course)}
                          onMouseDown={(event) => {
                            event.preventDefault();
                          }}
                          onSelect={() => handleSelect(course)}
                          className="justify-between gap-4 px-4 py-3"
                          data-testid={`course-details-search-option-${course.id}`}
                        >
                          <div className="min-w-0">
                            <p className="font-medium">{course.code}</p>
                            <p className="truncate text-xs text-muted-foreground">{course.title}</p>
                          </div>
                          <Check
                            className={cn(
                              'size-4 shrink-0',
                              course.id === currentCourseId ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )
                  : null}
              </CommandList>
            </div>
          )
          : null}
      </Command>
    </div>
  );
};

export default CourseSearchSelect;
