/**
 * Sélecteur de langue pour Kaya Nexus.
 * Permet à l'utilisateur de changer la langue de l'interface.
 * @module Components/UI/LanguageSwitcher
 */

'use client';

import * as React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LANGUAGES = [
  { code: 'fr-FR', label: 'Français' },
  { code: 'en-US', label: 'English' },
  // Ajouter d'autres langues ici
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, languages } = useLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    // TODO: Intégrer le changement de langue avec next-intl
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="lang-switcher" className="text-sm font-medium">Langue&nbsp;:</label>
      <select
        id="lang-switcher"
        value={language}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      >
        {(languages ?? LANGUAGES).map((l: { code: string; label: string }) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
};
