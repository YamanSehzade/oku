import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../utils/books';

// Context için tip tanımlaması
interface FavoritesContextType {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (book: Book) => void;
  isFavorite: (book: Book) => boolean;
}

// Context'i oluştur
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Local Storage key
const STORAGE_KEY = 'favorites';

// Provider bileşeni
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Book[]>(() => {
    // Local storage'dan favori kitapları yükle
    const savedFavorites = localStorage.getItem(STORAGE_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Favoriler değiştiğinde local storage'ı güncelle
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Favori kitap ekleme
  const addFavorite = (book: Book) => {
    setFavorites(prev => [...prev, book]);
  };

  // Favori kitap çıkarma
  const removeFavorite = (book: Book) => {
    setFavorites(prev => prev.filter(b => b.link !== book.link));
  };

  // Kitabın favori olup olmadığını kontrol etme
  const isFavorite = (book: Book) => {
    return favorites.some(b => b.link === book.link);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 