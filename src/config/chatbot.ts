// Centralized chatbot feature flag
export const CHATBOT_ENABLED: boolean =
  process.env.NEXT_PUBLIC_CHATBOT_ENABLED === 'true';
