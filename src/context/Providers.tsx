import React from 'react';
import { AppProvider } from './AppContext';
import { FavoritesProvider } from './FavoritesContext';
import { LastReadProvider } from './LastReadContext';
import { ThemeProvider } from './ThemeContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <ThemeProvider>
        <LastReadProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </LastReadProvider>
      </ThemeProvider>
    </AppProvider>
  );
};
