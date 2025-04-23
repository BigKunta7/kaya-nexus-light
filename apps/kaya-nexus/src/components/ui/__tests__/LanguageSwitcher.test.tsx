// Mock Next.js navigation pour éviter les erreurs de router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { LanguageProvider } from '../../../contexts/LanguageContext';

// Test unitaire du composant LanguageSwitcher

describe('LanguageSwitcher', () => {
  it('affiche le label et les options de langue', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );
    expect(screen.getByLabelText(/langue/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('change la langue au changement de sélection', async () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'en-US' } });
    await waitFor(() => {
      expect(select.value).toBe('en-US');
    });
  });
});
