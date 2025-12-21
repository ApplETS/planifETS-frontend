'use client';

import { Book, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useGlobalCourseSearch } from '@/hooks/course/useGlobalCourseSearch';
import { useProgramCoursesOperations } from '@/hooks/course/useProgramCoursesOperations';
import { Tabs, TabsList, TabsTrigger } from '@/shadcn/ui/custom/tabs1';
import { ScrollArea } from '@/shadcn/ui/scroll-area';
import { COURSES_TAB_INDEX, FAVORITE_TAB_INDEX } from '@/utils/constants';
import CourseCard from './CourseCard';
import SearchBar from './CourseSearchBar';
import GlobalSearchLink from './GlobalSearchLink';

export default function CourseSidebar() {
  const t = useTranslations('PlannerPage');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(COURSES_TAB_INDEX);

  const { displayedCourses: localCourses, hasSelectedPrograms } = useProgramCoursesOperations(
    searchQuery,
    activeTab,
  );

  const {
    courses: globalCourses,
    loading: globalLoading,
    isGlobalSearchActive,
    triggerSearch,
    clearSearch,
  } = useGlobalCourseSearch();

  // Auto-clear global search when search query changes
  useEffect(() => {
    if (isGlobalSearchActive) {
      clearSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Auto-clear global search when switching to favorites
  useEffect(() => {
    if (activeTab === FAVORITE_TAB_INDEX && isGlobalSearchActive) {
      clearSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const displayedCourses = isGlobalSearchActive ? globalCourses : localCourses;

  const showGlobalSearchLink
      = searchQuery.trim() !== ''
        && activeTab === COURSES_TAB_INDEX
        && !isGlobalSearchActive;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleGlobalSearch = () => {
    triggerSearch(searchQuery);
  };

  function renderCoursesContent() {
    // Show loading state during global search
    if (globalLoading) {
      return (
        <div className="text-center text-gray-500">
          {t('searching-all-programs')}
        </div>
      );
    }

    // Show empty global search results message
    if (isGlobalSearchActive && displayedCourses.length === 0) {
      return (
        <div className="text-center text-gray-500">
          {t('no-courses-found-global')}
        </div>
      );
    }

    if (displayedCourses.length > 0) {
      return (
        <div className="flex flex-col gap-4 pl-1">
          {displayedCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
          {showGlobalSearchLink && (
            <GlobalSearchLink onClickAction={handleGlobalSearch} className="py-4" />
          )}
        </div>
      );
    }

    let message = t('loading-courses');
    if (activeTab === FAVORITE_TAB_INDEX) {
      message = t('no-favorite-courses');
    } else if (hasSelectedPrograms !== undefined) {
      message = hasSelectedPrograms
        ? t('no-courses-found')
        : t('select-program');
    }

    return (
      <div className="text-center text-gray-500">
        {message}
        {showGlobalSearchLink && (
          <GlobalSearchLink onClickAction={handleGlobalSearch} className="mt-4" />
        )}
      </div>
    );
  };

  return (
    <aside
      className={`mt-4 flex w-auto flex-col rounded-lg border-2 border-primary
            bg-secondary p-3 md:fixed
            md:bottom-4 md:top-20
            md:mt-0 md:w-80
           `}
    >
      <Tabs value={activeTab === COURSES_TAB_INDEX ? 'courses' : 'favorites'} onValueChange={val => setActiveTab(val === 'courses' ? COURSES_TAB_INDEX : FAVORITE_TAB_INDEX)}>
        <TabsList>
          <TabsTrigger value="courses">
            <Book size={18} />
            {t('courses')}
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart size={18} />
            {t('favorite-courses')}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <SearchBar onSearch={handleSearch} />

      <div className="mt-4 flex-1 min-h-0 max-h-[600px] md:max-h-none overflow-hidden">
        <ScrollArea className="h-full rounded-md">
          {renderCoursesContent()}
        </ScrollArea>
      </div>
    </aside>
  );
}
