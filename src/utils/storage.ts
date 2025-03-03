import { Book } from '../types/book';

export const saveLastReadBook = (book: Book) => {
  try {
    localStorage.setItem('lastReadBook', JSON.stringify(book));
  } catch (error) {
    console.error('Son okunan kitap kaydedilemedi:', error);
  }
};
