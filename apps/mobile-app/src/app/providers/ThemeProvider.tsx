import React, { PropsWithChildren } from 'react';
import { ThemeProvider as RestyleProvider } from '@shopify/restyle';
import { theme } from '@boilerplate/ui-primitives';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <RestyleProvider theme={theme}>
      {children}
    </RestyleProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';
