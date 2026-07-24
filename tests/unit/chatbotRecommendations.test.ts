import { describe, expect, it } from 'vitest';

import { buildRecommendationCards } from '@/components/Chatbot/recommendations';

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
