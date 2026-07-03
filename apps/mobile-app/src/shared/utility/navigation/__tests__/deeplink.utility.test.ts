import { Linking } from 'react-native';

import {
  openAnswerCallDeepLink,
  openDeeplink,
  openHomeDeepLink,
} from '@/shared/utility/navigation/deeplink.utility';

jest.mock('react-native', () => ({
  Linking: {
    openURL: jest.fn(() => Promise.resolve(undefined)),
  },
}));

describe('deeplink.utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('openAnswerCallDeepLink opens answer URL with callId', async () => {
    await openAnswerCallDeepLink('call-abc');

    expect(Linking.openURL).toHaveBeenCalledWith(
      'boilerplate://boilerplatethailand.org/calling?action=answer&callId=call-abc'
    );
  });

  it('openHomeDeepLink opens base scheme URL', async () => {
    await openHomeDeepLink();

    expect(Linking.openURL).toHaveBeenCalledWith(
      'boilerplate://boilerplatethailand.org'
    );
  });

  it('openDeeplink opens the given URL', async () => {
    const url =
      'https://file-paotang.krungthai.com/DEEPLINK/paotang-external-deeplink.html?destination=ptidApp2App';

    await openDeeplink(url);

    expect(Linking.openURL).toHaveBeenCalledWith(url);
  });
});
