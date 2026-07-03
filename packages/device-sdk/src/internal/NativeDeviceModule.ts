import { NativeEventEmitter, NativeModules } from 'react-native';

const { ExampleDeviceNativeModule } = NativeModules;

export type DeviceEventName =
  | 'Device_onScanResult'
  | 'Device_onScanError'
  | 'Device_onConnected'
  | 'Device_onDisconnected'
  | 'Device_onDataReceived';

export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  rssi?: number;
}

export interface MeasurementData {
  value: number;
  unit: string;
  timestamp: string;
}

interface NativeDeviceModuleInterface {
  startScanning(): void;
  stopScanning(): void;
  connectDevice(deviceId: string): void;
  disconnectDevice(): void;
  startMeasurement(): void;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

const getActiveModule = (): NativeDeviceModuleInterface => {
  if (!ExampleDeviceNativeModule) {
    // Return a mock for development environment when native code is not compiled
    return {
      addListener: () => {},
      connectDevice: () => {},
      disconnectDevice: () => {},
      removeListeners: () => {},
      startMeasurement: () => {},
      startScanning: () => {},
      stopScanning: () => {},
    };
  }

  return ExampleDeviceNativeModule;
};

export const NativeDeviceModule: NativeDeviceModuleInterface = {
  addListener: (eventName: string) => getActiveModule().addListener(eventName),
  connectDevice: (deviceId: string) => getActiveModule().connectDevice(deviceId),
  disconnectDevice: () => getActiveModule().disconnectDevice(),
  removeListeners: (count: number) => getActiveModule().removeListeners(count),
  startMeasurement: () => getActiveModule().startMeasurement(),
  startScanning: () => getActiveModule().startScanning(),
  stopScanning: () => getActiveModule().stopScanning(),
};

export const deviceEventEmitter = ExampleDeviceNativeModule
  ? new NativeEventEmitter(ExampleDeviceNativeModule)
  : null;
