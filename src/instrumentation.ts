import { getPostHogServer } from '../lib/posthog-server';

export function register() {
  // No-op for initialization
}

export const onRequestError = async (
  err: unknown,
  request: Readonly<{ path: string; method: string; headers: Record<string, string | string[] | undefined> }>,
) => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const posthog = getPostHogServer();
    if (!posthog) {
      return;
    }

    let distinctId: string | undefined;
    const cookie = request.headers.cookie;
    if (cookie) {
      const cookieString = Array.isArray(cookie) ? cookie.join('; ') : cookie;
      const match = /ph_phc_.*?_posthog=([^;]+)/.exec(cookieString);
      if (match?.[1]) {
        try {
          const data = JSON.parse(decodeURIComponent(match[1])) as { distinct_id?: string };
          distinctId = data.distinct_id;
        } catch (e) {
          console.error('Error parsing PostHog cookie:', e);
        }
      }
    }

    posthog.captureException(err, distinctId);
  }
};
