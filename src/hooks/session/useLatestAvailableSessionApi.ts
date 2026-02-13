import { useEffect } from 'react';
import { useApi } from '@/api/hooks/useApi';
import { sessionService } from '@/api/services/session.service';
import { useSessionStore } from '@/store/sessionStore';
import { compareSessions, ORDERED_SESSION_TERMS, trimesterToSessionTerm } from '@/utils/sessionUtils';

export function useLatestAvailableSessionApi() {
  const { data: latestSession, loading, error, execute, reset } = useApi(sessionService.getLatestAvailableSession);
  const markSessionAvailabilityKnown = useSessionStore((state) => state.markSessionAvailabilityKnown);
  const sessionCount = useSessionStore((state) => Object.keys(state.sessions).length);

  useEffect(() => {
    execute();
  }, [execute]);

  // Sync session store after fetching latest session info, or when sessions are created
  useEffect(() => {
    if (!latestSession?.trimester || !latestSession?.year || sessionCount === 0) {
      return;
    }

    try {
      const latestTerm = trimesterToSessionTerm(latestSession.trimester);
      if (!latestTerm) {
        return;
      }

      const currentSessions = useSessionStore.getState().sessions;

      // Mark all existing sessions: true if at or before the latest available session, false if after
      for (const sessionKey of Object.keys(currentSessions)) {
        const termChar = sessionKey.charAt(0) as typeof ORDERED_SESSION_TERMS[number];
        const year = Number.parseInt(sessionKey.substring(1), 10);

        if (!ORDERED_SESSION_TERMS.includes(termChar) || Number.isNaN(year)) {
          continue;
        }

        const isAtOrBeforeLatest = compareSessions(year, termChar, latestSession.year, latestTerm) <= 0;
        markSessionAvailabilityKnown(sessionKey, isAtOrBeforeLatest);
      }
    } catch (e) {
      // non-fatal
      console.error('Failed setting latest available session in store:', e);
    }
  }, [latestSession, markSessionAvailabilityKnown, sessionCount]);

  return { latestSession, loading, error, refetch: execute, reset };
}
