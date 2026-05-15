import type { MonitoringService } from './types';
import posthog from 'posthog-js';

export const posthogAdapter: MonitoringService = {
  captureException(error, context) {
    posthog.captureException(error, { source: 'frontend', ...context });
  },
  captureMessage(message, level = 'info') {
    posthog.capture('monitoring_message', { message, level, source: 'frontend' });
  },
};

export const onRouterTransitionStart = (url: string) => {
  posthog.capture('$pageleave');
  posthog.capture('$pageview', { $current_url: url, source: 'frontend' });
};
