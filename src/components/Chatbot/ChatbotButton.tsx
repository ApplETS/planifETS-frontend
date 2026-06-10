'use client';

import { Sparkles } from 'lucide-react';

import { Button } from '@/shadcn/ui/button';

type ChatbotButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function ChatbotButton({
  isOpen,
  onClick,
}: ChatbotButtonProps) {
  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={onClick}
        className="
          rounded-md
          shadow-lg

          bg-violet-600
          hover:bg-violet-700

          text-white
        "
      >
        <Sparkles className="mr-2 h-4 w-4 text-white" />
        Assistant PlanifETS
      </Button>
    </div>
  );
}
