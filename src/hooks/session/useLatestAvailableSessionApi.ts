import { useEffect } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { SessionEnum } from '@/types/session';
import { generateSessionKey, trimesterToSessionTerm } from '@/utils/sessionUtils';
import { useApi } from '../../lib/api/hooks/useApi';
import { sessionService } from '../../lib/api/services/session.service';

export function useLatestAvailableSession() {
  const { data: latestSession, loading, error, execute, reset } = useApi(sessionService.getLatestAvailableSession);
  const markSessionAvailabilityKnown = useSessionStore((state) => state.markSessionAvailabilityKnown);
  useEffect(() => {
    execute();
  }, [execute]);

  // Sync session store after fetching latest session info
  useEffect(() => {
    if (latestSession && latestSession.trimester && latestSession.year) {
      const sessionTerm = trimesterToSessionTerm(latestSession.trimester);
      if (sessionTerm) {
        const sessionKey = generateSessionKey(latestSession.year, sessionTerm);
        // Mark the latest session as known availability (isKnown = true)
        markSessionAvailabilityKnown(sessionKey, true);

        // Mark all future sessions as unknown availability (isKnown = false)
        const currentYear = latestSession.year;
        const sessionOrder = [SessionEnum.H, SessionEnum.E, SessionEnum.A];
        const currentTermIndex = sessionOrder.indexOf(sessionTerm);
        // Mark remaining terms in the same year after the latest session
        for (let i = currentTermIndex + 1; i < sessionOrder.length; i++) {
          const term = sessionOrder[i];
          if (term) {
            const futureKey = generateSessionKey(currentYear, term);
            markSessionAvailabilityKnown(futureKey, false);
          }
        }
        // Mark all sessions in future years as unknown
        const nextYear = currentYear + 1;
        const maxYear = currentYear + 10; // Arbitrary future window
        for (let year = nextYear; year <= maxYear; year++) {
          for (const term of sessionOrder) {
            const futureKey = generateSessionKey(year, term);
            markSessionAvailabilityKnown(futureKey, false);
          }
        }
      }
    }
  }, [latestSession, markSessionAvailabilityKnown]);

  return { latestSession, loading, error, refetch: execute, reset };
}
