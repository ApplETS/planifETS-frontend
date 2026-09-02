type MonitoringLevel = 'debug' | 'info' | 'warning' | 'error';
type ExceptionContext = Record<string, Record<string, unknown>>;

export type MonitoringService = {
  captureException: (error: Error, context?: ExceptionContext) => void;
  captureMessage: (message: string, level?: MonitoringLevel) => void;
};
