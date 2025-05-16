'use client';

import type { FC } from 'react';
import BaseButton from '@/components/atoms/buttons/BaseButton';

import { FaHeart, FaRegHeart } from 'react-icons/fa';

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
  <BaseButton
    variant="secondary"
    size="sm"
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
              <FaHeart className="text-lg text-red-600" />
            )
            : (
              <FaRegHeart className="text-lg text-red-600" />
            )}
        </div>
      )
      : null}
  </BaseButton>
);

export default FavoriteButton;
