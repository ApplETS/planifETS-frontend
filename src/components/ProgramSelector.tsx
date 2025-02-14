'use client';

import { useProgramStore } from '@/store/programStore';
import { Autocomplete, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { programs } from '../data/programs-data';

const ProgramSelector: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const selectedProgram = useProgramStore(state => state.selectedProgram);
  const setSelectedProgram = useProgramStore(state => state.setSelectedProgram);

  const defaultProgram = programs.find(program => program.key === selectedProgram) || null;

  return (
    <Autocomplete
      options={programs}
      sx={{ width: isMobile ? '100%' : 400 }}
      renderInput={params => (
        <TextField
          {...params}
          label="Programme"
          data-testid="program-select"
        />
      )}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <li
            key={key}
            {...otherProps}
            data-testid={`program-option-${option.key}`}
            role="option"
            aria-selected={props['aria-selected']}
            tabIndex={0}
          >
            {option.value}
          </li>
        );
      }}
      onChange={(_event, value) => {
        setSelectedProgram(value?.key || null);
      }}
      value={defaultProgram}
    />
  );
};

export default ProgramSelector;
