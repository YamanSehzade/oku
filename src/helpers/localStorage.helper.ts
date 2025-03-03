import { LastReadPage } from '../context/LastReadContext';
import { Book } from '../utils/books';

// LocalStorage key'leri
const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  LAST_READ_PAGES: 'lastReadPages',
} as const;

// LocalStorage'dan veri okuma
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// LocalStorage'a veri yazma
const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('LocalStorage yazma hatası:', error);
  }
};

// Favoriler için işlemler
export const getFavorites = (): Book[] => {
  const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (favorites: Book[]): void => {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
};

export const addToFavorites = (book: Book): void => {
  const favorites = getFavorites();
  if (!favorites.some(f => f.link === book.link)) {
    saveFavorites([...favorites, book]);
  }
};

export const removeFromFavorites = (book: Book): void => {
  const favorites = getFavorites();
  saveFavorites(favorites.filter(f => f.link !== book.link));
};

export const isInFavorites = (book: Book): boolean => {
  const favorites = getFavorites();
  return favorites.some(f => f.link === book.link);
};

// Son okunan sayfalar için işlemler
export const getLastReadPages = (): LastReadPage[] => {
  const lastReadPages = localStorage.getItem(STORAGE_KEYS.LAST_READ_PAGES);
  if (!lastReadPages) return [];

  const parsed = JSON.parse(lastReadPages);
  // Eski kayıtlar için isFinished özelliğini ekle
  return parsed.map((page: any) => ({
    ...page,
    isFinished: page.isFinished ?? false,
  }));
};

export const saveLastReadPage = (lastReadPage: LastReadPage): void => {
  const lastReadPages = getLastReadPages();
  const updatedLastReadPages = [
    ...lastReadPages.filter(lrp => lrp.book.link !== lastReadPage.book.link),
    lastReadPage,
  ];
  localStorage.setItem(STORAGE_KEYS.LAST_READ_PAGES, JSON.stringify(updatedLastReadPages));
};

export const getLastReadPage = (book: Book): LastReadPage | undefined => {
  const pages = getLastReadPages();
  return pages.find(p => p.book.link === book.link);
};
