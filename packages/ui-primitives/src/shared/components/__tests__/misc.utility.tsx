import { theme } from '../../theme';
import { ThemeProvider } from '@shopify/restyle';
import { render, RenderOptions } from '@testing-library/react-native';
import React, { ReactElement } from 'react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export const renderWithTheme = customRender;

export * from '@testing-library/react-native';

