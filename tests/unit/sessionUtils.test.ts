import type { Course, CourseInstance } from '@/types/course';
import type { Session } from '@/types/session';
import { describe, expect, it } from 'vitest';
import { SessionEnum } from '@/types/session';
import {
  compareSessions,
  createSessionsForYear,
  extractYearFromSessionKey,
  filterCurrentAndFutureSessions,
  formatSessionShort,
  generateSessionCode,
  generateSessionKey,
  generateSessionRange,
  getCurrentSession,
  getSessionTiming,
  getTranslationKey,
  hasCourseInSession,
  isCourseAvailableInSession,
  setSessionKnownAvailability,
  sortSessionsChronologically,
  trimesterToSessionTerm,
  updateMultipleSessions,
  updateSessionCourseInstances,
} from '@/utils/sessionUtils';

describe('sessionUtils', () => {
  describe('generateSessionKey', () => {
    it('should generate correct session key', () => {
      expect(generateSessionKey(2025, SessionEnum.A)).toBe('A2025');
      expect(generateSessionKey(2024, SessionEnum.H)).toBe('H2024');
    });

    it('should return empty string for invalid parameters', () => {
      expect(generateSessionKey(0, SessionEnum.A)).toBe('');
      expect(generateSessionKey(2025, '' as SessionEnum)).toBe('');
    });
  });

  describe('sortSessionsChronologically', () => {
    it('should sort sessions by year then term', () => {
      const sessions = ['A2025', 'H2024', 'E2025', 'H2025'];
      const sorted = sortSessionsChronologically(sessions);

      expect(sorted).toEqual(['H2024', 'H2025', 'E2025', 'A2025']);
    });

    it('should handle empty array', () => {
      expect(sortSessionsChronologically([])).toEqual([]);
    });

    it('should handle single session', () => {
      expect(sortSessionsChronologically(['A2025'])).toEqual(['A2025']);
    });

    it('should handle invalid session codes', () => {
      const sessions = ['A2025', 'invalid', 'H2024'];
      const sorted = sortSessionsChronologically(sessions);

      expect(sorted).toEqual(['A2025', 'invalid', 'H2024']);
    });
  });

  describe('formatSessionShort', () => {
    it('should format session to short form', () => {
      expect(formatSessionShort('A2025')).toBe('A25');
      expect(formatSessionShort('H2024')).toBe('H24');
    });

    it('should return unchanged for invalid format', () => {
      expect(formatSessionShort('invalid')).toBe('invalid');
      expect(formatSessionShort('')).toBe('');
      expect(formatSessionShort('A')).toBe('A');
      expect(formatSessionShort('A123')).toBe('A123');
    });
  });

  describe('setSessionKnownAvailability', () => {
    it('should set isKnownSessionAvailability to true', () => {
      const sessions: Record<string, Session> = {
        A2025: { key: 'A2025', sessionTerm: SessionEnum.A, sessionYear: 2025, courseInstances: [], isKnownSessionAvailability: false },
      };
      const result = setSessionKnownAvailability(sessions, 'A2025', true);

      expect(result.A2025).toBeDefined();
      expect(result.A2025!.isKnownSessionAvailability).toBe(true);
    });

    it('should set isKnownSessionAvailability to false', () => {
      const sessions: Record<string, Session> = {
        A2025: { key: 'A2025', sessionTerm: SessionEnum.A, sessionYear: 2025, courseInstances: [], isKnownSessionAvailability: true },
      };
      const result = setSessionKnownAvailability(sessions, 'A2025', false);

      expect(result.A2025).toBeDefined();
      expect(result.A2025!.isKnownSessionAvailability).toBe(false);
    });

    it('should return unchanged if session does not exist', () => {
      const sessions: Record<string, Session> = {};
      const result = setSessionKnownAvailability(sessions, 'A2025', true);

      expect(result).toEqual({});
    });
  });

  describe('generateSessionCode', () => {
    it('should generate correct session code', () => {
      expect(generateSessionCode(SessionEnum.A, 2025)).toBe('A2025');
      expect(generateSessionCode(SessionEnum.H, 2024)).toBe('H2024');
    });
  });

  describe('getCurrentSession', () => {
    it('should return H for winter months (0-3)', () => {
      expect(getCurrentSession(0)).toBe(SessionEnum.H); // Jan
      expect(getCurrentSession(3)).toBe(SessionEnum.H); // Apr
    });

    it('should return E for summer months (4-7)', () => {
      expect(getCurrentSession(4)).toBe(SessionEnum.E); // May
      expect(getCurrentSession(7)).toBe(SessionEnum.E); // Aug
    });

    it('should return A for fall months (8-11)', () => {
      expect(getCurrentSession(8)).toBe(SessionEnum.A); // Sep
      expect(getCurrentSession(11)).toBe(SessionEnum.A); // Dec
    });

    it('should default to current month', () => {
      // Assuming current date is Feb 2026, month 1, should be H
      expect(getCurrentSession()).toBe(SessionEnum.H);
    });
  });

  describe('getSessionTiming', () => {
    it('should identify past session', () => {
      const timing = getSessionTiming(2025, SessionEnum.A);

      expect(timing.isPast).toBe(true);
      expect(timing.isCurrent).toBe(false);
      expect(timing.isFuture).toBe(false);
    });

    it('should identify current session', () => {
      const timing = getSessionTiming(2026, SessionEnum.H);

      expect(timing.isPast).toBe(false);
      expect(timing.isCurrent).toBe(true);
      expect(timing.isFuture).toBe(false);
    });

    it('should identify future session', () => {
      const timing = getSessionTiming(2026, SessionEnum.A);

      expect(timing.isPast).toBe(false);
      expect(timing.isCurrent).toBe(false);
      expect(timing.isFuture).toBe(true);
    });
  });

  describe('filterCurrentAndFutureSessions', () => {
    it('should filter current and future sessions', () => {
      const sessions = ['H2025', 'A2025', 'H2026', 'E2026', 'A2026'];
      const filtered = filterCurrentAndFutureSessions(sessions);

      expect(filtered).toEqual(['H2026', 'E2026', 'A2026']);
    });

    it('should handle invalid session codes', () => {
      const sessions = ['invalid', 'A2026', 'H2025'];
      const filtered = filterCurrentAndFutureSessions(sessions);

      expect(filtered).toEqual(['A2026']);
    });

    it('should handle empty array', () => {
      expect(filterCurrentAndFutureSessions([])).toEqual([]);
    });
  });

  describe('isCourseAvailableInSession', () => {
    const mockCourse: Course = {
      id: 1,
      code: 'TEST101',
      title: 'Test Course',
      credits: 3,
      prerequisites: [],
      availability: ['A2025', 'H2026'],
    };

    const findCourse = (id: number) => id === 1 ? mockCourse : undefined;

    it('should return true if course is available', () => {
      expect(isCourseAvailableInSession(1, SessionEnum.A, 2025, findCourse)).toBe(true);
    });

    it('should return false if course is not available', () => {
      expect(isCourseAvailableInSession(1, SessionEnum.H, 2025, findCourse)).toBe(false);
    });

    it('should return false if course not found', () => {
      expect(isCourseAvailableInSession(2, SessionEnum.A, 2025, findCourse)).toBe(false);
    });
  });

  describe('generateSessionRange', () => {
    it('should generate session range from start to end', () => {
      const range = generateSessionRange(2025, SessionEnum.E, 2026);

      expect(range).toEqual(['E2025', 'A2025', 'H2026', 'E2026', 'A2026']);
    });

    it('should handle same year', () => {
      const range = generateSessionRange(2025, SessionEnum.H, 2025);

      expect(range).toEqual(['H2025', 'E2025', 'A2025']);
    });

    it('should handle start term in middle', () => {
      const range = generateSessionRange(2025, SessionEnum.A, 2025);

      expect(range).toEqual(['A2025']);
    });
  });

  describe('extractYearFromSessionKey', () => {
    it('should extract year from valid session key', () => {
      expect(extractYearFromSessionKey('A2025')).toBe(2025);
      expect(extractYearFromSessionKey('H2024')).toBe(2024);
    });

    it('should throw error for invalid session key', () => {
      expect(() => extractYearFromSessionKey('A')).toThrow('Invalid session key format: A');
    });

    it('should return NaN for non-numeric year', () => {
      expect(extractYearFromSessionKey('invalid')).toBe(Number.NaN);
    });
  });

  describe('getTranslationKey', () => {
    it('should return correct translation key', () => {
      expect(getTranslationKey(SessionEnum.A)).toBe('sessionTerms.AUTOMNE');
      expect(getTranslationKey(SessionEnum.H)).toBe('sessionTerms.HIVER');
      expect(getTranslationKey(SessionEnum.E)).toBe('sessionTerms.ETE');
    });

    it('should return unchanged for invalid term', () => {
      expect(getTranslationKey('invalid')).toBe('invalid');
    });
  });

  describe('createSessionsForYear', () => {
    it('should create sessions for a year', () => {
      const sessions = createSessionsForYear(2025);

      expect(Object.keys(sessions)).toEqual(['H2025', 'E2025', 'A2025']);
      expect(sessions.H2025).toBeDefined();
      expect(sessions.H2025!.sessionTerm).toBe(SessionEnum.H);
      expect(sessions.H2025!.sessionYear).toBe(2025);
      expect(sessions.H2025!.courseInstances).toEqual([]);
      expect(sessions.H2025!.isKnownSessionAvailability).toBe(false);
    });
  });

  describe('updateSessionCourseInstances', () => {
    it('should update course instances for a session', () => {
      const sessions: Record<string, Session> = {
        A2025: { key: 'A2025', sessionTerm: SessionEnum.A, sessionYear: 2025, courseInstances: [], isKnownSessionAvailability: false },
      };
      const instances: CourseInstance[] = [{ courseId: 1 }];
      const result = updateSessionCourseInstances(sessions, 'A2025', instances);

      expect(result.A2025).toBeDefined();
      expect(result.A2025!.courseInstances).toEqual(instances);
    });

    it('should return unchanged if session does not exist', () => {
      const sessions: Record<string, Session> = {};
      const result = updateSessionCourseInstances(sessions, 'A2025', []);

      expect(result).toEqual({});
    });
  });

  describe('updateMultipleSessions', () => {
    it('should update multiple sessions', () => {
      const sessions: Record<string, Session> = {
        A2025: { key: 'A2025', sessionTerm: SessionEnum.A, sessionYear: 2025, courseInstances: [], isKnownSessionAvailability: false },
        H2025: { key: 'H2025', sessionTerm: SessionEnum.H, sessionYear: 2025, courseInstances: [], isKnownSessionAvailability: false },
      };
      const updates = [
        { sessionKey: 'A2025', courseInstances: [{ courseId: 1 }] },
        { sessionKey: 'H2025', courseInstances: [{ courseId: 2 }] },
      ];
      const result = updateMultipleSessions(sessions, updates);

      expect(result.A2025).toBeDefined();
      expect(result.A2025!.courseInstances).toEqual(updates[0]!.courseInstances);
      expect(result.H2025).toBeDefined();
      expect(result.H2025!.courseInstances).toEqual(updates[1]!.courseInstances);
    });
  });

  describe('hasCourseInSession', () => {
    const session: Session = {
      key: 'A2025',
      sessionTerm: SessionEnum.A,
      sessionYear: 2025,
      courseInstances: [{ courseId: 1 }, { courseId: 2 }],
      isKnownSessionAvailability: false,
    };

    it('should return true if course is in session', () => {
      expect(hasCourseInSession(session, 1)).toBe(true);
    });

    it('should return false if course is not in session', () => {
      expect(hasCourseInSession(session, 3)).toBe(false);
    });
  });

  describe('compareSessions', () => {
    it('should compare sessions correctly', () => {
      expect(compareSessions(2025, SessionEnum.H, 2025, SessionEnum.E)).toBe(-1);
      expect(compareSessions(2025, SessionEnum.A, 2025, SessionEnum.A)).toBe(0);
      expect(compareSessions(2026, SessionEnum.H, 2025, SessionEnum.A)).toBe(1);
    });
  });

  describe('trimesterToSessionTerm', () => {
    it('should map trimester to session term', () => {
      expect(trimesterToSessionTerm('HIVER')).toBe(SessionEnum.H);
      expect(trimesterToSessionTerm('ETE')).toBe(SessionEnum.E);
      expect(trimesterToSessionTerm('AUTOMNE')).toBe(SessionEnum.A);
    });

    it('should return undefined for invalid trimester', () => {
      expect(trimesterToSessionTerm('invalid')).toBeUndefined();
      expect(trimesterToSessionTerm('')).toBeUndefined();
    });
  });
});
