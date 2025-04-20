import { render, screen, fireEvent } from '@testing-library/react';
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
    hub: mockHubs[0],
    setHub: jest.fn(),
    hubs: mockHubs
  }),
  HubProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock des fonctions getHubs pour éviter l'erreur isHubConfig
jest.mock('../../src/lib/hubs', () => ({
  getHubs: jest.fn(() => mockHubs),
  getDefaultHub: jest.fn(() => mockHubs[0]),
  getHubById: jest.fn((hubs: HubConfig[], id: string) => hubs.find(h => h.id === id))
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
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('États-Unis')).toBeInTheDocument();
  });
});
