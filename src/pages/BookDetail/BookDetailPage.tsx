import { motion, PanInfo, useAnimation } from 'framer-motion';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLastRead } from '../../context/LastReadContext';
import { books } from '../../utils/books';
import { BookImage } from './components/BookImage';
import { BottomBar } from './components/BottomBar';
import { EdgeControls } from './components/EdgeControls';
import { TopBar } from './components/TopBar';

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
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Kontrol sınıfları
  const controlsClassName = useMemo(() => {
    return `fixed inset-x-0 z-50 transition-opacity duration-300 ${
      showControls ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
    }`;
  }, [showControls]);

  // Buton sınıfları
  const buttonClassName = useMemo(() => {
    return 'rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30';
  }, []);

  // Görsel önbelleğe alma için ref
  const imageCache = useRef<Set<string>>(new Set());

  // Görsel URL'lerini oluştur ve önbelleğe al
  const { currentImageUrl, nextImageUrl, prevImageUrl } = useMemo(() => {
    if (!book) return { currentImageUrl: '', nextImageUrl: '', prevImageUrl: '' };

    const current = `${book.link}/${currentPage}.jpg`;
    const next = `${book.link}/${currentPage + 1}.jpg`;
    const prev = currentPage > 1 ? `${book.link}/${currentPage - 1}.jpg` : '';

    return { currentImageUrl: current, nextImageUrl: next, prevImageUrl: prev };
  }, [book, currentPage]);

  // Görselleri önceden yükle
  useEffect(() => {
    if (!book || imageError) return;

    const preloadImage = (url: string) => {
      if (!url || imageCache.current.has(url)) return;

      const img = new Image();
      img.src = url;
      imageCache.current.add(url);
    };

    preloadImage(nextImageUrl);
    preloadImage(prevImageUrl);
  }, [book, currentPage, nextImageUrl, prevImageUrl, imageError]);

  // Sayfa değiştiğinde otomatik kaydet
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (book) {
        saveLastRead(book, currentPage, imageError);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(saveTimeout);
  }, [book, currentPage, imageError]);

  // Ortak element kontrolü için yardımcı fonksiyon
  const isClickableElement = useCallback((target: HTMLElement) => {
    return (
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.tagName === 'svg' ||
      target.tagName === 'path'
    );
  }, []);

  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Gesture kontrolü için sabitler
  const SWIPE_CONF = {
    threshold: 100,
    velocity: 500,
    dragElastic: 0.2,
    animationDuration: 0.2,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.2,
      stiffness: 300,
      damping: 30,
    },
  } as const;

  const animatePageChange = useCallback(
    async (direction: 'next' | 'prev') => {
      const xOffset = direction === 'next' ? -window.innerWidth : window.innerWidth;
      await controls.start({
        x: xOffset,
        transition: SWIPE_CONF.transition,
      });
      setCurrentPage(prev => (direction === 'next' ? prev + 1 : prev - 1));
      setImageError(false);
      scrollToTop();
      await controls.set({ x: -xOffset });
      await controls.start({
        x: 0,
        transition: SWIPE_CONF.transition,
      });
    },
    [controls, scrollToTop]
  );

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

  // Event yönetimi için merkezi fonksiyon
  const handleInteraction = useCallback(
    (type: 'keyboard' | 'touch' | 'click', e: any) => {
      // Tıklama kontrolü
      if (type === 'click' && isClickableElement(e.target as HTMLElement)) {
        return;
      }

      // Klavye kontrolü
      if (type === 'keyboard') {
        const key = (e as KeyboardEvent).key;
        if (key === 'ArrowRight' && !imageError) {
          handlePageChange(currentPage + 1);
        } else if (key === 'ArrowLeft' && currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
        return;
      }

      // Dokunma kontrolü
      if (type === 'touch') {
        const info = e as PanInfo;
        const { velocity, threshold } = SWIPE_CONF;
        const canGoNext = !imageError;
        const canGoPrev = currentPage > 1;

        if (info.velocity.x < -velocity && canGoNext) {
          animatePageChange('next');
        } else if (info.velocity.x > velocity && canGoPrev) {
          animatePageChange('prev');
        } else if (info.offset.x < -threshold && canGoNext) {
          animatePageChange('next');
        } else if (info.offset.x > threshold && canGoPrev) {
          animatePageChange('prev');
        } else {
          controls.start({ x: 0, transition: { duration: SWIPE_CONF.animationDuration } });
        }
      }
    },
    [currentPage, imageError, handlePageChange, animatePageChange, controls, isClickableElement]
  );

  // Klavye event listener'ı
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleInteraction('keyboard', e);
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction]);

  // Drag end handler'ı
  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      handleInteraction('touch', info);
    },
    [handleInteraction]
  );

  // Edge control handler'ı
  const handleEdgeControl = useCallback(
    (direction: 'prev' | 'next', e: React.MouseEvent) => {
      if (isClickableElement(e.target as HTMLElement)) return;

      e.preventDefault();
      e.stopPropagation();

      handlePageChange(direction === 'next' ? currentPage + 1 : currentPage - 1);
    },
    [currentPage, handlePageChange, isClickableElement]
  );

  // Screen tap handler'ı - debounce eklenmiş
  const handleScreenTap = useMemo(
    () =>
      debounce((e: React.MouseEvent) => {
        if (isClickableElement(e.target as HTMLElement)) return;
        setShowControls(prev => !prev);
      }, 100),
    [isClickableElement]
  );

  const handleGoBack = useCallback(() => {
    const previousPath = location.state?.from || '/';
    navigate(previousPath);
  }, [location.state, navigate]);

  if (!book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Kitap bulunamadı</h2>
          <button
            onClick={handleGoBack}
            className="rounded-lg bg-secondary-600 px-6 py-2 text-white transition-colors hover:bg-secondary-700"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      <TopBar book={book} controlsClassName={controlsClassName} onGoBack={handleGoBack} />

      {/* Ana İçerik */}
      <motion.div
        className="flex h-full w-full items-center justify-center overflow-hidden"
        onClick={handleScreenTap}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={SWIPE_CONF.dragElastic}
        onDragEnd={handleDragEnd}
        initial={false}
        layoutId="page-container"
        style={{ touchAction: 'none' }}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 flex items-start justify-center overflow-y-auto scroll-smooth"
        >
          <motion.div
            animate={controls}
            className="min-h-full w-full"
            style={{
              touchAction: 'pan-y',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitPerspective: 1000,
            }}
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
