import React from 'react';
import { AppProvider } from './AppContext';
import { FavoritesProvider } from './FavoritesContext';
import { LastReadProvider } from './LastReadContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <LastReadProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </LastReadProvider>
    </AppProvider>
  );
};
