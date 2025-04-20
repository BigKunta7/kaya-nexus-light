import { render, screen, fireEvent } from '@testing-library/react';
import { HubProvider } from '../../src/contexts/HubContext';
import { HubSelector } from '../../src/components/ui/HubSelector';

describe('HubSelector', () => {
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
