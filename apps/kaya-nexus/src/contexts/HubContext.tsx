/**
 * Contexte React pour la gestion du hub sélectionné (persistance locale).
 * @module Contexts/HubContext
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDefaultHub, getHubs } from '../lib/hubs';
import type { HubConfig } from '../types/hub';

interface HubContextType {
  currentHub: HubConfig | null;
  setCurrentHub: (hub: HubConfig) => void;
  hubs: HubConfig[];
}

const HubContext = createContext<HubContextType>({
  currentHub: null,
  setCurrentHub: () => {},
  hubs: [],
});

export const useHub = () => useContext(HubContext);

export const HubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hubs = getHubs();
  const [currentHub, setCurrentHub] = useState<HubConfig | null>(getDefaultHub());

  useEffect(() => {
    const stored = localStorage.getItem('selectedHub');
    if (stored) {
      const found = hubs.find(h => h.id === stored);
      if (found) setCurrentHub(found);
    }
  }, [hubs]);

  const handleSetCurrentHub = (hub: HubConfig) => {
    setCurrentHub(hub);
    localStorage.setItem('selectedHub', hub.id);
  };

  return (
    <HubContext.Provider value={{ currentHub, setCurrentHub: handleSetCurrentHub, hubs }}>
      {children}
    </HubContext.Provider>
  );
};
