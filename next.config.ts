import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const isDev = process.env.APP_ENV === 'development';
const withNextIntl = createNextIntlPlugin();

const baseConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    if (isDev) {
      return [];
    }
    // Umami analytics rewrites
    return [
      {
        source: '/stats/script.js',
        destination: process.env.UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js',
      },
      {
        source: '/stats/api/send',
        destination: process.env.UMAMI_API_URL || 'https://cloud.umami.is/api/send',
      },
    ];
  },
};

const intlConfig = withNextIntl(baseConfig);

export default isDev
  ? intlConfig
  : withSentryConfig(intlConfig, {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: '/observability/events',
    disableLogger: true,
  });
