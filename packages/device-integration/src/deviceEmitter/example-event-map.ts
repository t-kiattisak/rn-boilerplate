import type { DeviceInfo, MeasurementData } from '@boilerplate/device-sdk';

export interface ExampleDevice {
  deviceId: string;
  deviceName: string;
  isConnected: boolean;
  vendor: string;
}

export type ExampleEventMap = {
  'adapter:ready': { sdkName: string };
  'adapter:destroyed': { sdkName: string };
  'scan:result': { devices: ExampleDevice[] };
  'scan:error': { code: string; message: string };
  'scan:stop': undefined;
  'device:connected': { device: ExampleDevice };
  'device:disconnected': { deviceId: string };
  'device:error': { code: string; message: string; deviceId?: string };
  'measurement:received': MeasurementData;
  'watch:measure': MeasurementData;
};
