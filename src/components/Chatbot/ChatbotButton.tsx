'use client';

import { BotMessageSquare, X } from 'lucide-react';

import { Button } from '@/shadcn/ui/button';

type ChatbotButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function ChatbotButton({
  isOpen,
  onClick,
}: ChatbotButtonProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={onClick}
        size="lg"
        className="rounded-full shadow-lg px-5 py-6 flex items-center gap-2"
        data-testid="chatbot-button"
      >
        {isOpen
          ? <X className="h-5 w-5" />
          : <BotMessageSquare className="h-5 w-5" />}

        <span className="hidden sm:inline">
          Assistant PlanifETS
        </span>
      </Button>
    </div>
  );
}
