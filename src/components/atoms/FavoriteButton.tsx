'use client';

import type { FC } from 'react';
import { Heart } from 'lucide-react';

import { Button } from '@/shadcn/ui/button';

type FavoriteButtonProps = {
  isFavorited: boolean;
  onToggle: () => void;
  isHovered: boolean;
};

const FavoriteButton: FC<FavoriteButtonProps> = ({
  isFavorited,
  onToggle,
  isHovered,
}) => (
  <Button
    variant="secondary"
    size="icon"
    className="absolute right-0 top-0 z-20 !bg-transparent !p-0"
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
  >
    {isFavorited || isHovered
      ? (
        <div className="rounded-full bg-white/30 p-1 hover:bg-gray-100/50">
          {isFavorited
            ? (
              <Heart className="text-lg text-red-600" fill="currentColor" />
            )
            : (
              <Heart className="text-lg text-red-600" />
            )}
        </div>
      )
      : null}
  </Button>
);

export default FavoriteButton;
