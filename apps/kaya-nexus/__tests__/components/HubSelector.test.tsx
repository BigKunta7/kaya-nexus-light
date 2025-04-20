import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { HubProvider } from '../../src/contexts/HubContext';
import { HubSelector } from '../../src/components/ui/HubSelector';

describe('HubSelector', () => {
  it('affiche le composant', () => {
    render(
      <HubProvider>
        <HubSelector />
      </HubProvider>
    );
    expect(screen.getByText('Sélectionner un hub')).toBeInTheDocument();
  });
  it('vérifie la présence d’un bouton', () => {
    render(
      <HubProvider>
        <HubSelector />
      </HubProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('affiche la liste des hubs et permet la sélection', () => {
    render(
      <HubProvider>
        <HubSelector />
      </HubProvider>
    );
    expect(screen.getByLabelText(/hub/i)).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'gwp' } });
    expect((select as HTMLSelectElement).value).toBe('gwp');
  });
});
