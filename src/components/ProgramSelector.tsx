'use client';

import type { Course } from '@/types/course';
import { Autocomplete, Chip, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { programCourses } from '@/data/program-courses';
import { useCourseStore } from '@/store/courseStore';
import { useProgramStore } from '@/store/programStore';
import { programs } from '../data/programs-data';

type Program = typeof programs[number];

const ProgramSelector: React.FC = () => {
  const t = useTranslations('PlannerPage');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const programStore = useProgramStore();
  const setCourses = useCourseStore(state => state.setCourses);

  const defaultPrograms = React.useMemo(() => {
    const selectedPrograms = programStore.getSelectedPrograms();
    return programs.filter(program => selectedPrograms.includes(program.key));
  }, [programStore]);

  const handleProgramChange = (_event: React.SyntheticEvent, values: Program[]) => {
    const programKeys = values.map(value => value.key);

    const coursesByCode: Record<string, Course> = {};

    programKeys.forEach((programId) => {
      if (programCourses[programId]) {
        programCourses[programId].forEach((course) => {
          if (course?.id && course?.code) {
            coursesByCode[course.code] = course;
          }
        });
      }
    });

    const allCourses = Object.values(coursesByCode);
    setCourses(allCourses);

    programStore.setSelectedPrograms(programKeys);
  };

  return (
    <Autocomplete
      multiple
      options={programs}
      sx={{ width: isMobile ? '100%' : 400 }}
      renderInput={params => (
        <TextField
          {...params}
          label={t('programs')}
          data-testid="programs-select"
        />
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.value}
            {...getTagProps({ index })}
            key={option.key}
            data-testid={`program-chip-${option.key}`}
          />
        ))}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <li
            key={key}
            {...otherProps}
            role="option"
            aria-selected={props['aria-selected']}
            tabIndex={0}
          >
            {option.value}
          </li>
        );
      }}
      onChange={handleProgramChange}
      value={defaultPrograms}
    />
  );
};

export default ProgramSelector;
