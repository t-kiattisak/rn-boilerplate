import type { IDeviceEventEmit } from '@boilerplate/device-sdk';
import EventEmitter3 from 'eventemitter3';

export class DeviceEmitter<TEvents extends object> {
  private readonly emitter = new EventEmitter3();

  emit<K extends keyof TEvents & string>(event: K, data: TEvents[K]): void;
  emit(event: string, data: unknown): void;
  emit(event: string, data: unknown): void {
    this.emitter.emit(event, data);
  }

  on<K extends keyof TEvents & string>(
    event: K,
    listener: (data: TEvents[K]) => void
  ): () => void {
    this.emitter.on(event, listener as any);
    return () => this.emitter.off(event, listener as any);
  }

  once<K extends keyof TEvents & string>(
    event: K,
    listener: (data: TEvents[K]) => void
  ): () => void {
    this.emitter.once(event, listener as any);
    return () => this.emitter.off(event, listener as any);
  }

  off<K extends keyof TEvents & string>(
    event: K,
    listener: (data: TEvents[K]) => void
  ): void {
    this.emitter.off(event, listener as any);
  }

  waitForEvent<K extends keyof TEvents & string>(
    event: K,
    timeoutMs = 10_000
  ): Promise<TEvents[K]> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () =>
          reject(new Error(`[DeviceEmitter] timeout waiting for "${event}"`)),
        timeoutMs
      );
      this.once(event, (data) => {
        clearTimeout(timer);
        resolve(data);
      });
    });
  }
}

export type { IDeviceEventEmit };
