import { describe, expect, it } from 'vitest';

import {
  buildRecommendationCards,
  hasResolvedCourse,
} from '@/components/Chatbot/recommendations';

describe('buildRecommendationCards', () => {
  it('preserves the reason provided for each recommendation', () => {
    const cards = buildRecommendationCards(
      [{ code: 'GTS860', reason: 'Strong foundation in AI and ML' } as never],
      'Fallback reason',
    );

    expect(cards).toHaveLength(1);
    expect(cards[0]?.reason).toBe('Strong foundation in AI and ML');
  });
});

describe('hasResolvedCourse', () => {
  it('keeps draggable course data even when its description is blank or missing', () => {
    const cards = [
      { code: 'LOG680' },
      {
        code: 'LOG680',
        course: {
          id: 680,
          code: 'LOG680',
          title: 'Introduction à l’approche DevOps',
          description: 'DevOps',
          credits: 3,
          prerequisites: [],
          availability: [],
        },
      },
      {
        code: 'LOG999',
        course: {
          id: 999,
          code: 'LOG999',
          title: 'Missing description',
          description: ' ',
          credits: 3,
          prerequisites: [],
          availability: [],
        },
      },
      {
        code: 'LOG888',
        course: {
          id: 888,
          code: 'LOG888',
          title: 'No description field',
          credits: 3,
          prerequisites: [],
          availability: [],
        },
      },
    ];

    expect(cards.filter(hasResolvedCourse).map(({ code }) => code)).toEqual(['LOG680', 'LOG999', 'LOG888']);
  });
});
