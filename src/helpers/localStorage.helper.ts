import { LastReadPage } from '../context/LastReadContext';
import { Book } from '../types/book';

// LocalStorage key'leri
const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  LAST_READ: 'lastRead',
  LAST_READ_PAGES: 'lastReadPages',
} as const;

// LocalStorage'dan veri okuma
export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// LocalStorage'a veri yazma
export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Favoriler için işlemler
export const getFavorites = (): Book[] => {
  return getItem<Book[]>(STORAGE_KEYS.FAVORITES, []);
};

export const setFavorites = (favorites: Book[]): void => {
  setItem(STORAGE_KEYS.FAVORITES, favorites);
};

export const addToFavorites = (book: Book): void => {
  const favorites = getFavorites();
  if (!favorites.some(f => f.link === book.link)) {
    setFavorites([...favorites, book]);
  }
};

export const removeFromFavorites = (book: Book): void => {
  const favorites = getFavorites();
  setFavorites(favorites.filter(f => f.link !== book.link));
};

export const isInFavorites = (book: Book): boolean => {
  const favorites = getFavorites();
  return favorites.some(f => f.link === book.link);
};

// Son okunan sayfalar için işlemler
export const getLastReadPages = (): LastReadPage[] => {
  return getItem<LastReadPage[]>(STORAGE_KEYS.LAST_READ_PAGES, []);
};

export const saveLastReadPage = (lastReadPage: LastReadPage): void => {
  const lastReadPages = getLastReadPages();
  const updatedLastReadPages = [
    ...lastReadPages.filter(lrp => lrp.book.link !== lastReadPage.book.link),
    lastReadPage,
  ];
  setItem(STORAGE_KEYS.LAST_READ_PAGES, updatedLastReadPages);
};

export const getLastReadPage = (book: Book): LastReadPage | undefined => {
  const pages = getLastReadPages();
  return pages.find(p => p.book.link === book.link);
};

export const getLastRead = (): Book | null => {
  return getItem<Book | null>(STORAGE_KEYS.LAST_READ, null);
};

export const setLastRead = (book: Book | null): void => {
  setItem(STORAGE_KEYS.LAST_READ, book);
};
