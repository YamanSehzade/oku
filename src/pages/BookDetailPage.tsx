import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLastRead } from '../context/LastReadContext';
import { books } from '../utils/books';

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

  // Klavye kısa yolları için effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !imageError) {
        handlePageChange(currentPage + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, imageError]);

  const handleGoBack = useCallback(() => {
    const previousPath = location.state?.from || '/';
    navigate(previousPath);
  }, [location.state, navigate]);

  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const animatePageChange = useCallback(
    async (direction: 'next' | 'prev') => {
      const xOffset = direction === 'next' ? -window.innerWidth : window.innerWidth;
      await controls.start({ x: xOffset, transition: { duration: 0.2 } });
      setCurrentPage(prev => (direction === 'next' ? prev + 1 : prev - 1));
      setImageError(false);
      scrollToTop();
      await controls.set({ x: -xOffset });
      await controls.start({ x: 0, transition: { duration: 0.2 } });
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

  // Ortak element kontrolü için yardımcı fonksiyon
  const isClickableElement = useCallback((target: HTMLElement) => {
    return (
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.tagName === 'svg' ||
      target.tagName === 'path'
    );
  }, []);

  // Kenar kontrolü için yardımcı fonksiyon
  const handleEdgeControl = useCallback(
    (direction: 'prev' | 'next', e: React.MouseEvent) => {
      if (isClickableElement(e.target as HTMLElement)) return;

      // Event'in yayılmasını engelle
      e.preventDefault();
      e.stopPropagation();

      if (direction === 'prev' && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else if (direction === 'next' && !imageError) {
        handlePageChange(currentPage + 1);
      }
    },
    [currentPage, imageError, handlePageChange, isClickableElement]
  );

  const handleScreenTap = useCallback(
    (e: React.MouseEvent) => {
      if (isClickableElement(e.target as HTMLElement)) return;
      setShowControls(!showControls);
    },
    [showControls, isClickableElement]
  );

  // Gesture kontrolü için sabitler
  const SWIPE_CONF = {
    threshold: 100,
    velocity: 500,
    dragElastic: 0.2,
    animationDuration: 0.2,
  } as const;

  const handleDragEnd = useCallback(
    async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { velocity, threshold } = SWIPE_CONF;

      const canGoNext = !imageError;
      const canGoPrev = currentPage > 1;

      if (info.velocity.x < -velocity && canGoNext) {
        await animatePageChange('next');
      } else if (info.velocity.x > velocity && canGoPrev) {
        await animatePageChange('prev');
      } else if (info.offset.x < -threshold && canGoNext) {
        await animatePageChange('next');
      } else if (info.offset.x > threshold && canGoPrev) {
        await animatePageChange('prev');
      } else {
        controls.start({ x: 0, transition: { duration: SWIPE_CONF.animationDuration } });
      }
    },
    [animatePageChange, controls, currentPage, imageError]
  );

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
      {/* Üst Bar */}
      <div
        className={`${controlsClassName} top-0 bg-gradient-to-b from-black/70 to-transparent px-4 py-2`}
      >
        <div className="flex items-center justify-between text-white">
          <button
            onClick={handleGoBack}
            className="flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-opacity hover:bg-white/20"
          >
            <BiArrowBack className="mr-2 h-5 w-5" />
            Geri
          </button>
          <div className="flex items-center">
            <h1 className="text-lg font-medium">{book.name}</h1>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <motion.div
        className="flex h-full w-full items-center justify-center overflow-hidden"
        onClick={handleScreenTap}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={SWIPE_CONF.dragElastic}
        onDragEnd={handleDragEnd}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 flex items-start justify-center overflow-y-auto scroll-smooth"
        >
          <motion.div
            animate={controls}
            className="min-h-full w-full"
            style={{ touchAction: 'pan-y' }}
          >
            {imageError ? (
              <div className="flex min-h-full flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 text-2xl font-semibold text-white">Kitap Bitti</div>
                <div className="text-lg text-white/70">Bu kitabı okumayı tamamladınız</div>
                <button
                  onClick={handleGoBack}
                  className="mt-8 rounded-lg bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Geri Dön
                </button>
              </div>
            ) : (
              <img
                src={currentImageUrl}
                alt={`${book.name} - Sayfa ${currentPage}`}
                className="min-h-full w-full select-none object-contain landscape:object-cover"
                onError={() => {
                  setImageError(true);
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                draggable={false}
              />
            )}
          </motion.div>
        </div>

        {/* Kenar Kontrolleri */}
        <div
          className="absolute inset-y-0 left-0 z-10 h-full w-1/6 cursor-pointer"
          onClick={e => handleEdgeControl('prev', e)}
        />
        <div
          className="absolute inset-y-0 right-0 z-10 h-full w-1/6 cursor-pointer"
          onClick={e => handleEdgeControl('next', e)}
        />
      </motion.div>

      {/* Alt Kontroller - motion.div dışına taşındı */}
      <div
        className={`${controlsClassName} bottom-0 m-4 rounded-xl bg-gradient-to-b from-black/70 to-transparent px-4 py-2`}
      >
        <div className="flex items-center justify-between text-white">
          <div className="text-sm">
            {book.writer && <div className="font-medium">{book.writer}</div>}
            <div className="text-white/70">{book.publisher}</div>
          </div>
          <div className="flex items-center gap-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={buttonClassName}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Sayfa {currentPage} / {book.pageCount}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={imageError}
              className={buttonClassName}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

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
