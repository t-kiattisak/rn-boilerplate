/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, memo, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { createStore, type StateCreator, type StoreApi } from 'zustand/vanilla';

export type CreateStateFn<TState> = (
  initial?: Partial<TState>
) => StateCreator<TState, any[], any[], TState> | StateCreator<TState>;

export interface ScopedProviderProps<TState> {
  value?: Partial<TState>;
  children: ReactNode;
}

export function createZustandSafeContext<TState>(
  createState: CreateStateFn<TState>,
  errorMessage: string
) {
  type Store = StoreApi<TState>;
  const Ctx = React.createContext<Store | null>(null);

  const Provider = memo(({ value, children }: ScopedProviderProps<TState>) => {
    const storeRef = useRef<Store>(null);
    storeRef.current ??= createStore<TState>()(createState(value));
    return (
      <Ctx.Provider key={JSON.stringify(value)} value={storeRef.current}>
        {children}
      </Ctx.Provider>
    );
  });

  Provider.displayName = 'ZustandScopedContextProvider';

  const useSafeContext = <Sel,>(selector: (s: TState) => Sel): Sel => {
    const store = useContext(Ctx);
    if (!store) throw new Error(errorMessage);
    return useStore(store, useShallow(selector));
  };

  return [Provider, useSafeContext] as const;
}
