import type { MonitoringService } from './types';
import { getPostHogServer } from '../posthog-server';

const SERVER_DISTINCT_ID = 'server';

export const posthogServerAdapter: MonitoringService = {
  captureException(error, context) {
    getPostHogServer()?.capture({
      distinctId: SERVER_DISTINCT_ID,
      event: '$exception',
      properties: { message: error.message, source: 'server', ...context },
    });
  },
  captureMessage(message, level = 'info') {
    getPostHogServer()?.capture({
      distinctId: SERVER_DISTINCT_ID,
      event: 'monitoring_message',
      properties: { message, level, source: 'server' },
    });
  },
};
