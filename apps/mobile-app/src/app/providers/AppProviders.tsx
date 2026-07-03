import React, { PropsWithChildren } from 'react';
import { ComposeProviders } from './ComposeProviders';
import { I18nProvider } from './I18nProvider';
import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';
import { LoadingProvider } from '@boilerplate/ui-primitives';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ComposeProviders
      components={[
        I18nProvider,
        ThemeProvider,
        QueryProvider,
      ]}
    >
      {children}
    </ComposeProviders>
  );
};
