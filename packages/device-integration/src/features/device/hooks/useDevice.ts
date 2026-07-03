import type { DeviceState } from '../../../store/device-store';
import type { DeviceActions } from './useDeviceActions';
import { useDeviceActions } from './useDeviceActions';
import { useDeviceState } from './useDeviceState';

export type UseDeviceReturn = DeviceActions &
  Pick<
    DeviceState,
    | 'activeDevice'
    | 'devices'
    | 'error'
    | 'isConnected'
    | 'isListening'
    | 'isReady'
    | 'isScanning'
    | 'lastMeasuredAt'
    | 'measurement'
    | 'phase'
  >;

export function useDevice(): UseDeviceReturn {
  const devices = useDeviceState('devices');
  const isScanning = useDeviceState('isScanning');
  const activeDevice = useDeviceState('activeDevice');
  const measurement = useDeviceState('measurement');
  const phase = useDeviceState('phase');
  const isConnected = useDeviceState('isConnected');
  const isListening = useDeviceState('isListening');
  const lastMeasuredAt = useDeviceState('lastMeasuredAt');
  const error = useDeviceState('error');
  const isReady = useDeviceState('isReady');

  const actions = useDeviceActions();

  return {
    activeDevice,
    devices,
    error,
    isConnected,
    isListening,
    isReady,
    isScanning,
    lastMeasuredAt,
    measurement,
    phase,
    ...actions,
  };
}
