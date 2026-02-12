'use client';

import type {
  ProgramCourseDetailedDto,
  ProgramCoursesDto,
  ProgramDto,
} from '@/api/types/program';
import type { Course } from '@/types/course';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { useProgramsApi } from '@/api/hooks/useProgramsApi';
import { MultiSelect } from '@/components/atoms/multi-select';
import { useProgramCoursesApi } from '@/hooks/course/useProgramCoursesApi';
import { useCourseStore } from '@/store/courseStore';
import { usePlannerStore } from '@/store/plannerStore';
import { useProgramStore } from '@/store/programStore';
import { mapApiCourseToAppCourse } from '@/utils/courseUtils';

const ProgramSelector: React.FC = () => {
  const t = useTranslations('PlannerPage');

  const programStore = useProgramStore();
  const setCourses = useCourseStore((state) => state.setCourses);
  const selectedProgramIds = programStore.getSelectedProgramIds();

  const { data: programsData } = useProgramsApi();
  const { data: programCoursesData } = useProgramCoursesApi(selectedProgramIds);
  const programs = React.useMemo(() => programsData || [], [programsData]);

  // Update courses in store when program courses data changes
  React.useEffect(() => {
    if (programCoursesData?.data) {
      // Get current state from stores
      const currentCourses = useCourseStore.getState().courses;
      const favoriteCourseIds = usePlannerStore.getState().favoriteCourses;

      const coursesByCode = new Map<string, Course>();

      programCoursesData.data.forEach((programCourses: ProgramCoursesDto) => {
        programCourses.courses.forEach((course: ProgramCourseDetailedDto) => {
          const mappedCourse = mapApiCourseToAppCourse(course);
          if (mappedCourse) {
            coursesByCode.set(mappedCourse.code, mappedCourse);
          }
        });
      });

      // Preserve favorite courses that aren't in the new data
      const existingFavorites = Object.values(currentCourses).filter(
        (course) =>
          favoriteCourseIds.includes(course.id) && !coursesByCode.has(course.code),
      );

      existingFavorites.forEach((course) => {
        coursesByCode.set(course.code, course);
      });

      const allCourses = Array.from(coursesByCode.values());
      setCourses(allCourses);
    }
  }, [programCoursesData, setCourses]);

  // Convert programs to options format and sort alphabetically
  const options = React.useMemo(
    () =>
      programs
        .map((program: ProgramDto) => ({
          value: program.id,
          label: program.title || program.code,
          id: program.id,
        }))
        .sort((a, b) =>
          a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }),
        ),
    [programs],
  );

  // Convert selected codes to selected options
  const selectedOptions = React.useMemo(
    () => options.filter((option) => selectedProgramIds.includes(option.id)),
    [options, selectedProgramIds],
  );

  const handleProgramChange = (
    newSelected: Array<{ value: number; label: string; id: number }>,
  ) => {
    const ids = newSelected.map((item) => item.id);
    programStore.setSelectedPrograms(ids);
  };

  return (
    <div data-testid="programs-select" className="min-w-[400px]">
      <MultiSelect
        options={options}
        selected={selectedOptions}
        onChangeAction={handleProgramChange}
        placeholder={t('programs')}
      />
    </div>
  );
};

export default ProgramSelector;
