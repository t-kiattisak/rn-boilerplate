import { Linking } from 'react-native';

const DEEP_LINK_SCHEME = 'boilerplate://boilerplatethailand.org';

export const openAnswerCallDeepLink = async (
  callId: string
): ReturnType<typeof Linking.openURL> => {
  const url = `${DEEP_LINK_SCHEME}/calling?action=answer&callId=${callId}`;
  return Linking.openURL(url);
};

export const openHomeDeepLink = async (): ReturnType<
  typeof Linking.openURL
> => {
  const url = `${DEEP_LINK_SCHEME}`;
  return Linking.openURL(url);
};

export const openDeeplink = async (
  url: string
): ReturnType<typeof Linking.openURL> => {
  return Linking.openURL(url);
};
