import { describe, expect, it } from 'vitest';
import { getCourseDetailsProgramState, getCourseDetailsVisibility } from '../../src/utils/courseDetailsUtil';

describe('getCourseDetailsProgramState', () => {
  it.each([
    {
      name: 'no selected course',
      options: { hasSelectedCourse: false, hasPrograms: false, hasLoadedPrograms: false, programsLoading: false, programsError: null },
      expected: { isProgramsLoading: false, showNoProgramsState: false, shouldRenderCourseSection: false },
    },
    {
      name: 'selected course awaiting the initial request',
      options: { hasSelectedCourse: true, hasPrograms: false, hasLoadedPrograms: false, programsLoading: false, programsError: null },
      expected: { isProgramsLoading: true, showNoProgramsState: false, shouldRenderCourseSection: false },
    },
    {
      name: 'request loading with previous program data',
      options: { hasSelectedCourse: true, hasPrograms: true, hasLoadedPrograms: true, programsLoading: true, programsError: null },
      expected: { isProgramsLoading: true, showNoProgramsState: false, shouldRenderCourseSection: false },
    },
    {
      name: 'programs loaded successfully',
      options: { hasSelectedCourse: true, hasPrograms: true, hasLoadedPrograms: true, programsLoading: false, programsError: null },
      expected: { isProgramsLoading: false, showNoProgramsState: false, shouldRenderCourseSection: true },
    },
    {
      name: 'successful request with no program links',
      options: { hasSelectedCourse: true, hasPrograms: false, hasLoadedPrograms: true, programsLoading: false, programsError: null },
      expected: { isProgramsLoading: false, showNoProgramsState: true, shouldRenderCourseSection: false },
    },
    {
      name: 'failed program request',
      options: { hasSelectedCourse: true, hasPrograms: false, hasLoadedPrograms: false, programsLoading: false, programsError: 'Request failed' },
      expected: { isProgramsLoading: false, showNoProgramsState: false, shouldRenderCourseSection: true },
    },
  ])('$name', ({ options, expected }) => {
    expect(getCourseDetailsProgramState(options)).toEqual(expected);
  });
});

describe('getCourseDetailsVisibility', () => {
  it('shows the empty state without a selected course', () => {
    expect(getCourseDetailsVisibility({
      hasSelectedCourse: false,
      showNoProgramsState: false,
      shouldRenderCourseSection: false,
      hasBasicCourse: false,
      basicCourseLoading: false,
    })).toEqual({ showEmptyState: true, showCourseSection: false });
  });

  it('shows neither section while programs are loading', () => {
    expect(getCourseDetailsVisibility({
      hasSelectedCourse: true,
      showNoProgramsState: false,
      shouldRenderCourseSection: false,
      hasBasicCourse: false,
      basicCourseLoading: false,
    })).toEqual({ showEmptyState: false, showCourseSection: false });
  });

  it('shows program-specific content when the course section is ready', () => {
    expect(getCourseDetailsVisibility({
      hasSelectedCourse: true,
      showNoProgramsState: false,
      shouldRenderCourseSection: true,
      hasBasicCourse: false,
      basicCourseLoading: false,
    })).toEqual({ showEmptyState: false, showCourseSection: true });
  });

  it.each([
    { hasBasicCourse: false, basicCourseLoading: false, showEmptyState: true, showCourseSection: false },
    { hasBasicCourse: false, basicCourseLoading: true, showEmptyState: false, showCourseSection: true },
    { hasBasicCourse: true, basicCourseLoading: false, showEmptyState: false, showCourseSection: true },
    { hasBasicCourse: true, basicCourseLoading: true, showEmptyState: false, showCourseSection: true },
  ])('handles an unlinked course: $hasBasicCourse / $basicCourseLoading', ({ hasBasicCourse, basicCourseLoading, showEmptyState, showCourseSection }) => {
    expect(getCourseDetailsVisibility({
      hasSelectedCourse: true,
      showNoProgramsState: true,
      shouldRenderCourseSection: false,
      hasBasicCourse,
      basicCourseLoading,
    })).toEqual({ showEmptyState, showCourseSection });
  });
});
