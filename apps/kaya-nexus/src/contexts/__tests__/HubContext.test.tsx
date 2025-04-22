import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { HubProvider, useHub } from '../HubContext';
import * as hubsLib from '../../lib/hubs';
import type { HubConfig } from '@/types/hub';

// Composant de test pour accéder au contexte
function TestComponent() {
  const { currentHub, setCurrentHub, hubs } = useHub();
  
  return (
    <div>
      <div data-testid="current-hub">{currentHub ? currentHub.name : 'Aucun hub'}</div>
      <div data-testid="hubs-count">{hubs.length}</div>
      <button 
        data-testid="change-hub" 
        onClick={() => hubs.length > 1 && setCurrentHub(hubs[1])}
      >
        Changer de hub
      </button>
    </div>
  );
}

describe('HubContext', () => {
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

  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: jest.fn(() => {
        store = {};
      })
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });

  beforeEach(() => {
    jest.spyOn(hubsLib, 'getHubs').mockReturnValue(mockHubs);
    jest.spyOn(hubsLib, 'getDefaultHub').mockReturnValue(mockHubs[0]);
    localStorageMock.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fournit les hubs de la librairie', () => {
    render(
      <HubProvider>
        <TestComponent />
      </HubProvider>
    );
    
    expect(screen.getByTestId('hubs-count').textContent).toBe('2');
  });

  it('utilise le hub par défaut lors de l\'initialisation', () => {
    render(
      <HubProvider>
        <TestComponent />
      </HubProvider>
    );
    
    expect(screen.getByTestId('current-hub').textContent).toBe('France');
  });

  it('permet de changer de hub avec setCurrentHub', async () => {
    render(
      <HubProvider>
        <TestComponent />
      </HubProvider>
    );
    
    // État initial
    expect(screen.getByTestId('current-hub').textContent).toBe('France');
    
    // Changer de hub
    await act(async () => {
      screen.getByTestId('change-hub').click();
    });
    
    // Nouveau hub sélectionné
    expect(screen.getByTestId('current-hub').textContent).toBe('États-Unis');
    
    // Vérifie que le localStorage a été mis à jour
    expect(localStorageMock.setItem).toHaveBeenCalledWith('selectedHub', 'us');
  });

  it('récupère le hub sélectionné du localStorage au démarrage', () => {
    // Préréglage du localStorage avec un hub sélectionné
    localStorageMock.getItem.mockReturnValueOnce('us');
    
    render(
      <HubProvider>
        <TestComponent />
      </HubProvider>
    );
    
    // Doit avoir récupéré le hub 'us' du localStorage
    expect(screen.getByTestId('current-hub').textContent).toBe('États-Unis');
  });

  it('ignore les ID de hub invalides dans localStorage', () => {
    // Préréglage du localStorage avec un hub qui n'existe pas
    localStorageMock.getItem.mockReturnValueOnce('invalid-id');
    
    render(
      <HubProvider>
        <TestComponent />
      </HubProvider>
    );
    
    // Doit utiliser le hub par défaut puisque l'ID est invalide
    expect(screen.getByTestId('current-hub').textContent).toBe('France');
  });
});
