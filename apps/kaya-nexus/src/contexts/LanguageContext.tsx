/**
 * Contexte React pour la gestion de la langue sélectionnée (persistance locale).
 * @module Contexts/LanguageContext
 */
import React, { createContext, useContext, useEffect, useState } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  languages: { code: string; label: string }[];
}

const LANGUAGES = [
  { code: 'fr-FR', label: 'Français' },
  { code: 'en-US', label: 'English' },
  { code: 'gwp', label: 'Gwadloupéen' }
];

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('fr-FR');

  useEffect(() => {
    const stored = localStorage.getItem('selectedLanguage');
    if (stored) setLanguageState(stored);
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage doit être utilisé dans un LanguageProvider');
  return ctx;
}
