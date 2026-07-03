import React, { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { defaultNS, i18nLocale } from '../i18n';

export const I18nProvider = ({ children }: PropsWithChildren) => {
  return (
    <I18nextProvider defaultNS={defaultNS} i18n={i18nLocale}>
      {children}
    </I18nextProvider>
  );
};

I18nProvider.displayName = 'I18nProvider';
