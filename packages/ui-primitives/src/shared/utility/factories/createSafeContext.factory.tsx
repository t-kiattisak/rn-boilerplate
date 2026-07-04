import { createContext, JSX, memo, ReactNode, use, useMemo } from 'react';

export function createSafeContext<ContextValue>(
  errorMessage: string
): [
  React.MemoExoticComponent<
    ({
      children,
      value,
    }: {
      value: ContextValue;
      children: ReactNode;
    }) => JSX.Element
  >,
  <T extends ContextValue>() => T,
] {
  const Context = createContext<ContextValue | null>(null);

  const useSafeContext = <T extends ContextValue>(): T => {
    const ctx = use(Context);

    if (ctx === null) {
      throw new Error(errorMessage);
    }

    return ctx as T;
  };

  const Provider = memo(
    ({ children, value }: { value: ContextValue; children: ReactNode }) => (
      <Context.Provider value={useMemo(() => value, [value])}>
        {children}
      </Context.Provider>
    )
  );

  return [Provider, useSafeContext] as const;
}
