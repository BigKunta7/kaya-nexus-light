/**
 * Sélecteur de hub territorial pour Kaya Nexus.
 * Permet à l'utilisateur de choisir son hub (territoire/région).
 * @module Components/UI/HubSelector
 */

'use client';

import * as React from 'react';
import { useHub } from '../../contexts/HubContext';

export const HubSelector: React.FC = () => {
  const { currentHub, setCurrentHub, hubs } = useHub();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const hub = hubs.find(h => h.id === event.target.value);
    if (hub) setCurrentHub(hub);
  };

  // Si aucun hub n'est sélectionné, on prend le premier de la liste
  React.useEffect(() => {
    if (!currentHub && hubs.length > 0) {
      setCurrentHub(hubs[0]);
    }
  }, [currentHub, hubs, setCurrentHub]);

  if (!hubs.length) return null;

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="hub-selector" className="text-sm font-medium">Hub&nbsp;:</label>
      <select
        id="hub-selector"
        value={currentHub?.id || ''}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      >
        {!currentHub && <option value="">Sélectionner un hub</option>}
        {hubs.map(hub => (
          <option key={hub.id} value={hub.id}>
            {hub.name}
          </option>
        ))}
      </select>
    </div>
  );
};
