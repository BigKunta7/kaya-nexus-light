import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('affiche le composant', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('Sélectionner une langue')).toBeInTheDocument();
  });
  it('vérifie la présence d’un bouton', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
