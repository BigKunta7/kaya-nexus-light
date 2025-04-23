/**
 * Tests pour le contexte de langue (LanguageContext)
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { LanguageProvider, useLanguage } from '../LanguageContext';

// Composant de test pour accéder au contexte
function TestLanguageComponent() {
  const { language, setLanguage, languages } = useLanguage();
  
  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <div data-testid="languages-count">{languages.length}</div>
      <button 
        data-testid="change-language" 
        onClick={() => setLanguage('en-US')}
      >
        Changer de langue
      </button>
    </div>
  );
}

describe('LanguageContext', () => {
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
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('utilise par défaut le français comme langue initiale', () => {
    render(
      <LanguageProvider>
        <TestLanguageComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('current-language').textContent).toBe('fr');
  });

  it('fournit la liste des langues disponibles', () => {
    render(
      <LanguageProvider>
        <TestLanguageComponent />
      </LanguageProvider>
    );
    
    // Vérifier qu'il y a 3 langues (fr-FR, en-US, gwp)
    expect(screen.getByTestId('languages-count').textContent).toBe('3');
  });

  it('permet de changer de langue', async () => {
    render(
      <LanguageProvider>
        <TestLanguageComponent />
      </LanguageProvider>
    );
    
    // État initial
    expect(screen.getByTestId('current-language').textContent).toBe('fr');
    
    // Changer de langue
    await act(async () => {
      screen.getByTestId('change-language').click();
    });
    
    // Nouvelle langue sélectionnée
    expect(screen.getByTestId('current-language').textContent).toBe('en-US');
    
    // Vérifie que le localStorage a été mis à jour
    expect(localStorageMock.setItem).toHaveBeenCalledWith('selectedLanguage', 'en-US');
  });

  it('récupère la langue sélectionnée du localStorage au démarrage', () => {
    // Préréglage du localStorage avec une langue sélectionnée
    localStorageMock.getItem.mockReturnValueOnce('gwp');
    
    render(
      <LanguageProvider>
        <TestLanguageComponent />
      </LanguageProvider>
    );
    
    // Doit avoir récupéré la langue 'gwp' du localStorage
    expect(screen.getByTestId('current-language').textContent).toBe('gwp');
  });

  it('lance une erreur si useLanguage est utilisé en dehors d\'un LanguageProvider', () => {
    // Supprime temporairement console.error pour éviter la pollution dans les logs de test
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    // Tentative d'utilisation du hook en dehors du Provider doit lancer une erreur
    expect(() => {
      render(<TestLanguageComponent />);
    }).toThrow('useLanguage doit être utilisé à l\'intérieur d\'un LanguageProvider');
    
    // Restaure console.error
    console.error = originalConsoleError;
  });
});
