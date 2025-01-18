import React, { createContext, useState, useContext } from 'react';

const SetupContext = createContext(null);

export const useSetup = () => useContext(SetupContext);

export const SetupProvider = ({ children }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  return (
    <SetupContext.Provider value={{ isSetupComplete, setIsSetupComplete }}>
      {children}
    </SetupContext.Provider>
  );
};
