import React, { useState } from 'react';
import { Book } from '../types/book';

type AppContextType = {
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <AppContext.Provider value={{ selectedBook, setSelectedBook }}>{children}</AppContext.Provider>
  );
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp hook must be used within an AppProvider');
  }
  return context;
};
