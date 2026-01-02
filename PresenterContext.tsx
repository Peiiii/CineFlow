
import React, { createContext, useContext } from 'react';
import { Presenter, presenter as presenterInstance } from './Presenter';

const PresenterContext = createContext<Presenter | null>(null);

export const PresenterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PresenterContext.Provider value={presenterInstance}>
      {children}
    </PresenterContext.Provider>
  );
};

export const usePresenter = () => {
  const context = useContext(PresenterContext);
  if (!context) throw new Error("usePresenter must be used within PresenterProvider");
  return context;
};
