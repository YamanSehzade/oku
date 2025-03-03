import { Book } from '../utils/books';

// LocalStorage key'leri
const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  BOOKMARKS: 'bookmarks',
} as const;

// Yer imi tipi
type Bookmark = {
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

// Yer imleri için işlemler
export const getBookmarks = (): Bookmark[] => {
  return getItem<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, []);
};

export const setBookmarks = (bookmarks: Bookmark[]): void => {
  setItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
};

export const addOrUpdateBookmark = (book: Book, page: number): void => {
  const bookmarks = getBookmarks();
  const existingIndex = bookmarks.findIndex(b => b.book.link === book.link);

  const newBookmark: Bookmark = {
    book,
    page,
    lastReadAt: new Date().toISOString(),
  };

  if (existingIndex !== -1) {
    bookmarks[existingIndex] = newBookmark;
  } else {
    bookmarks.push(newBookmark);
  }

  setBookmarks(bookmarks);
};

export const removeBookmark = (book: Book): void => {
  const bookmarks = getBookmarks();
  setBookmarks(bookmarks.filter(b => b.book.link !== book.link));
};

export const getBookmark = (book: Book): Bookmark | undefined => {
  const bookmarks = getBookmarks();
  return bookmarks.find(b => b.book.link === book.link);
};

export const isBookmarked = (book: Book): boolean => {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.book.link === book.link);
};
