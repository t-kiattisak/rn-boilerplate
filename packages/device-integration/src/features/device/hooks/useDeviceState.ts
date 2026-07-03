import { useSyncExternalStore } from 'react';
import { useDeviceStore } from '../../../providers/DeviceSessionProvider';
import type { DeviceState } from '../../../store/device-store';

export function useDeviceState<K extends keyof DeviceState>(
  key: K
): DeviceState[K] {
  const store = useDeviceStore();
  return useSyncExternalStore(store.subscribe, () => store.getSnapshot()[key]);
}

export function useDeviceSnapshot(): DeviceState {
  const store = useDeviceStore();
  return useSyncExternalStore(store.subscribe, store.getSnapshot);
}
