import { messageConstant } from '@/shared/constants/message.constant';

describe('messageConstant', () => {
  it('exposes expected message keys', () => {
    expect(Object.keys(messageConstant).sort()).toEqual([
      'paotangLogin',
      'reqLoginQuestionnaire',
      'teleHealthThailand',
    ]);
  });

  it('keeps non-empty string values', () => {
    for (const message of Object.values(messageConstant)) {
      expect(typeof message).toBe('string');
      expect(message.trim().length).toBeGreaterThan(0);
    }
  });
});
