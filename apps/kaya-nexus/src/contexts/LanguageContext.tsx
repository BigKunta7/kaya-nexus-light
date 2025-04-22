"use client";

/**
 * Contexte React pour la gestion de la langue sélectionnée (persistance locale).
 * @module Contexts/LanguageContext
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentLocale, switchLocale, Locale } from '@/i18n';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  languages: { code: string; label: string }[];
}

const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'gwp', label: 'Gwadloupéen' }
];

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialiser avec la langue actuelle
  const [language, setLanguageState] = useState<string>('fr');

  useEffect(() => {
    // Côté client uniquement
    if (typeof window !== 'undefined') {
      // Essayer d'abord localStorage
      const stored = localStorage.getItem('selectedLanguage');
      if (stored && LANGUAGES.some(lang => lang.code === stored)) {
        setLanguageState(stored);
      } else {
        // Sinon utiliser la langue des cookies
        const cookieLocale = getCurrentLocale();
        setLanguageState(cookieLocale);
      }
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('selectedLanguage', lang);
    
    // Synchroniser avec les cookies si c'est une langue supportée
    if (lang === 'fr' || lang === 'en') {
      switchLocale(lang as Locale);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé à l\'intérieur d\'un LanguageProvider');
  }
  return context;
};
