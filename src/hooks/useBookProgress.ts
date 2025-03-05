import { useEffect, useRef } from 'react';
import { Book } from '../types/book';
import { logBookProgress } from '../utils/analytics';

const THROTTLE_DELAY = 5000; // 5 saniye
const PAGE_THRESHOLD = 5; // Her 5 sayfada bir güncelleme

interface UseBookProgressProps {
  book: Book;
  currentPage: number;
}

export const useBookProgress = ({ book, currentPage }: UseBookProgressProps) => {
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const lastUpdatedPageRef = useRef<number>(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shouldUpdateProgress = (newPage: number) => {
    const timeSinceLastUpdate = Date.now() - lastUpdateTimeRef.current;
    const pagesSinceLastUpdate = Math.abs(newPage - lastUpdatedPageRef.current);

    return timeSinceLastUpdate >= THROTTLE_DELAY || pagesSinceLastUpdate >= PAGE_THRESHOLD;
  };

  const updateProgress = (newPage: number) => {
    if (shouldUpdateProgress(newPage)) {
      logBookProgress(book.name, book.name, newPage, book.pageCount);
      lastUpdateTimeRef.current = Date.now();
      lastUpdatedPageRef.current = newPage;
    }
  };

  // currentPage değiştiğinde progress'i güncelle
  useEffect(() => {
    // Önceki timeout'u temizle
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Yeni timeout oluştur
    timeoutRef.current = setTimeout(() => {
      updateProgress(currentPage);
    }, THROTTLE_DELAY);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentPage, book]);

  return {
    updateProgress,
  };
};
