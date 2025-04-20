import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../src/contexts/LanguageContext';
import { LanguageSwitcher } from '../../src/components/ui/LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('affiche la liste des langues et permet la sélection', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );
    expect(screen.getByLabelText(/langue/i)).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'en-US' } });
    expect((select as HTMLSelectElement).value).toBe('en-US');
  });
});
