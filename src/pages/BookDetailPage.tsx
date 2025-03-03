import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { books } from '../utils/books';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookIndex = id ? parseInt(id) : -1;
  const book = bookIndex >= 0 && bookIndex < books.length ? books[bookIndex] : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controls = useAnimation();

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

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = 500;

    if (info.velocity.x < -velocity && !imageError) {
      // Hızlı sola kaydırma - sonraki sayfa
      await animatePageChange('next');
    } else if (info.velocity.x > velocity && currentPage > 1) {
      // Hızlı sağa kaydırma - önceki sayfa
      await animatePageChange('prev');
    } else if (info.offset.x < -threshold && !imageError) {
      // Yavaş sola kaydırma - sonraki sayfa
      await animatePageChange('next');
    } else if (info.offset.x > threshold && currentPage > 1) {
      // Yavaş sağa kaydırma - önceki sayfa
      await animatePageChange('prev');
    } else {
      // Eşik değerini geçmeyen kaydırma - geri dön
      controls.start({ x: 0, transition: { duration: 0.2 } });
    }
  };

  const animatePageChange = async (direction: 'next' | 'prev') => {
    const xOffset = direction === 'next' ? -window.innerWidth : window.innerWidth;
    await controls.start({ x: xOffset, transition: { duration: 0.2 } });
    setCurrentPage(prev => (direction === 'next' ? prev + 1 : prev - 1));
    setImageError(false);
    await controls.set({ x: -xOffset }); // Yeni sayfayı ekranın dışında konumlandır
    await controls.start({ x: 0, transition: { duration: 0.2 } }); // Yeni sayfayı içeri kaydır
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage > 0) {
      if (newPage > currentPage && !imageError) {
        await animatePageChange('next');
      } else if (newPage < currentPage) {
        await animatePageChange('prev');
      }
    }
  };

  const handleScreenTap = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).tagName === 'BUTTON' ||
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).tagName === 'svg' ||
      (e.target as HTMLElement).tagName === 'path'
    ) {
      return;
    }
    setShowControls(!showControls);
  };

  if (!book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Kitap bulunamadı</h2>
          <button
            onClick={() => navigate('/')}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      <motion.div
        className="flex h-full w-full items-center justify-center overflow-hidden"
        onClick={handleScreenTap}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <div className="absolute inset-0 flex items-start justify-center overflow-y-auto">
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
                  onClick={() => navigate('/')}
                  className="mt-8 rounded-lg bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Ana Sayfaya Dön
                </button>
              </div>
            ) : (
              <img
                src={`${book.link}/${currentPage}.jpg`}
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

        {/* Alt Kontroller - Sabit Pozisyon */}
        <div
          className={`fixed inset-x-0 bottom-0 z-50 m-4 rounded-xl bg-gradient-to-b from-black/70 to-transparent px-4 py-2 transition-opacity duration-300 ${
            showControls ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="flex items-center justify-between text-white">
            <button
              onClick={() => {
                navigate('/');
              }}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-opacity hover:bg-white/20 hover:opacity-100"
            >
              Ana Sayfa
            </button>
            <div className="flex items-center gap-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
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
                Sayfa {currentPage}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={imageError}
                className="rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
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

        {/* Kenar Kontrolleri */}
        <div
          className="absolute inset-y-0 left-0 z-10 h-full w-1/6 cursor-pointer"
          onClick={e => {
            if (
              (e.target as HTMLElement).tagName === 'BUTTON' ||
              (e.target as HTMLElement).closest('button') ||
              (e.target as HTMLElement).tagName === 'svg' ||
              (e.target as HTMLElement).tagName === 'path'
            ) {
              return;
            }
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}
        />
        <div
          className="absolute inset-y-0 right-0 z-10 h-full w-1/6 cursor-pointer"
          onClick={e => {
            if (
              (e.target as HTMLElement).tagName === 'BUTTON' ||
              (e.target as HTMLElement).closest('button') ||
              (e.target as HTMLElement).tagName === 'svg' ||
              (e.target as HTMLElement).tagName === 'path'
            ) {
              return;
            }
            if (!imageError) handlePageChange(currentPage + 1);
          }}
        />
      </motion.div>
    </div>
  );
};

export default BookDetailPage;
