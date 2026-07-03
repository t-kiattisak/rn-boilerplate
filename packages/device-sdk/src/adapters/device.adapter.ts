import { ExampleDeviceAdapter } from './example-device.adapter';

export interface IDeviceEventEmit {
  emit(event: string, data: unknown): void;
}

export class DeviceAdapter {
  private readonly exampleAdapter: ExampleDeviceAdapter;

  constructor(private readonly bus: IDeviceEventEmit) {
    this.exampleAdapter = new ExampleDeviceAdapter(bus);
    this.wireEvents();
  }

  private wireEvents(): void {
    this.exampleAdapter.wireEvents();
    this.bus.emit('adapter:ready', { sdkName: 'boilerplate-device-sdk' });
  }

  startScan(): void {
    this.exampleAdapter.startScan();
  }

  stopScan(): void {
    this.exampleAdapter.stopScan();
  }

  connectDevice(deviceId: string): void {
    this.exampleAdapter.connectDevice(deviceId);
  }

  disconnectDevice(): void {
    this.exampleAdapter.disconnectDevice();
  }

  startMeasure(): void {
    this.exampleAdapter.startMeasure();
  }

  destroy(): void {
    this.exampleAdapter.unwireEvents();
    this.bus.emit('adapter:destroyed', { sdkName: 'boilerplate-device-sdk' });
  }
}
