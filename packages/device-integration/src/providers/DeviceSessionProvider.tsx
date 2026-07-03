import React, { createContext, useContext, useEffect, useRef } from 'react';
import { DeviceAdapter } from '@boilerplate/device-sdk';
import { exampleDeviceEmitter } from '../deviceEmitter/example-device-emitter';
import { createDeviceStore, type DeviceStore } from '../store/device-store';

interface DeviceAdapterContextValue {
  adapter: DeviceAdapter;
}

const DeviceAdapterContext = createContext<DeviceAdapterContextValue | null>(null);

export function useDeviceAdapter(): DeviceAdapter {
  const ctx = useContext(DeviceAdapterContext);
  if (!ctx) {
    throw new Error('[device-integration] useDeviceAdapter must be called inside <DeviceSessionProvider>');
  }
  return ctx.adapter;
}

const DeviceSessionContext = createContext<DeviceStore | null>(null);

export function useDeviceStore(): DeviceStore {
  const store = useContext(DeviceSessionContext);
  if (!store) {
    throw new Error('[device-integration] useDeviceStore must be called inside <DeviceSessionProvider>');
  }
  return store;
}

export interface DeviceSessionProviderProps {
  children: React.ReactNode;
  disconnectAfterMeasurement?: boolean;
}

export function DeviceSessionProvider({
  children,
  disconnectAfterMeasurement = false,
}: DeviceSessionProviderProps): React.JSX.Element {
  const adapterRef = useRef<DeviceAdapter | null>(null);
  const storeRef = useRef<DeviceStore | null>(null);

  // Initialize store and adapter lazily
  if (!storeRef.current) {
    storeRef.current = createDeviceStore(exampleDeviceEmitter);
  }
  const store = storeRef.current;

  if (!adapterRef.current) {
    adapterRef.current = new DeviceAdapter(exampleDeviceEmitter);
  }
  const adapter = adapterRef.current;

  useEffect(() => {
    if (!disconnectAfterMeasurement) return;

    const unsub = exampleDeviceEmitter.on('measurement:received', () => {
      const active = store.getSnapshot().activeDevice;
      if (!active?.deviceId) return;
      try {
        adapter.disconnectDevice();
      } catch (err: unknown) {
        console.warn('[DeviceSessionProvider] disconnect after measurement failed:', err);
      }
    });

    return unsub;
  }, [adapter, disconnectAfterMeasurement, store]);

  useEffect(() => {
    return () => {
      try {
        adapter.stopScan();
      } catch (e) {
        console.error(e);
      }
      const active = store.getSnapshot().activeDevice;
      if (active?.deviceId) {
        try {
          adapter.disconnectDevice();
        } catch (e) {
          console.error(e);
        }
      }
      store.reset();
      store.destroy();
      adapter.destroy();
      storeRef.current = null;
      adapterRef.current = null;
    };
  }, [adapter, store]);

  return (
    <DeviceAdapterContext.Provider value={{ adapter }}>
      <DeviceSessionContext.Provider value={store}>
        {children}
      </DeviceSessionContext.Provider>
    </DeviceAdapterContext.Provider>
  );
}
