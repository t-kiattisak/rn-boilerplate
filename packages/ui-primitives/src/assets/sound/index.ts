export const SOUND_PATHS = {
  NOTIFY_1: 'notify1.mp3',
};

export type SoundKey = keyof typeof SOUND_PATHS;
export type SoundPath = (typeof SOUND_PATHS)[SoundKey];
