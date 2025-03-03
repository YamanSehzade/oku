import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getLastReadPage,
  getLastReadPages,
  saveLastReadPage,
} from '../helpers/localStorage.helper';
import { Book } from '../utils/books';

type LastReadPage = {
  book: Book;
  page: number;
  lastReadAt: string;
};

type LastReadContextType = {
  lastReadPages: LastReadPage[];
  saveLastPage: (book: Book, page: number) => void;
  getLastPage: (book: Book) => number;
};

const LastReadContext = createContext<LastReadContextType | undefined>(undefined);

export const LastReadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastReadPages, setLastReadPages] = useState<LastReadPage[]>([]);

  // İlk yüklemede son okunan sayfaları localStorage'dan al
  useEffect(() => {
    setLastReadPages(getLastReadPages());
  }, []);

  const handleSaveLastPage = (book: Book, page: number) => {
    saveLastReadPage(book, page);
    setLastReadPages(getLastReadPages());
  };

  const handleGetLastPage = (book: Book): number => {
    const lastRead = getLastReadPage(book);
    return lastRead?.page || 1;
  };

  return (
    <LastReadContext.Provider
      value={{
        lastReadPages,
        saveLastPage: handleSaveLastPage,
        getLastPage: handleGetLastPage,
      }}
    >
      {children}
    </LastReadContext.Provider>
  );
};

export const useLastRead = () => {
  const context = useContext(LastReadContext);
  if (context === undefined) {
    throw new Error('useLastRead hook must be used within a LastReadProvider');
  }
  return context;
};
