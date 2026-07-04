import { createSafeContext } from '../../../utility/factories';

export interface LoadingContextValue {
  register(id: string): void;
  unregister(id: string): void;
}

export const [LoadingContext, useLoadingContext] =
  createSafeContext<LoadingContextValue>(
    'useLoadingContext must be used within a LoadingProvider'
  );
