import { render, screen } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import React from 'react';

// Mock du LanguageContext
jest.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'fr-FR',
    setLanguage: jest.fn(),
    languages: [
      { code: 'fr-FR', label: 'Français' },
      { code: 'en-US', label: 'English' }
    ]
  }),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('LanguageSwitcher', () => {
  it('affiche le composant', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText(/Langue/i)).toBeInTheDocument();
  });

  it('affiche les options de langue disponibles', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
