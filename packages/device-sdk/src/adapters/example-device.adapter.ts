import {
  deviceEventEmitter,
  NativeDeviceModule,
  type DeviceInfo,
  type MeasurementData,
} from '../internal/NativeDeviceModule';
import type { IDeviceEventEmit } from './device.adapter';

export class ExampleDeviceAdapter {
  private readonly subscriptions: Array<{ remove(): void }> = [];

  constructor(private readonly bus: IDeviceEventEmit) {}

  wireEvents(): void {
    this.unwireEvents();

    if (!deviceEventEmitter) {
      console.warn('[ExampleDeviceAdapter] Native event emitter is unavailable (Running in simulator/development mode)');
      return;
    }

    this.subscriptions.push(
      deviceEventEmitter.addListener(
        'Device_onScanResult',
        (event: { devices: DeviceInfo[] }) => {
          this.bus.emit('scan:result', {
            devices: event.devices.map((d) => ({
              deviceId: d.deviceId,
              deviceName: d.deviceName,
              isConnected: false,
              vendor: 'boilerplate',
            })),
          });
        }
      ),

      deviceEventEmitter.addListener(
        'Device_onScanError',
        (event: { code: string; message: string }) => {
          this.bus.emit('scan:error', {
            code: event.code || 'scan_failed',
            message: event.message || 'Device scan error',
          });
        }
      ),

      deviceEventEmitter.addListener(
        'Device_onConnected',
        (event: { deviceId: string; deviceName: string }) => {
          this.bus.emit('device:connected', {
            device: {
              deviceId: event.deviceId,
              deviceName: event.deviceName,
              isConnected: true,
              vendor: 'boilerplate',
            },
          });
        }
      ),

      deviceEventEmitter.addListener(
        'Device_onDisconnected',
        (event: { deviceId: string }) => {
          this.bus.emit('device:disconnected', {
            deviceId: event.deviceId,
          });
        }
      ),

      deviceEventEmitter.addListener(
        'Device_onDataReceived',
        (event: { data: MeasurementData }) => {
          this.bus.emit('measurement:received', {
            value: event.data.value,
            unit: event.data.unit,
            timestamp: event.data.timestamp,
          });
        }
      )
    );
  }

  unwireEvents(): void {
    this.subscriptions.forEach((sub) => sub.remove());
    this.subscriptions.length = 0;
  }

  startScan(): void {
    NativeDeviceModule.startScanning();
  }

  stopScan(): void {
    NativeDeviceModule.stopScanning();
  }

  connectDevice(deviceId: string): void {
    NativeDeviceModule.connectDevice(deviceId);
  }

  disconnectDevice(): void {
    NativeDeviceModule.disconnectDevice();
  }

  startMeasure(): void {
    NativeDeviceModule.startMeasurement();
  }
}
