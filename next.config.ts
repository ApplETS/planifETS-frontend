import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const appEnv = process.env.APP_ENV ?? 'development';
const posthogApiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';
const posthogAssetsHost = posthogApiHost.replace(/\/\/(\w+)\./, '//$1-assets.'); // https://eu.i.posthog.com → https://eu-assets.i.posthog.com

const baseConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_APP_ENV: appEnv,
  },
  // Required for PostHog
  // SDK sends requests with trailing slashes that Next.js would otherwise redirect, breaking the proxy.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    if (appEnv === 'development') {
      return [];
    }
    return [
      // Umami analytics
      {
        source: '/stats/script.js',
        destination: process.env.UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js',
      },
      {
        source: '/stats/api/send',
        destination: process.env.UMAMI_API_URL || 'https://cloud.umami.is/api/send',
      },
      // PostHog reverse proxy
      {
        source: '/ingest/static/:path*',
        destination: `${posthogAssetsHost}/static/:path*`,
      },
      {
        source: '/ingest/:path*',
        destination: `${posthogApiHost}/:path*`,
      },
    ];
  },
};

export default withNextIntl(baseConfig);
