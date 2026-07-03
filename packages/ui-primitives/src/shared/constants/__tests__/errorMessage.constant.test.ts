import { errorMessageConstant } from '@/shared/constants/errorMessage.constant';

describe('errorMessageConstant', () => {
  it('exposes expected error message keys', () => {
    expect(Object.keys(errorMessageConstant).sort()).toEqual([
      'deviceConnectionFailed',
      'deviceConnectionInterrupted',
      'deviceConnectionLost',
      'deviceConnectionTimeout',
      'errorRetry',
      'invalidOtp',
      'invalidPin',
      'loginFailed',
      'minSelect',
      'required',
      'requiredField',
      'updateProfileImageFailed',
    ]);
  });

  it('keeps non-empty string values', () => {
    for (const message of Object.values(errorMessageConstant)) {
      expect(typeof message).toBe('string');
      expect(message.trim().length).toBeGreaterThan(0);
    }
  });
});
