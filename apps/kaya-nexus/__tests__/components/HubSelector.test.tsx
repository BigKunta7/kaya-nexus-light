import { render, screen } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import { HubSelector } from '../../src/components/ui/HubSelector';
import type { HubConfig } from '@/types/hub';

// Mock des données des hubs pour les tests
const mockHubs: HubConfig[] = [
  {
    id: 'fr',
    name: 'France',
    locale: 'fr-FR',
    timezone: 'Europe/Paris',
    currency: 'EUR',
    branding: {
      logoUrl: '/logos/fr.png',
      primaryColor: '#4D72FF',
      secondaryColor: '#FF4D72'
    },
    enabledModules: ['crm', 'finance', 'projects'],
    default: true
  },
  {
    id: 'us',
    name: 'États-Unis',
    locale: 'en-US',
    timezone: 'America/New_York',
    currency: 'USD',
    branding: {
      logoUrl: '/logos/us.png',
      primaryColor: '#2979FF',
      secondaryColor: '#FFAB40'
    },
    enabledModules: ['crm', 'finance', 'projects'],
    default: false
  }
];

// Mock du HubContext
jest.mock('../../src/contexts/HubContext', () => ({
  useHub: () => ({
    currentHub: mockHubs[0],
    setCurrentHub: jest.fn(),
    hubs: mockHubs
  }),
  HubProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('HubSelector', () => {
  it('affiche le composant', () => {
    render(<HubSelector />);
    expect(screen.getByText(/Hub/i)).toBeInTheDocument();
  });

  it('affiche un sélecteur de hub', () => {
    render(<HubSelector />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('affiche la liste des hubs disponibles', () => {
    render(<HubSelector />);
    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('États-Unis')).toBeInTheDocument();
  });
});
