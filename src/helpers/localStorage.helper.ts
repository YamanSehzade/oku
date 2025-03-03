import { Book } from '../utils/books';

// LocalStorage key'leri
const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  LAST_READ: 'lastRead',
} as const;

// Son okunan sayfa tipi
type LastReadPage = {
  book: Book;
  page: number;
  lastReadAt: string;
};

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
  return getItem<LastReadPage[]>(STORAGE_KEYS.LAST_READ, []);
};

export const setLastReadPages = (pages: LastReadPage[]): void => {
  setItem(STORAGE_KEYS.LAST_READ, pages);
};

export const saveLastReadPage = (book: Book, page: number): void => {
  const pages = getLastReadPages();
  const existingIndex = pages.findIndex(p => p.book.link === book.link);

  const newPage: LastReadPage = {
    book,
    page,
    lastReadAt: new Date().toISOString(),
  };

  if (existingIndex !== -1) {
    pages[existingIndex] = newPage;
  } else {
    pages.push(newPage);
  }

  setLastReadPages(pages);
};

export const getLastReadPage = (book: Book): LastReadPage | undefined => {
  const pages = getLastReadPages();
  return pages.find(p => p.book.link === book.link);
};
