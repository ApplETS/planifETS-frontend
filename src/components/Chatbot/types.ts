export type ChatMessage = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
};
