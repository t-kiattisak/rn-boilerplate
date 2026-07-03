import { useCallback } from 'react';
import { useDeviceAdapter, useDeviceStore } from '../../../providers/DeviceSessionProvider';
import { exampleDeviceEmitter } from '../../../deviceEmitter/example-device-emitter';

const CONNECTION_READY_TIMEOUT_MS = 30_000;

function waitForDeviceConnected(
  deviceId: string,
  timeoutMs: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      unsub();
      reject(new Error('Connection timed out'));
    }, timeoutMs);

    const unsub = exampleDeviceEmitter.on('device:connected', ({ device }) => {
      if (device.deviceId !== deviceId) return;
      clearTimeout(timer);
      unsub();
      resolve();
    });
  });
}

export interface DeviceActions {
  clearMeasurement: () => void;
  connectDevice: (deviceId: string) => Promise<boolean>;
  disconnectDevice: () => Promise<void>;
  startScan: () => Promise<void>;
  startMeasure: () => Promise<void>;
  stopScan: () => Promise<void>;
}

export function useDeviceActions(): DeviceActions {
  const adapter = useDeviceAdapter();
  const store = useDeviceStore();

  const startScan = useCallback(async () => {
    try {
      store.markScanning();
      adapter.startScan();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to start scan';
      exampleDeviceEmitter.emit('scan:error', { code: 'scan_failed', message });
    }
  }, [adapter, store]);

  const stopScan = useCallback(async () => {
    try {
      adapter.stopScan();
      exampleDeviceEmitter.emit('scan:stop', undefined);
    } catch {
      // ignore
    }
  }, [adapter]);

  const connectDevice = useCallback(
    async (deviceId: string): Promise<boolean> => {
      try {
        store.markConnecting();
        adapter.stopScan();

        const readyPromise = waitForDeviceConnected(
          deviceId,
          CONNECTION_READY_TIMEOUT_MS
        );
        adapter.connectDevice(deviceId);

        await readyPromise;
        return true;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to connect device';
        exampleDeviceEmitter.emit('device:error', {
          deviceId,
          code: 'connect_failed',
          message,
        });
        return false;
      }
    },
    [adapter, store]
  );

  const disconnectDevice = useCallback(async () => {
    try {
      adapter.disconnectDevice();
    } catch {
      // ignore
    }
  }, [adapter]);

  const startMeasure = useCallback(async () => {
    try {
      adapter.startMeasure();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to start measurement';
      exampleDeviceEmitter.emit('device:error', {
        code: 'measure_failed',
        message,
      });
    }
  }, [adapter]);

  const clearMeasurement = useCallback(() => {
    store.clearMeasurement();
  }, [store]);

  return {
    clearMeasurement,
    connectDevice,
    disconnectDevice,
    startMeasure,
    startScan,
    stopScan,
  };
}
