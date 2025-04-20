/**
 * Sélecteur de hub territorial pour Kaya Nexus.
 * Permet à l'utilisateur de choisir son hub (territoire/région).
 * @module Components/UI/HubSelector
 */

'use client';

import * as React from 'react';
import { useHub } from '../../contexts/HubContext';

export const HubSelector: React.FC = () => {
  const { hub: selectedHub, setHub, hubs } = useHub();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const hub = hubs.find(h => h.id === event.target.value);
    if (hub) setHub(hub);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="hub-selector" className="text-sm font-medium">Hub&nbsp;:</label>
      <select
        id="hub-selector"
        value={selectedHub.id}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      >
        {hubs.map(hub => (
          <option key={hub.id} value={hub.id}>
            {hub.name}
          </option>
        ))}
      </select>
    </div>
  );
};
