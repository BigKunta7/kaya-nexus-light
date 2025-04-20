/**
 * Provider global pour Next.js App Router : i18n, Hub et Langue.
 * @module App/Providers
 */
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { HubProvider } from '../contexts/HubContext';
import { LanguageProvider } from '../contexts/LanguageContext';

export default function Providers({ children, locale, messages }: { children: React.ReactNode; locale: string; messages: any }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider>
        <HubProvider>
          {children}
        </HubProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
