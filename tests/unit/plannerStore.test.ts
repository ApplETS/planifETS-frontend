import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePlannerStore } from '@/store/plannerStore';
import { useSessionStore } from '@/store/sessionStore';
import { createSessionsForYear } from '@/utils/sessionUtil';

const { storage } = vi.hoisted(() => ({ storage: new Map<string, unknown>() }));

vi.mock('@/lib/localForageConfig', () => ({
  default: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: unknown) => storage.set(key, structuredClone(value)),
    removeItem: (key: string) => storage.delete(key),
  },
}));

const year = new Date().getFullYear();
const sessionKey = `H${year}`;

beforeEach(() => {
  usePlannerStore.setState(usePlannerStore.getInitialState());
  useSessionStore.setState(useSessionStore.getInitialState());
  storage.clear();
});

describe('multiple planners', () => {
  it('keeps legacy sessions and favorites in the default planner', async () => {
    const sessions = createSessionsForYear(year);
    sessions[sessionKey]!.courseInstances = [{ courseId: 42 }];
    storage.set('planner-store', {
      version: 1,
      state: { name: 'Default Planner', sessionKeys: Object.keys(sessions), favoriteCourses: [42] },
    });
    storage.set('session-store', { version: 1, state: { sessions } });

    await Promise.all([
      usePlannerStore.persist.rehydrate(),
      useSessionStore.persist.rehydrate(),
    ]);

    expect(usePlannerStore.getState().activePlannerId).toBe('default');

    usePlannerStore.getState().createPlanner('  Alternative  ', year);

    expect(usePlannerStore.getState().name).toBe('Alternative');
    expect(useSessionStore.getState().getSessionCourses(sessionKey)).toEqual([]);
    expect(usePlannerStore.getState().favoriteCourses).toEqual([]);

    usePlannerStore.getState().switchPlanner('default');

    expect(useSessionStore.getState().getSessionCourses(sessionKey)).toEqual([{ courseId: 42 }]);
    expect(usePlannerStore.getState().favoriteCourses).toEqual([42]);
  });

  it('isolates course edits and years across three planners, including after reload', async () => {
    usePlannerStore.getState().initializePlanner(year);
    useSessionStore.getState().addCourseToSession(sessionKey, 1);
    usePlannerStore.getState().createPlanner('Alternative', year);
    const alternativeId = usePlannerStore.getState().activePlannerId;
    useSessionStore.getState().addCourseToSession(sessionKey, 2);
    usePlannerStore.getState().toggleFavorite(2);
    usePlannerStore.getState().addYear();
    usePlannerStore.getState().createPlanner('Third plan', year);
    usePlannerStore.getState().deleteYear(year);

    usePlannerStore.getState().switchPlanner(alternativeId);

    expect(usePlannerStore.getState().getYears()).toEqual([year, year + 1]);
    expect(useSessionStore.getState().getSessionCourses(sessionKey)).toEqual([{ courseId: 2 }]);

    const saved = new Map(storage);
    usePlannerStore.setState(usePlannerStore.getInitialState());
    useSessionStore.setState(useSessionStore.getInitialState());
    saved.forEach((value, key) => storage.set(key, value));
    await Promise.all([
      usePlannerStore.persist.rehydrate(),
      useSessionStore.persist.rehydrate(),
    ]);

    expect(usePlannerStore.getState().activePlannerId).toBe(alternativeId);
    expect(usePlannerStore.getState().favoriteCourses).toEqual([2]);
    expect(useSessionStore.getState().getSessionCourses(sessionKey)).toEqual([{ courseId: 2 }]);

    useSessionStore.getState().removeCourseFromSession(sessionKey, 2);
    usePlannerStore.getState().switchPlanner('default');

    expect(usePlannerStore.getState().getYears()).toEqual([year]);
    expect(useSessionStore.getState().getSessionCourses(sessionKey)).toEqual([{ courseId: 1 }]);

    usePlannerStore.getState().switchPlanner(alternativeId);

    expect(useSessionStore.getState().getSessionCourses(sessionKey)).toEqual([]);
  });

  it('ignores invalid creation and switching without changing existing data', () => {
    usePlannerStore.getState().initializePlanner(year);
    const original = usePlannerStore.getState();
    usePlannerStore.getState().createPlanner(' ', year);
    usePlannerStore.getState().createPlanner('x'.repeat(81), year);
    usePlannerStore.getState().createPlanner('Invalid', Number.NaN);
    usePlannerStore.getState().createPlanner('Invalid', year + 0.5);
    usePlannerStore.getState().createPlanner('Invalid', year + 2);
    usePlannerStore.getState().switchPlanner('missing');
    usePlannerStore.getState().switchPlanner('__proto__');
    usePlannerStore.getState().switchPlanner('default');

    expect(usePlannerStore.getState()).toBe(original);
  });
});
