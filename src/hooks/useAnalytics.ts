import * as analytics from '@/utils/analytics';
import { useEffect, useRef } from 'react';

export const useAnalytics = () => {
  const analyticsRef = useRef(analytics);

  // Sayfa görüntüleme takibi için hook
  const usePageView = (pageName: string) => {
    useEffect(() => {
      analyticsRef.current.logPageView(pageName);
    }, [pageName]);
  };

  // Kitap görüntüleme takibi için hook
  const useBookView = (bookId: string, bookTitle: string) => {
    useEffect(() => {
      analyticsRef.current.logBookView(bookId, bookTitle);
    }, [bookId, bookTitle]);
  };

  // Kitap okuma süresi takibi için hook
  const useBookReadingTime = (bookId: string, bookTitle: string) => {
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
      analyticsRef.current.logBookReadStart(bookId, bookTitle);

      return () => {
        const readingDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        analyticsRef.current.logBookReadComplete(bookId, bookTitle, readingDuration);
      };
    }, [bookId, bookTitle]);
  };

  return {
    ...analyticsRef.current,
    usePageView,
    useBookView,
    useBookReadingTime,
  };
};

export default useAnalytics;
