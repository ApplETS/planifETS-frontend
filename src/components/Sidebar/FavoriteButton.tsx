'use client';

import type { FC } from 'react';
import BaseButton from '@/components/atoms/buttons/BaseButton';

import { FaHeart, FaRegHeart } from 'react-icons/fa';

type FavoriteButtonProps = {
  isFavorited: boolean;
  onToggleFavorite: () => void;
  isHovered: boolean;
};

const FavoriteButton: FC<FavoriteButtonProps> = ({
  isFavorited,
  onToggleFavorite,
  isHovered,
}) => (
  <BaseButton
    variant="secondary"
    size="sm"
    className="absolute right-0 top-0 z-20 !bg-transparent !p-0"
    onClick={(e) => {
      e.stopPropagation();
      onToggleFavorite();
    }}
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
