import React, {
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { LoadingContext } from './context';
import { LoadingBackdropModal } from './LoadingBackdropModal';

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [activeIds, setActiveIds] = useState<Set<string>>(() => new Set());

  const register = useCallback((id: string) => {
    setActiveIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const unregister = useCallback((id: string) => {
    setActiveIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ register, unregister }),
    [register, unregister]
  );

  return (
    <LoadingContext value={value}>
      {children}
      <LoadingBackdropModal visible={activeIds.size > 0} />
    </LoadingContext>
  );
};
