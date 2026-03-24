import type {
  DetailedProgramCourseInstanceDto,
  SessionAvailabilityDto,
} from '@/api/types/program';
import type { TermEnum } from '@/types/session';
import {
  compareSessions,
  filterCurrentAndFutureSessions,
  formatSessionShort,
  generateSessionKey,
  generateSessionRange,
  parseSessionKey,
  sortOfferingsBySession,
  sortSessionsChronologically,
  trimesterToSessionTerm,
} from '@/utils/sessionUtils';

type TimelineOffering = {
  availability: DetailedProgramCourseInstanceDto['availability'];
  sessionAlias: string;
  sessionKey: string;
  sessionTerm: TermEnum;
  sessionYear: number;
};

const mapSessionAvailability = (
  sessionAvailability: SessionAvailabilityDto[],
): TimelineOffering[] => {
  return sessionAvailability.flatMap((session) => {
    const parsedSession = parseSessionKey(session.sessionCode);

    if (!parsedSession) {
      return [];
    }

    return [{
      availability: session.availability,
      sessionAlias: formatSessionShort(session.sessionCode),
      sessionKey: session.sessionCode,
      sessionTerm: parsedSession.sessionTerm,
      sessionYear: parsedSession.sessionYear,
    }];
  });
};

const mapCourseOfferings = (
  courseOfferings: DetailedProgramCourseInstanceDto[],
): TimelineOffering[] => {
  return sortOfferingsBySession(courseOfferings).flatMap((instance) => {
    const sessionTerm = trimesterToSessionTerm(instance.sessionTrimester);

    if (!sessionTerm) {
      return [];
    }

    const sessionKey = generateSessionKey(instance.sessionYear, sessionTerm);

    return [{
      availability: instance.availability,
      sessionAlias: formatSessionShort(sessionKey),
      sessionKey,
      sessionTerm,
      sessionYear: instance.sessionYear,
    }];
  });
};

const buildTimelineSessionKeys = (sessionKeys: string[]): string[] => {
  const sortedSessionKeys = sortSessionsChronologically(sessionKeys);
  const firstSessionKey = sortedSessionKeys[0];
  const lastSessionKey = sortedSessionKeys.at(-1);

  if (!firstSessionKey || !lastSessionKey) {
    return [];
  }

  const firstSession = parseSessionKey(firstSessionKey);
  const lastSession = parseSessionKey(lastSessionKey);

  if (!firstSession || !lastSession) {
    return [];
  }

  return generateSessionRange(
    firstSession.sessionYear,
    lastSession.sessionYear,
  ).filter((sessionKey) => {
    const parsedSession = parseSessionKey(sessionKey);

    if (!parsedSession) {
      return false;
    }

    return compareSessions(
      parsedSession.sessionYear,
      parsedSession.sessionTerm,
      firstSession.sessionYear,
      firstSession.sessionTerm,
    ) >= 0 && compareSessions(
      parsedSession.sessionYear,
      parsedSession.sessionTerm,
      lastSession.sessionYear,
      lastSession.sessionTerm,
    ) <= 0;
  });
};

export const buildFutureTimelineOfferings = (
  courseOfferings: DetailedProgramCourseInstanceDto[],
  sessionAvailability: SessionAvailabilityDto[] = [],
): TimelineOffering[] => {
  const sourceOfferings = sessionAvailability.length > 0
    ? mapSessionAvailability(sessionAvailability)
    : mapCourseOfferings(courseOfferings);

  if (sourceOfferings.length === 0) {
    return [];
  }

  const offeringsBySessionKey = new Map(
    sourceOfferings.map((offering) => [offering.sessionKey, offering] as const),
  );

  return filterCurrentAndFutureSessions(
    buildTimelineSessionKeys(sourceOfferings.map((offering) => offering.sessionKey)),
  ).flatMap((sessionKey) => {
    const parsedSession = parseSessionKey(sessionKey);

    if (!parsedSession) {
      return [];
    }

    const offering = offeringsBySessionKey.get(sessionKey);

    return [{
      availability: offering?.availability ?? [],
      sessionAlias: formatSessionShort(sessionKey),
      sessionKey,
      sessionTerm: parsedSession.sessionTerm,
      sessionYear: parsedSession.sessionYear,
    }];
  });
};
