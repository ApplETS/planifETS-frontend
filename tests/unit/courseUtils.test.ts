import type { ProgramCourseDetailedDto, SearchCourseResult } from '@/api/types';
import type { Course } from '@/types/course';
import type { YearData } from '@/types/planner';
import type { SessionTiming } from '@/types/session';
import { describe, expect, it } from 'vitest';
import { TermEnum } from '@/types/session';
import {
  addCourseToSession,
  determineStatus,
  getDisplayedPrerequisites,
  mapApiCourseToAppCourse,
  moveCourseToSession,
  removeCourseFromSession,
} from '@/utils/courseUtils';

describe('courseUtils', () => {
  describe('mapApiCourseToAppCourse', () => {
    const mockApiCourse: ProgramCourseDetailedDto = {
      id: 1,
      code: 'TEST101',
      title: 'Test Course',
      credits: 3,
      cycle: 1,
      sessionAvailability: [{ sessionCode: 'A2025', availability: ['JOUR'] }],
      prerequisites: [{ code: 'PRE101', title: 'Prerequisite', credits: 3 }],
      type: 'TRONC',
      typicalSessionIndex: 1,
      unstructuredPrerequisite: null,
    };

    const mockSearchCourse: SearchCourseResult = {
      id: 2,
      code: 'SEARCH101',
      title: 'Search Course',
      credits: 4,
      cycle: 2,
      sessionAvailability: [{ sessionCode: 'H2025', availability: ['SOIR'] }],
      prerequisites: [],
      type: 'CONCE',
      typicalSessionIndex: 2,
      unstructuredPrerequisite: 'None',
    };

    it('should map ProgramCourseDetailedDto to Course', () => {
      const result = mapApiCourseToAppCourse(mockApiCourse);

      expect(result).toEqual({
        id: 1,
        code: 'TEST101',
        title: 'Test Course',
        credits: 3,
        prerequisites: ['PRE101'],
        availability: ['A2025'],
        type: 'TRONC',
        typicalSessionIndex: 1,
        unstructuredPrerequisite: undefined,
      });
    });

    it('should map SearchCourseResult to Course', () => {
      const result = mapApiCourseToAppCourse(mockSearchCourse);

      expect(result).toEqual({
        id: 2,
        code: 'SEARCH101',
        title: 'Search Course',
        credits: 4,
        prerequisites: [],
        availability: ['H2025'],
        type: 'CONCE',
        typicalSessionIndex: 2,
        unstructuredPrerequisite: 'None',
      });
    });

    it('should return null for invalid course (no code)', () => {
      const invalidCourse = { ...mockApiCourse, code: '' };
      const result = mapApiCourseToAppCourse(invalidCourse);

      expect(result).toBeNull();
    });

    it('should return null for invalid course (no id)', () => {
      const invalidCourse = { ...mockApiCourse, id: undefined } as any;
      const result = mapApiCourseToAppCourse(invalidCourse);

      expect(result).toBeNull();
    });

    it('should return null for null input', () => {
      const result = mapApiCourseToAppCourse(null as any);

      expect(result).toBeNull();
    });
  });

  describe('getDisplayedPrerequisites', () => {
    it('returns structured prerequisites when available', () => {
      const course: Course = {
        id: 1,
        code: 'C1',
        title: 'Course 1',
        credits: 0,
        prerequisites: ['chat', 'chaton'],
        availability: [],
        unstructuredPrerequisite: 'should not be used',
        type: 'CONCE',
        typicalSessionIndex: 0,
      };

      expect(getDisplayedPrerequisites(course)).toEqual(['chat', 'chaton']);
    });

    it('prioritizes unstructuredPrerequisite when no structured prerequisites', () => {
      const course: Course = {
        id: 2,
        code: 'C2',
        title: 'Course 2',
        credits: 0,
        prerequisites: [],
        availability: [],
        unstructuredPrerequisite: 'chevre1 et chevre2',
        type: 'TRONC',
        typicalSessionIndex: 0,
      };

      expect(getDisplayedPrerequisites(course)).toEqual(['chevre1 et chevre2']);
    });

    it('returns N/A when neither structured nor unstructured prerequisites exist', () => {
      const course: Course = {
        id: 3,
        code: 'C3',
        title: 'Course 3',
        credits: 0,
        prerequisites: [],
        availability: [],
        unstructuredPrerequisite: undefined,
        type: 'CONCE',
        typicalSessionIndex: 0,
      };

      expect(getDisplayedPrerequisites(course)).toEqual(['N/A']);
    });
  });

  describe('determineStatus', () => {
    const pastTiming: SessionTiming = { isPast: true, isCurrent: false, isFuture: false };
    const currentTiming: SessionTiming = { isPast: false, isCurrent: true, isFuture: false };
    const futureTiming: SessionTiming = { isPast: false, isCurrent: false, isFuture: true };

    it('should return Completed for past sessions', () => {
      const result = determineStatus({ sessionTiming: pastTiming });

      expect(result).toBe('Completed');
    });

    it('should return Planned for future sessions with unknown availability', () => {
      const result = determineStatus({ sessionTiming: futureTiming, isKnownAvailability: false });

      expect(result).toBe('Planned');
    });

    it('should return Offered for future sessions with known availability and course available', () => {
      const result = determineStatus({
        sessionTiming: futureTiming,
        isKnownAvailability: true,
        isCourseAvailable: true,
      });

      expect(result).toBe('Offered');
    });

    it('should return Not Offered for future sessions with known availability but course not available', () => {
      const result = determineStatus({
        sessionTiming: futureTiming,
        isKnownAvailability: true,
        isCourseAvailable: false,
      });

      expect(result).toBe('Not Offered');
    });

    it('should return Planned for current sessions with unknown availability', () => {
      const result = determineStatus({ sessionTiming: currentTiming, isKnownAvailability: false });

      expect(result).toBe('Planned');
    });

    it('should return Offered for current sessions with known availability and course available', () => {
      const result = determineStatus({
        sessionTiming: currentTiming,
        isKnownAvailability: true,
        isCourseAvailable: true,
      });

      expect(result).toBe('Offered');
    });

    it('should return Not Offered for current sessions with known availability but course not available', () => {
      const result = determineStatus({
        sessionTiming: currentTiming,
        isKnownAvailability: true,
        isCourseAvailable: false,
      });

      expect(result).toBe('Not Offered');
    });

    it('should default isKnownAvailability to false', () => {
      const result = determineStatus({ sessionTiming: futureTiming });

      expect(result).toBe('Planned');
    });

    it('should default isCourseAvailable to true', () => {
      const result = determineStatus({
        sessionTiming: futureTiming,
        isKnownAvailability: true,
      });

      expect(result).toBe('Offered');
    });
  });

  describe('addCourseToSession', () => {
    const mockYearData: YearData = {
      year: 2025,
      sessions: [
        {
          key: 'H2025',
          sessionTerm: TermEnum.H,
          sessionYear: 2025,
          courseInstances: [],
          isKnownSessionAvailability: false,
        },
        {
          key: 'E2025',
          sessionTerm: TermEnum.E,
          sessionYear: 2025,
          courseInstances: [{ courseId: 1 }],
          isKnownSessionAvailability: false,
        },
      ],
    };

    it('should add course to session if not already present', () => {
      const result = addCourseToSession(mockYearData, TermEnum.H, 2);

      expect(result.sessions[0]!.courseInstances).toEqual([{ courseId: 2 }]);
      expect(result.sessions[1]!.courseInstances).toEqual([{ courseId: 1 }]);
    });

    it('should not add course if already present in session', () => {
      const result = addCourseToSession(mockYearData, TermEnum.E, 1);

      expect(result.sessions[1]!.courseInstances).toEqual([{ courseId: 1 }]);
    });

    it('should not modify other sessions', () => {
      const result = addCourseToSession(mockYearData, TermEnum.H, 2);

      expect(result.sessions[1]!.courseInstances).toEqual([{ courseId: 1 }]);
    });
  });

  describe('removeCourseFromSession', () => {
    const mockYearData: YearData = {
      year: 2025,
      sessions: [
        {
          key: 'H2025',
          sessionTerm: TermEnum.H,
          sessionYear: 2025,
          courseInstances: [{ courseId: 1 }, { courseId: 2 }],
          isKnownSessionAvailability: false,
        },
        {
          key: 'E2025',
          sessionTerm: TermEnum.E,
          sessionYear: 2025,
          courseInstances: [{ courseId: 3 }],
          isKnownSessionAvailability: false,
        },
      ],
    };

    it('should remove course from session if present', () => {
      const result = removeCourseFromSession(mockYearData, TermEnum.H, 1);

      expect(result.sessions[0]!.courseInstances).toEqual([{ courseId: 2 }]);
      expect(result.sessions[1]!.courseInstances).toEqual([{ courseId: 3 }]);
    });

    it('should not modify session if course not present', () => {
      const result = removeCourseFromSession(mockYearData, TermEnum.H, 99);

      expect(result.sessions[0]!.courseInstances).toEqual([{ courseId: 1 }, { courseId: 2 }]);
    });

    it('should not modify other sessions', () => {
      const result = removeCourseFromSession(mockYearData, TermEnum.H, 1);

      expect(result.sessions[1]!.courseInstances).toEqual([{ courseId: 3 }]);
    });
  });

  describe('moveCourseToSession', () => {
    const mockYearData: YearData = {
      year: 2025,
      sessions: [
        {
          key: 'H2025',
          sessionTerm: TermEnum.H,
          sessionYear: 2025,
          courseInstances: [{ courseId: 1 }, { courseId: 2 }],
          isKnownSessionAvailability: false,
        },
        {
          key: 'E2025',
          sessionTerm: TermEnum.E,
          sessionYear: 2025,
          courseInstances: [{ courseId: 3 }],
          isKnownSessionAvailability: false,
        },
        {
          key: 'A2025',
          sessionTerm: TermEnum.A,
          sessionYear: 2025,
          courseInstances: [],
          isKnownSessionAvailability: false,
        },
      ],
    };

    it('should move course from one session to another', () => {
      const result = moveCourseToSession(mockYearData, TermEnum.H, TermEnum.A, 1);

      expect(result.sessions[0]!.courseInstances).toEqual([{ courseId: 2 }]);
      expect(result.sessions[2]!.courseInstances).toEqual([{ courseId: 1 }]);
      expect(result.sessions[1]!.courseInstances).toEqual([{ courseId: 3 }]);
    });

    it('should not move if course not in from session', () => {
      const result = moveCourseToSession(mockYearData, TermEnum.H, TermEnum.A, 99);

      expect(result.sessions[0]!.courseInstances).toEqual([{ courseId: 1 }, { courseId: 2 }]);
      expect(result.sessions[2]!.courseInstances).toEqual([]);
    });

    it('should handle moving to same session (no-op)', () => {
      const result = moveCourseToSession(mockYearData, TermEnum.H, TermEnum.H, 1);

      expect(result.sessions[0]!.courseInstances).toEqual([{ courseId: 1 }, { courseId: 2 }]);
    });
  });
});
