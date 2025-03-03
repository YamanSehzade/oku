import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  addOrUpdateBookmark,
  getBookmark,
  getBookmarks,
  isBookmarked,
  removeBookmark,
} from '../helpers/localStorage.helper';
import { Book } from '../utils/books';

type Bookmark = {
  book: Book;
  page: number;
  lastReadAt: string;
};

type BookmarksContextType = {
  bookmarks: Bookmark[];
  addBookmark: (book: Book, page: number) => void;
  removeBookmark: (book: Book) => void;
  isBookmarked: (book: Book) => boolean;
  getBookmark: (book: Book) => Bookmark | undefined;
};

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // İlk yüklemede yer imlerini localStorage'dan al
  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleAddBookmark = (book: Book, page: number) => {
    addOrUpdateBookmark(book, page);
    setBookmarks(getBookmarks());
  };

  const handleRemoveBookmark = (book: Book) => {
    removeBookmark(book);
    setBookmarks(getBookmarks());
  };

  const handleIsBookmarked = (book: Book) => {
    return isBookmarked(book);
  };

  const handleGetBookmark = (book: Book) => {
    return getBookmark(book);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmark: handleAddBookmark,
        removeBookmark: handleRemoveBookmark,
        isBookmarked: handleIsBookmarked,
        getBookmark: handleGetBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error('useBookmarks hook must be used within a BookmarksProvider');
  }
  return context;
};
