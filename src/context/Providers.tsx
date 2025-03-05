import React from 'react';
import { SessionProvider } from '../contexts/SessionProvider';
import { AppProvider } from './AppContext';
import { FavoritesProvider } from './FavoritesContext';
import { LastReadProvider } from './LastReadContext';
import { ThemeProvider } from './ThemeContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <AppProvider>
        <ThemeProvider>
          <LastReadProvider>
            <FavoritesProvider>{children}</FavoritesProvider>
          </LastReadProvider>
        </ThemeProvider>
      </AppProvider>
    </SessionProvider>
  );
};
