import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  addToFavorites,
  getFavorites,
  isInFavorites,
  removeFromFavorites,
} from '../helpers/localStorage.helper';
import { Book } from '../types/book';

// Context için tip tanımlaması
type FavoritesContextType = {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (book: Book) => void;
  isFavorite: (book: Book) => boolean;
  toggleFavorite: (book: Book) => void;
};

// Context'i oluştur
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider bileşeni
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  // İlk yüklemede favorileri localStorage'dan al
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const addFavorite = (book: Book) => {
    addToFavorites(book);
    setFavorites(getFavorites());
  };

  const removeFavorite = (book: Book) => {
    removeFromFavorites(book);
    setFavorites(getFavorites());
  };

  const isFavorite = (book: Book) => {
    return isInFavorites(book);
  };

  const toggleFavorite = (book: Book) => {
    if (isFavorite(book)) {
      removeFavorite(book);
    } else {
      addFavorite(book);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites hook must be used within a FavoritesProvider');
  }
  return context;
};
