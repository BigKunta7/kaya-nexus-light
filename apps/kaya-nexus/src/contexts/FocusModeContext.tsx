import React, { createContext, useContext, useState } from "react";

interface FocusModeContextProps {
  focus: boolean;
  zen: boolean;
  demo: boolean;
  setFocus: (v: boolean) => void;
  setZen: (v: boolean) => void;
  setDemo: (v: boolean) => void;
}

const FocusModeContext = createContext<FocusModeContextProps | undefined>(undefined);

export function FocusModeProvider({ children }: { children: React.ReactNode }) {
  const [focus, setFocus] = useState(false);
  const [zen, setZen] = useState(false);
  const [demo, setDemo] = useState(false);
  return (
    <FocusModeContext.Provider value={{ focus, zen, demo, setFocus, setZen, setDemo }}>
      {children}
    </FocusModeContext.Provider>
  );
}

export function useFocusMode() {
  const ctx = useContext(FocusModeContext);
  if (!ctx) throw new Error("useFocusMode must be used within FocusModeProvider");
  return ctx;
}
