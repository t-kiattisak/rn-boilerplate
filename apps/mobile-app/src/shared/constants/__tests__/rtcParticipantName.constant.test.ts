import {
  RTC_FALLBACK_LOCAL_DISPLAY_NAME,
  RTC_FALLBACK_REMOTE_DISPLAY_NAME,
} from '@/shared/constants/rtcParticipantName.constant';

describe('rtcParticipantName.constant', () => {
  it('uses fixed English fallback display names for RTC', () => {
    expect(RTC_FALLBACK_LOCAL_DISPLAY_NAME).toBe('Patient');
    expect(RTC_FALLBACK_REMOTE_DISPLAY_NAME).toBe('Doctor');
  });
});
