import type { MeasurementData } from '@boilerplate/device-sdk';

import type { DeviceEmitter } from '../deviceEmitter/device-emitter';
import type { ExampleDevice, ExampleEventMap } from '../deviceEmitter/example-event-map';
 
export type DeviceSessionPhase =
  | 'idle'
  | 'scanning'
  | 'connecting'
  | 'listening'
  | 'received'
  | 'disconnected'
  | 'error';

export interface DeviceState {
  activeDevice: ExampleDevice | null;
  devices: ExampleDevice[];
  error: { code: string; message: string } | null;
  isConnected: boolean;
  isListening: boolean;
  isReady: boolean;
  isScanning: boolean;
  lastMeasuredAt: number | null;
  measurement: MeasurementData | null;
  phase: DeviceSessionPhase;
}

const initialDeviceState: DeviceState = {
  activeDevice: null,
  devices: [],
  error: null,
  isConnected: false,
  isListening: false,
  isReady: false,
  isScanning: false,
  lastMeasuredAt: null,
  measurement: null,
  phase: 'idle',
};

export interface DeviceStore {
  clearMeasurement(): void;
  destroy(): void;
  getSnapshot(): DeviceState;
  getState(): DeviceState;
  markConnecting(): void;
  markScanning(): void;
  reset(): void;
  subscribe(listener: () => void): () => void;
}

export function createDeviceStore(
  emitter: DeviceEmitter<ExampleEventMap>
): DeviceStore {
  let state: DeviceState = { ...initialDeviceState };
  const listeners = new Set<() => void>();

  const emitChange = () => {
    listeners.forEach((listener) => listener());
  };

  const updateState = (next: Partial<DeviceState>) => {
    state = { ...state, ...next };
    emitChange();
  };

  const subs = [
    emitter.on('scan:result', ({ devices }) => {
      // Avoid duplicate devices in list
      const merged = [...state.devices];
      devices.forEach((dev) => {
        const idx = merged.findIndex((d) => d.deviceId === dev.deviceId);
        if (idx >= 0) {
          merged[idx] = dev;
        } else {
          merged.push(dev);
        }
      });
      updateState({ devices: merged });
    }),

    emitter.on('scan:stop', () => {
      updateState({ isScanning: false });
    }),

    emitter.on('device:connected', ({ device }) => {
      updateState({
        activeDevice: device,
        error: null,
        isConnected: true,
        isListening: true,
        phase: 'listening',
      });
    }),

    emitter.on('device:disconnected', () => {
      updateState({
        activeDevice: null,
        isConnected: false,
        isListening: false,
        phase: 'disconnected',
      });
    }),

    emitter.on('device:error', ({ code, message }) => {
      updateState({
        error: { code, message },
        isScanning: false,
        phase: 'error',
      });
    }),

    emitter.on('measurement:received', (data) => {
      updateState({
        lastMeasuredAt: Date.now(),
        measurement: data,
        phase: 'received',
      });
    }),
  ];

  return {
    clearMeasurement() {
      updateState({ measurement: null, phase: 'listening' });
    },
    destroy() {
      subs.forEach((unsub) => unsub());
      listeners.clear();
    },
    getSnapshot() {
      return state;
    },
    getState() {
      return state;
    },
    markConnecting() {
      updateState({ isScanning: false, phase: 'connecting' });
    },
    markScanning() {
      updateState({ devices: [], isScanning: true, phase: 'scanning' });
    },
    reset() {
      updateState({ ...initialDeviceState });
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
