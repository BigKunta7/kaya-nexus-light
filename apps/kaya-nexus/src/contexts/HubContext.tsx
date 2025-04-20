/**
 * Contexte React pour la gestion du hub sélectionné (persistance locale).
 * @module Contexts/HubContext
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDefaultHub, getHubs } from '../lib/hubs';
import type { HubConfig } from '../types/hub';

interface HubContextProps {
  hub: HubConfig;
  setHub: (hub: HubConfig) => void;
  hubs: HubConfig[];
}

const HubContext = createContext<HubContextProps | undefined>(undefined);

export const HubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hubs = getHubs();
  const [hub, setHubState] = useState<HubConfig>(getDefaultHub());

  useEffect(() => {
    const stored = localStorage.getItem('selectedHub');
    if (stored) {
      const found = hubs.find(h => h.id === stored);
      if (found) setHubState(found);
    }
  }, [hubs]);

  const setHub = (hub: HubConfig) => {
    setHubState(hub);
    localStorage.setItem('selectedHub', hub.id);
  };

  return (
    <HubContext.Provider value={{ hub, setHub, hubs }}>
      {children}
    </HubContext.Provider>
  );
};

export function useHub() {
  const ctx = useContext(HubContext);
  if (!ctx) throw new Error('useHub doit être utilisé dans un HubProvider');
  return ctx;
}
