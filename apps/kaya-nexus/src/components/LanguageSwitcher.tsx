"use client";
import React, { useState, useEffect } from 'react';

/**
 * Composant de sélection de langue
 * Permet à l'utilisateur de changer la langue de l'interface
 */
const LanguageSwitcher: React.FC = () => {
  const [language, setLanguageState] = useState('fr');
  
  // Langues disponibles
  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' }
  ];
  
  // Récupérer la langue depuis les cookies au chargement
  useEffect(() => {
    const storedLanguage = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];
      
    if (storedLanguage && (storedLanguage === 'fr' || storedLanguage === 'en')) {
      setLanguageState(storedLanguage);
    }
  }, []);
  
  // Changer la langue et sauvegarder dans les cookies
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    window.location.reload(); // Recharger la page pour appliquer la nouvelle langue
  };
  
  return (
    <select
      data-testid="language-switcher"
      data-cy="language-switcher"
      aria-label="Sélection de la langue"
      value={language}
      onChange={e => setLanguage(e.target.value)}
      className="bg-gray-700 text-white border border-gray-600 rounded p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
