import posthog from 'posthog-js';

if (process.env.NEXT_PUBLIC_APP_ENV !== 'development') {
  if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
      api_host: '/ingest',
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST,
      defaults: '2026-01-30',
      capture_exceptions: true,
    });
  }
}

export { onRouterTransitionStart } from '../lib/monitoring';
