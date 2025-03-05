'use client';

import { useProgramCoursesOperations } from '@/hooks/course/useProgramCoursesOperations';
import { COURSES_TAB_INDEX, FAVORITE_TAB_INDEX } from '@/utils/constants';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Typography } from '@mui/material';
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

  const renderCoursesContent = () => {
    if (displayedCourses.length > 0) {
      return (
        <div className="space-y-4">
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
      <Typography variant="body1" color="textSecondary" align="center">
        {message}
      </Typography>
    );
  };

  return (
    <aside
      className={`mt-4 flex w-auto flex-col rounded-lg border-2 border-buttonTags
            bg-courseSidebar p-4 md:fixed
            md:bottom-4 md:top-20
            md:mt-0 md:w-80
            md:overflow-y-auto
            md:bg-courseSidebar 
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
