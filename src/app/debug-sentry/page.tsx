import * as Sentry from '@sentry/nextjs';

export default function DebugSentry() {
  Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' });
  Sentry.captureMessage('Debug Sentry page visited');
  throw new Error('This is a test error for debugging purposes.');
}
