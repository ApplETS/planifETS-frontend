'use client';

import { useProgramCoursesOperations } from '@/hooks/course/useProgramCoursesOperations';
import { COURSES_TAB_INDEX, FAVORITE_TAB_INDEX } from '@/utils/constants';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CourseCard from './CourseCard';
import SearchBar from './CourseSearchBar';

export default function CourseSidebar() {
  const t = useTranslations('PlannerPage');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(COURSES_TAB_INDEX);

  const { displayedCourses, hasSelectedPrograms } = useProgramCoursesOperations(
    searchQuery,
    activeTab,
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  function renderCoursesContent() {
    if (displayedCourses.length > 0) {
      return (
        <div className="flex flex-col gap-4 p-2">
          {displayedCourses.map(course => (
            <CourseCard
              key={course.code}
              course={course}
            />
          ))}
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
      </div>
    );
  };

  return (
    <aside
      className={`mt-4 flex w-auto flex-col rounded-lg border-2 border-primary
            bg-background p-4 md:fixed
            md:bottom-4 md:top-20
            md:mt-0 md:w-80
            md:overflow-y-auto
            md:bg-background 
           `}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        aria-label="Tabs for course list and favorites"
        selectionFollowsFocus
      >
        <Tab icon={<MenuBookIcon />} label={t('courses')} iconPosition="start" />
        <Tab icon={<FavoriteIcon />} label={t('favorite-courses')} iconPosition="start" />
      </Tabs>

      <SearchBar onSearch={handleSearch} />

      <div className="no-scrollbar mt-4 flex-1 overflow-y-auto">
        {renderCoursesContent()}
      </div>
    </aside>
  );
}
