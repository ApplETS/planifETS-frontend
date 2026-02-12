import { useEffect } from 'react';
import { useApi } from '@/api/hooks/useApi';
import { sessionService } from '@/api/services/session.service';
import { useSessionStore } from '@/store/sessionStore';
import { generateSessionKey, ORDERED_SESSION_TERMS, trimesterToSessionTerm } from '@/utils/sessionUtils';

export function useLatestAvailableSessionApi() {
  const { data: latestSession, loading, error, execute, reset } = useApi(sessionService.getLatestAvailableSession);
  const markSessionAvailabilityKnown = useSessionStore((state) => state.markSessionAvailabilityKnown);

  useEffect(() => {
    execute();
  }, [execute]);

  // Sync session store after fetching latest session info
  useEffect(() => {
    if (latestSession && latestSession.trimester && latestSession.year) {
      try {
        const sessionTerm = trimesterToSessionTerm(latestSession.trimester);
        if (!sessionTerm) {
          return;
        }

        const sessionKey = generateSessionKey(latestSession.year, sessionTerm);
        markSessionAvailabilityKnown(sessionKey, true);

        const currentTermIndex = ORDERED_SESSION_TERMS.indexOf(sessionTerm);

        for (const term of ORDERED_SESSION_TERMS.slice(currentTermIndex + 1)) {
          const futureKey = generateSessionKey(latestSession.year, term);
          markSessionAvailabilityKnown(futureKey, false);
        }

        const nextYear = latestSession.year + 1;
        const maxYear = latestSession.year + 10;
        for (let year = nextYear; year <= maxYear; year++) {
          for (const term of ORDERED_SESSION_TERMS) {
            const futureKey = generateSessionKey(year, term);
            markSessionAvailabilityKnown(futureKey, false);
          }
        }
      } catch (e) {
        // non-fatal

        console.error('Failed setting latest available session in store:', e);
      }
    }
  }, [latestSession, markSessionAvailabilityKnown]);

  return { latestSession, loading, error, refetch: execute, reset };
}
