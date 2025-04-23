import '@testing-library/jest-dom';
import React from 'react';

// Mock virtuel pour next/server
try {
  jest.mock(
    'next/server',
    () => ({
      __esModule: true,
      NextResponse: {
        json: (body: any, init?: any) => ({ status: init?.status || 200, body })
      },
      NextRequest: class {},
    }),
    { virtual: true }
  );
} catch {
  // ignore
}

// Mock virtuel pour next/navigation
try {
  jest.mock(
    'next/navigation',
    () => ({
      __esModule: true,
      useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), pathname: '/', query: {} }),
    }),
    { virtual: true }
  );
} catch {
  // ignore
}

// Mock global next/navigation simplifié (si non déjà mocké virtuellement)
try {
  jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
    usePathname: () => '/',
  }));
} catch {
  // ignore
}

export {};

// Mock virtuel pour next/image (module inexistant dans l'environnement Jest)
try {
  jest.mock(
    'next/image',
    () => ({
      __esModule: true,
      default: (props: any) => React.createElement('img', props)
    }),
    { virtual: true }
  );
} catch {
  // ignore si jest.mock n'est pas dispo dans ce contexte
}
