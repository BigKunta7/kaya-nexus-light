"use client";
import React, { ReactNode } from 'react';
import { HubProvider } from './HubContext';
import { LanguageProvider } from './LanguageContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <HubProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </HubProvider>
  );
}
