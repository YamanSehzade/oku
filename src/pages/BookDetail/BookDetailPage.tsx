import { motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLastRead } from '../../context/LastReadContext';
import { books } from '../../utils/books';
import { BookImage } from './components/BookImage';
import { BottomBar } from './components/BottomBar';
import { EdgeControls } from './components/EdgeControls';
import { TopBar } from './components/TopBar';
import { SWIPE_CONF, useBookAnimation } from './hooks/useBookAnimation';
import { useBookEvents } from './hooks/useBookEvents';
import { useBookImage } from './hooks/useBookImage';
import { styles } from './styles';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getLastRead, saveLastRead } = useLastRead();

  // URL'den gelen id'yi decode et ve kitabı bul
  const decodedId = useMemo(() => (id ? decodeURIComponent(id) : ''), [id]);

  const book = useMemo(() => {
    return books.find(b => {
      const urlParts = b.link.split('/');
      const bookId = urlParts[urlParts.length - 1];
      return bookId === decodedId;
    });
  }, [decodedId]);

  // Kitabın son okunan sayfasını al veya 1'den başla
  const [currentPage, setCurrentPage] = useState(() => {
    if (!book) return 1;
    return getLastRead(book) || 2;
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
  });

  const handlePageChange = useCallback(
    async (newPage: number) => {
      if (newPage > 0) {
        if (newPage > currentPage && !imageError) {
          await animatePageChange('next');
        } else if (newPage < currentPage) {
          await animatePageChange('prev');
        }
      }
    },
    [currentPage, imageError, animatePageChange]
  );

  const { handleInteraction, handleDragEnd, handleEdgeControl } = useBookEvents({
    currentPage,
    imageError,
    animatePageChange,
    handlePageChange,
    controls,
    isClickableElement,
  });

  const { currentImageUrl, nextImageUrl, prevImageUrl } = useBookImage({
    book,
    currentPage,
    imageError,
  });

  // Klavye event listener'ı
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleInteraction('keyboard', e);
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction]);

  // Sayfa değiştiğinde otomatik kaydet
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (book) {
        saveLastRead(book, currentPage, imageError);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(saveTimeout);
  }, [book, currentPage, imageError]);

  // Kontrol sınıfları
  const controlsClassName = useMemo(() => {
    return `${styles.controls.base} ${showControls ? styles.controls.visible : styles.controls.hidden}`;
  }, [showControls]);

  // Buton sınıfları
  const buttonClassName = useMemo(() => styles.controls.button, []);

  const handleGoBack = useCallback(() => {
    const previousPath = location.state?.from || '/';
    navigate(previousPath);
  }, [location.state, navigate]);

  // Screen tap handler'ı - debounce eklenmiş
  const handleScreenTap = useMemo(
    () =>
      debounce((e: React.MouseEvent) => {
        if (isClickableElement(e.target as HTMLElement)) return;
        setShowControls(prev => !prev);
      }, 100),
    [isClickableElement]
  );

  if (!book) {
    return (
      <div className={styles.error.container}>
        <div className={styles.error.content}>
          <h2 className={styles.error.title}>Kitap bulunamadı</h2>
          <button onClick={handleGoBack} className={styles.error.button}>
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TopBar book={book} controlsClassName={controlsClassName} onGoBack={handleGoBack} />

      {/* Ana İçerik */}
      <motion.div
        className={styles.content.wrapper}
        onClick={handleScreenTap}
        drag="x"
        dragDirectionLock
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={SWIPE_CONF.dragElastic}
        onDragEnd={handleDragEnd}
        initial={false}
        layoutId="page-container"
        style={{ touchAction: 'pan-y' }}
      >
        <div ref={containerRef} className={styles.content.container}>
          <motion.div
            animate={controls}
            className={styles.content.imageContainer}
            style={{ ...styles.motion.base }}
            drag={false}
          >
            <BookImage
              book={book}
              currentPage={currentPage}
              imageError={imageError}
              currentImageUrl={currentImageUrl}
              onError={() => {
                setImageError(true);
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              onGoBack={handleGoBack}
            />
          </motion.div>
        </div>

        <EdgeControls onEdgeControl={handleEdgeControl} />
      </motion.div>

      <BottomBar
        book={book}
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
