'use client';

import type { Course } from '@/types/course';
import { programCourses } from '@/data/program-courses';
import { useCourseStore } from '@/store/courseStore';
import { useProgramStore } from '@/store/programStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import SearchBar from './CourseSearchBar';

export default function CourseSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);

  const selectedProgram = useProgramStore(state => state.selectedProgram);
  const {
    setCourses,
    getAllCourses,
    getFavoriteCourses,
  } = useCourseStore();

  useEffect(() => {
    if (selectedProgram && programCourses[selectedProgram]) {
      const initialCourses = programCourses[selectedProgram].map(course => ({
        ...course,
      }));

      setCourses(initialCourses);
    }
  }, [selectedProgram, setCourses]);

  useEffect(() => {
    let coursesToDisplay = getAllCourses();

    if (activeTab === 1) {
      coursesToDisplay = getFavoriteCourses();
    }

    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      coursesToDisplay = coursesToDisplay.filter(
        course =>
          course.code.toLowerCase().includes(lowerQuery)
          || course.title.toLowerCase().includes(lowerQuery),
      );
    }

    setDisplayedCourses(coursesToDisplay);
  }, [searchQuery, activeTab, getAllCourses, getFavoriteCourses]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
      data-testid="course-sidebar"
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
        <Tab icon={<MenuBookIcon />} label="Cours" iconPosition="start" />
        <Tab icon={<FavoriteIcon />} label="Favoris" iconPosition="start" />
      </Tabs>

      <SearchBar onSearch={handleSearch} />

      <div className="no-scrollbar mt-4 flex-1 overflow-y-auto">
        {displayedCourses.length === 0
          ? (
            <Typography variant="body1" color="textSecondary" align="center">
              {activeTab === 1
                ? 'Vous n\'avez aucun favori.'
                : selectedProgram
                  ? 'Aucun cours disponible pour ce programme.'
                  : 'Veuillez sélectionner un programme.'}
            </Typography>
          )
          : (
            <div className="space-y-4">
              {displayedCourses.map(course => (
                <CourseCard
                  key={course.code}
                  course={course}
                />
              ))}
            </div>
          )}
      </div>
    </aside>
  );
}
