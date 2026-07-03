import { useEffect, useRef } from 'react';
import { exampleDeviceEmitter } from '../../../deviceEmitter/example-device-emitter';
import type { ExampleEventMap } from '../../../deviceEmitter/example-event-map';
import { useDeviceAdapter } from '../../../providers/DeviceSessionProvider';

export function useDeviceEventListener<K extends keyof ExampleEventMap & string>(
  event: K,
  callback: (data: ExampleEventMap[K]) => void
): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const adapter = useDeviceAdapter();

  useEffect(() => {
    const listener = (data: ExampleEventMap[K]): void => {
      callbackRef.current(data);
    };

    const unsub = exampleDeviceEmitter.on(event, listener);

    return () => {
      unsub();
    };
  }, [event, adapter]);
}
