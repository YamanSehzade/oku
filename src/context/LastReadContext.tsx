import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLastReadPages, saveLastReadPage } from '../helpers/localStorage.helper';
import { Book } from '../utils/books';

export type LastReadPage = {
  book: Book;
  page: number;
  timestamp: number;
};

type LastReadContextType = {
  lastReadPages: LastReadPage[];
  saveLastRead: (book: Book, page: number) => void;
  getLastRead: (book: Book) => number | undefined;
};

const LastReadContext = createContext<LastReadContextType | undefined>(undefined);

export const LastReadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastReadPages, setLastReadPages] = useState<LastReadPage[]>([]);

  // İlk yüklemede son okunan sayfaları localStorage'dan al
  useEffect(() => {
    const storedLastReadPages = getLastReadPages();
    setLastReadPages(storedLastReadPages);
  }, []);

  const saveLastRead = (book: Book, page: number) => {
    const newLastRead: LastReadPage = {
      book,
      page,
      timestamp: Date.now(),
    };

    saveLastReadPage(newLastRead);
    setLastReadPages(prev => {
      const filtered = prev.filter(lrp => lrp.book.link !== book.link);
      return [...filtered, newLastRead];
    });
  };

  const getLastRead = (book: Book): number | undefined => {
    return lastReadPages.find(lrp => lrp.book.link === book.link)?.page;
  };

  return (
    <LastReadContext.Provider
      value={{
        lastReadPages,
        saveLastRead,
        getLastRead,
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
