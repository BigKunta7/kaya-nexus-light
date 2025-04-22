"use client";
import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { HubProvider } from './HubContext';
import { LanguageProvider } from './LanguageContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <HubProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </HubProvider>
    </AuthProvider>
  );
}
