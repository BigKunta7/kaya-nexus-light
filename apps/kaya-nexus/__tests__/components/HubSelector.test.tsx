/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
    currentHub: null,
    setCurrentHub: jest.fn(),
    hubs: mockHubs
  })
}));

describe('HubSelector', () => {
  it('affiche le composant', () => {
    render(<HubSelector />);
    const labelElement = screen.getByText(/Hub/i);
    expect(labelElement).toBeTruthy();
  });

  it('affiche un sélecteur de hub', () => {
    render(<HubSelector />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeTruthy();
  });

  it('affiche la liste des hubs disponibles', () => {
    render(<HubSelector />);
    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeTruthy();
    const franceOption = screen.getByText('France');
    const usOption = screen.getByText('États-Unis');
    expect(franceOption).toBeTruthy();
    expect(usOption).toBeTruthy();
  });
});
