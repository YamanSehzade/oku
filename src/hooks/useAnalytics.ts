import { useEffect, useRef } from 'react';
import { Book } from '../types/book';
import * as analytics from '../utils/analytics';

export const useAnalytics = () => {
  const analyticsRef = useRef(analytics);
  const sessionStartTimeRef = useRef<number>(Date.now());
  const lastPageRef = useRef<string>('');
  const pageTransitionStartRef = useRef<number>(0);
  const publisherStatsRef = useRef<Map<string, { bookCount: number; totalReadTime: number }>>(
    new Map()
  );

  // Sayfa görüntüleme takibi için hook
  const usePageView = (pageName: string) => {
    useEffect(() => {
      analyticsRef.current.logPageView(pageName);

      // Sayfa geçiş süresini hesapla
      if (lastPageRef.current) {
        const transitionDuration = Date.now() - pageTransitionStartRef.current;
        analyticsRef.current.logPageTransition(lastPageRef.current, pageName, transitionDuration);
      }

      lastPageRef.current = pageName;
      pageTransitionStartRef.current = Date.now();
    }, [pageName]);
  };

  // Kitap görüntüleme takibi için hook
  const useBookView = (book: Book) => {
    useEffect(() => {
      analyticsRef.current.logBookView(book.name, book.name, {
        publisher: book.publisher,
        writer: book.writer || '',
        series: book.series || '',
      });
    }, [book]);
  };

  // Kitap okuma süresi ve hız takibi için hook
  const useBookReadingTime = (book: Book) => {
    const startTimeRef = useRef<number>(Date.now());
    const lastPageChangeRef = useRef<number>(Date.now());
    const currentPageRef = useRef<number>(1);

    useEffect(() => {
      analyticsRef.current.logBookReadStart(book.name, book.name);

      return () => {
        const readingDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        analyticsRef.current.logBookReadComplete(book.name, book.name, readingDuration);

        // Okuma istatistiklerini hesapla
        const timePerPage = (Date.now() - lastPageChangeRef.current) / currentPageRef.current;
        analyticsRef.current.logReadingStats(
          book.name,
          book.pageCount,
          currentPageRef.current,
          timePerPage
        );

        // Okuma hızını hesapla (sayfa/dakika)
        const pagesPerMinute = (currentPageRef.current / readingDuration) * 60;
        analyticsRef.current.logReadingSpeed(book.name, pagesPerMinute);

        // Publisher istatistiklerini güncelle
        const stats = publisherStatsRef.current.get(book.publisher) || {
          bookCount: 0,
          totalReadTime: 0,
        };
        stats.bookCount++;
        stats.totalReadTime += readingDuration;
        publisherStatsRef.current.set(book.publisher, stats);

        // Publisher istatistiklerini gönder
        analyticsRef.current.logPublisherStats(
          book.publisher,
          stats.bookCount,
          stats.totalReadTime,
          stats.totalReadTime / stats.bookCount
        );
      };
    }, [book]);

    // Sayfa değişikliğini takip et
    const updatePage = (newPage: number) => {
      currentPageRef.current = newPage;
      lastPageChangeRef.current = Date.now();

      analyticsRef.current.logBookProgress(book.name, book.name, newPage, book.pageCount);
    };

    return { updatePage };
  };

  // Kullanıcı etkileşim takibi için hook
  const useUserInteraction = () => {
    const handleInteraction = (
      interactionType: string,
      targetElement: string,
      additionalParams?: any
    ) => {
      analyticsRef.current.logUserInteraction(interactionType, targetElement, additionalParams);
    };

    return { handleInteraction };
  };

  // Oturum takibi için hook
  useEffect(() => {
    analyticsRef.current.logSessionStart();

    return () => {
      const sessionDuration = Math.floor((Date.now() - sessionStartTimeRef.current) / 1000);
      analyticsRef.current.logSessionEnd(sessionDuration);
    };
  }, []);

  return {
    ...analyticsRef.current,
    usePageView,
    useBookView,
    useBookReadingTime,
    useUserInteraction,
  };
};

export default useAnalytics;
