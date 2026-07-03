import { DeviceEmitter } from './device-emitter';
import type { ExampleEventMap } from './example-event-map';

export const exampleDeviceEmitter = new DeviceEmitter<ExampleEventMap>();
export type ExampleDeviceEmitter = DeviceEmitter<ExampleEventMap>;
