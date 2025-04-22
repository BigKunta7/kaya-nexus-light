"use client";
import React, { useState, useEffect } from 'react';

// Types simplifiés pour le hub
interface HubConfig {
  id: string;
  name: string;
}

// Liste des hubs disponibles
const HUBS: HubConfig[] = [
  { id: 'fr', name: 'France' },
  { id: 'gwp', name: 'Guadeloupe' },
  { id: 'africa', name: 'Afrique' }
];

const HubSelector: React.FC = () => {
  const [currentHub, setCurrentHubState] = useState<HubConfig>(HUBS[0]);
  
  // Récupérer le hub depuis le localStorage au chargement
  useEffect(() => {
    const storedHubId = localStorage.getItem('selectedHub');
    if (storedHubId) {
      const hub = HUBS.find(h => h.id === storedHubId);
      if (hub) setCurrentHubState(hub);
    }
  }, []);
  
  // Changer le hub et sauvegarder dans le localStorage
  const setCurrentHub = (hub: HubConfig) => {
    setCurrentHubState(hub);
    localStorage.setItem('selectedHub', hub.id);
    // Recharger la page pour appliquer les changements de hub
    window.location.reload();
  };
  
  return (
    <select
      data-testid="hub-selector"
      data-cy="hub-selector"
      aria-label="Sélection du hub"
      value={currentHub?.id}
      onChange={e => {
        const hub = HUBS.find(h => h.id === e.target.value);
        if (hub) setCurrentHub(hub);
      }}
      className="bg-gray-700 text-white border border-gray-600 rounded p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {HUBS.map((hub: HubConfig) => (
        <option key={hub.id} value={hub.id}>
          {hub.name}
        </option>
      ))}
    </select>
  );
};

export default HubSelector;
