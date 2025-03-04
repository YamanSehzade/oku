import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLastRead } from '../../context/LastReadContext';
import useAnalytics from '../../hooks/useAnalytics';
import { BookImage } from './components/BookImage';
import { BottomBar } from './components/BottomBar';
import { EdgeControls } from './components/EdgeControls';
import { TopBar } from './components/TopBar';
import { useBookAnimation } from './hooks/useBookAnimation';
import { useBookEvents } from './hooks/useBookEvents';
import { useBookImage } from './hooks/useBookImage';
import { styles } from './styles';

const BookDetailPage = () => {
  const { selectedBook, setSelectedBook } = useApp();
  const { getLastRead, saveLastRead } = useLastRead();
  const analytics = useAnalytics();

  // Kitabın son okunan sayfasını al veya 1'den başla
  const [currentPage, setCurrentPage] = useState(() => {
    if (!selectedBook) return 1;
    return getLastRead(selectedBook) || 2;
  });

  const [imageError, setImageError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Yardımcı fonksiyonlar
  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const isClickableElement = useCallback((target: HTMLElement): boolean => {
    return Boolean(
      target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.tagName === 'svg' ||
        target.tagName === 'path'
    );
  }, []);

  // Hook'ları kullan
  const { controls, animatePageChange } = useBookAnimation({
    setCurrentPage,
    setImageError,
    scrollToTop,
    currentPage,
  });

  const handlePageChange = useCallback(
    async (newPage: number) => {
      if (newPage > 0 && newPage <= (selectedBook?.pageCount || 0)) {
        await animatePageChange('direct', newPage);
      }
    },
    [animatePageChange, selectedBook?.pageCount]
  );

  const { handleInteraction, handleDragEnd, handleEdgeControl } = useBookEvents({
    currentPage,
    imageError,
    handlePageChange,
    controls,
    isClickableElement,
  });

  const { currentImageUrl, nextImageUrl, prevImageUrl } = useBookImage({
    book: selectedBook || undefined,
    currentPage,
    imageError,
  });

  // Kitap bittiğinde sayfa sayısını düzelt
  useEffect(() => {
    if (imageError && selectedBook) {
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
  }, [imageError, selectedBook]);

  // Klavye event listener'ı
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleInteraction('keyboard', e);
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction]);

  // Sayfa değiştiğinde otomatik kaydet
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (selectedBook) {
        saveLastRead(selectedBook, currentPage, imageError);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(saveTimeout);
  }, [selectedBook, currentPage, imageError, saveLastRead]);

  // Kontrol sınıfları
  const controlsClassName = useMemo(() => {
    return `${styles.controls.base} ${showControls ? styles.controls.visible : styles.controls.hidden}`;
  }, [showControls]);

  // Buton sınıfları
  const buttonClassName = useMemo(() => styles.controls.button, []);

  // Analytics hook'larını kullan
  analytics.usePageView('book_detail');
  analytics.useBookView(
    selectedBook || {
      name: '',
      writer: null,
      publisher: '',
      series: null,
      pageCount: 0,
      link: '',
    }
  );
  const { updatePage } = analytics.useBookReadingTime(
    selectedBook || {
      name: '',
      writer: null,
      publisher: '',
      series: null,
      pageCount: 0,
      link: '',
    }
  );

  // Sayfa değişikliğini takip et
  useEffect(() => {
    if (selectedBook) {
      updatePage(currentPage);
    }
  }, [currentPage, updatePage, selectedBook]);

  if (!selectedBook) return null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-white dark:bg-gray-900">
      <TopBar
        book={selectedBook}
        controlsClassName={controlsClassName}
        onGoBack={() => setSelectedBook(null)}
      />

      {/* Ana İçerik */}
      <motion.div
        className={`${styles.content.wrapper} dark:bg-gray-900`}
        onClick={() => setShowControls(prev => !prev)}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <div ref={containerRef} className={styles.content.container}>
          <motion.div
            animate={controls}
            className={`${styles.content.imageContainer} dark:bg-gray-900`}
            style={{ ...styles.motion.base }}
            drag={false}
          >
            <BookImage
              book={selectedBook}
              currentPage={currentPage}
              imageError={imageError}
              currentImageUrl={currentImageUrl}
              onError={() => setImageError(true)}
              onGoBack={() => setSelectedBook(null)}
            />
          </motion.div>
        </div>

        <EdgeControls onEdgeControl={handleEdgeControl} />
      </motion.div>

      <BottomBar
        book={selectedBook}
        currentPage={currentPage}
        controlsClassName={controlsClassName}
        buttonClassName={buttonClassName}
        imageError={imageError}
        onPageChange={handlePageChange}
      />

      {/* Görünmez preload görselleri */}
      {!imageError && (
        <div className="hidden">
          <img src={nextImageUrl} alt="next" />
          {prevImageUrl && <img src={prevImageUrl} alt="prev" />}
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;
