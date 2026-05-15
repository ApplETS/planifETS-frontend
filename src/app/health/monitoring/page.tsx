import { monitoring } from '@/lib/monitoring';

export default function MonitoringHealthPage() {
  monitoring.captureMessage('Monitoring health check page visited', 'info');
  throw new Error('This is a test error for monitoring health checks.');
}
