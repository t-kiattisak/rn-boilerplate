import { messageConstant } from '../message.constant';

describe('messageConstant', () => {
  it('exposes expected message keys', () => {
    expect(Object.keys(messageConstant).sort()).toEqual([
      'paotangLogin',
      'reqLoginQuestionnaire',
      'boilerplateApp',
    ]);
  });

  it('keeps non-empty string values', () => {
    for (const message of Object.values(messageConstant)) {
      expect(typeof message).toBe('string');
      expect(message.trim().length).toBeGreaterThan(0);
    }
  });
});
