'use client';

import type { Course } from '@/context/planner/types/Course';
import { programCourses } from '@/data/program-courses';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { LISTE_COURS_LABEL } from '../../constants';
import { useProgramStore } from '../../store/programStore';
import CourseCard from './CourseCard';
import SearchBar from './CourseSearchBar';

let allCourses: Course[] = [];

const getEmptyStateMessage = (activeTab: number, selectedProgram: string | null): string => {
  if (activeTab === 1) {
    return 'Vous n\'avez aucun favori.';
  }

  return selectedProgram
    ? 'Aucun cours disponible pour ce programme.'
    : 'Veuillez sélectionner un programme.';
};

export default function CourseSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const selectedProgram = useProgramStore(state => state.selectedProgram);

  useEffect(() => {
    // Update allCourses when selectedProgram changes
    if (selectedProgram && programCourses[selectedProgram]) {
      // Get saved favorites from localStorage
      const savedFavorites = localStorage.getItem('favoriteCourses');
      const favoritedCourses = savedFavorites ? JSON.parse(savedFavorites) : [];

      // Update allCourses with saved favorites and default status
      allCourses = programCourses[selectedProgram].map(course => ({
        ...course,
        isFavorited: favoritedCourses.includes(course.code),
        status: 'Planned' as const, // Set default status for all courses
      }));
    } else {
      allCourses = [];
    }

    // Update displayed courses
    let coursesToDisplay = allCourses;

    if (activeTab === 1) {
      coursesToDisplay = allCourses.filter(course => course.isFavorited);
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
  }, [selectedProgram, searchQuery, activeTab]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleToggleFavorite = (courseCode: string) => {
    const updatedCourses = allCourses.map(course =>
      course.code === courseCode
        ? { ...course, isFavorited: !course.isFavorited }
        : course,
    );

    allCourses = updatedCourses;

    // Save favorites to localStorage
    const favoritedCourses = updatedCourses
      .filter(course => course.isFavorited)
      .map(course => course.code);
    localStorage.setItem('favoriteCourses', JSON.stringify(favoritedCourses));

    // Update displayed courses
    let coursesToDisplay = updatedCourses;
    if (activeTab === 1) {
      coursesToDisplay = updatedCourses.filter(course => course.isFavorited);
    }
    setDisplayedCourses(coursesToDisplay);
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
        <Tab icon={<MenuBookIcon />} label={LISTE_COURS_LABEL} iconPosition="start" />
        <Tab icon={<FavoriteIcon />} label="Favoris" iconPosition="start" />
      </Tabs>

      <SearchBar onSearch={handleSearch} />

      <div className="no-scrollbar mt-4 flex-1 overflow-y-auto">
        {displayedCourses.length === 0
          ? (
            <Typography variant="body1" color="textSecondary" align="center">
              {getEmptyStateMessage(activeTab, selectedProgram)}
            </Typography>
          )
          : (
            <div className="space-y-4">
              {displayedCourses.map(course => (
                <CourseCard
                  key={course.code}
                  course={course}
                  onToggleFavorite={() => handleToggleFavorite(course.code)}
                />
              ))}
            </div>
          )}
      </div>
    </aside>
  );
}
