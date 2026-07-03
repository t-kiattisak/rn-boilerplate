import type { ReactNode } from 'react';

export interface LoadingBackdropProps {
  opacity?: number;
  backgroundColor?: string;
  visible?: boolean;
  loadingComponent?: ReactNode;
}
