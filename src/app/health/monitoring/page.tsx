import { posthogServerAdapter as monitoring } from '@/lib/monitoring/posthog-server-adapter';

export default function MonitoringHealthPage() {
  monitoring.captureMessage('Monitoring health check page visited', 'info');
  throw new Error('This is a test error for monitoring health checks.');
}
