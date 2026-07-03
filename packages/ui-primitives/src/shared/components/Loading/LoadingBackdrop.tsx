import { memo, useEffect, useId } from 'react';

import { useLoadingContext } from './context';
import type { LoadingBackdropProps } from './models/loadingBackdrop.model';

const LoadingBackdropBase = (props: LoadingBackdropProps) => {
  const { visible = true } = props;
  const id = useId();
  const { register, unregister } = useLoadingContext();

  useEffect(() => {
    if (visible) {
      register(id);
    } else {
      unregister(id);
    }
    return () => {
      unregister(id);
    };
  }, [visible, id, register, unregister]);

  return null;
};

export const LoadingBackdrop = memo(LoadingBackdropBase);
