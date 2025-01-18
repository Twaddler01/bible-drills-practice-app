// contexts/SetupContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface SetupContextType {
  selectedColor: string;
  selectedBibleVersion: string;
  setSelectedColor: (color: string) => void;
  setSelectedBibleVersion: (version: string) => void;
  isSetupComplete: boolean;
  setIsSetupComplete: (completed: boolean) => void;
}

const SetupContext = createContext<SetupContextType | undefined>(undefined);

export function useSetup() {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error('useSetup must be used within a SetupProvider');
  }
  return context;
}

export const SetupProvider: React.FC = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedBibleVersion, setSelectedBibleVersion] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  return (
    <SetupContext.Provider
      value={{
        selectedColor,
        selectedBibleVersion,
        setSelectedColor,
        setSelectedBibleVersion,
        isSetupComplete,
        setIsSetupComplete,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};
