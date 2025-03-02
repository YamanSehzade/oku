import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { books } from '../utils/books';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookIndex = id ? parseInt(id) : -1;
  const book = bookIndex >= 0 && bookIndex < books.length ? books[bookIndex] : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [direction, setDirection] = useState(0); // -1: geri, 1: ileri

  // Touch kontrolü için state'ler
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const swipeThreshold = 50; // minimum kaydırma mesafesi

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const isSignificantSwipe = Math.abs(swipeDistance) > swipeThreshold;

    if (isSignificantSwipe) {
      if (swipeDistance > 0 && !imageError) {
        // Sola kaydırma - sonraki sayfa
        handlePageChange(currentPage + 1);
      } else if (swipeDistance < 0 && currentPage > 1) {
        // Sağa kaydırma - önceki sayfa
        handlePageChange(currentPage - 1);
      } else {
        // Kaydırma geçersiz, kontrolleri göster/gizle
        setShowControls(!showControls);
      }
    } else {
      // Küçük dokunuş, kontrolleri göster/gizle
      setShowControls(!showControls);
    }

    isSwiping.current = false;
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Kontrolleri otomatik gizle
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isFullscreen && showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isFullscreen, showControls]);

  // Klavye kontrollerini ekle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight' && !imageError) {
        handlePageChange(currentPage + 1);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, imageError, isFullscreen]);

  useEffect(() => {
    const hasSeenSwipeHint = localStorage.getItem('hasSeenSwipeHint');
    if (!hasSeenSwipeHint && isFullscreen) {
      setShowSwipeHint(true);
      localStorage.setItem('hasSeenSwipeHint', 'true');
      
      // 5 saniye sonra ipucu mesajını gizle
      const timeout = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [isFullscreen]);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kitap bulunamadı</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
      const newDirection = newPage > currentPage ? 1 : -1;
      setDirection(newDirection);
      setCurrentPage(newPage);
      setImageError(false);
      if (isFullscreen) {
        setShowControls(true);
      }
    }
  };

  const handleScreenTap = (e: React.MouseEvent) => {
    // Butonlara tıklandığında kontrolleri gösterme
    if ((e.target as HTMLElement).tagName === 'BUTTON' || 
        (e.target as HTMLElement).closest('button')) {
      return;
    }
    
    if (isFullscreen) {
      setShowControls(!showControls);
    }
  };

  // Sayfa geçiş varyantları
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {/* Normal Görünüm */}
      <div className={isFullscreen ? 'hidden' : ''}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Üst Bilgi */}
            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={() => navigate("/")}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Geri Dön
              </button>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Sayfa: {currentPage}</span>
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-9v4m0-4h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 9v-4m0 4h-4m4-4l-5-5" />
                  </svg>
                  Tam Ekran
                </button>
              </div>
            </div>

            {/* Kitap Görüntüleyici */}
            <div 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-900 cursor-pointer"
              onClick={() => setIsFullscreen(true)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={`${book.link}/${currentPage}.jpg`}
                    alt={`${book.name} - Sayfa ${currentPage}`}
                    className="w-full h-full object-contain"
                    onError={() => {
                      setImageError(true);
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Sayfa Değiştirme Kontrolleri */}
              <div 
                className="absolute inset-x-0 bottom-0 p-4 flex justify-between"
                onClick={(e) => e.stopPropagation()} // Butonlara tıklandığında tam ekrana geçmeyi engelle
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePageChange(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full bg-black/50 text-white backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePageChange(currentPage + 1);
                  }}
                  disabled={imageError}
                  className="p-3 rounded-full bg-black/50 text-white backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Tam Ekran İpucu */}
              <div className="absolute top-4 right-4 text-white/70 flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-9v4m0-4h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 9v-4m0 4h-4m4-4l-5-5" />
                </svg>
                <span>Tam ekran için dokun</span>
              </div>
            </div>

            {/* Kitap Bilgileri */}
            <div className="mt-8 space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{book.name}</h1>
              {book.writer && (
                <p className="text-xl text-gray-700">{book.writer}</p>
              )}
              <div className="space-y-2 text-gray-600">
                <p>{book.publisher}</p>
                {book.series && (
                  <p>{book.series}</p>
                )}
                <p>{book.pageCount} Sayfa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tam Ekran Görünümü */}
      {isFullscreen && (
        <div 
          className="h-full w-full flex flex-col"
          onClick={handleScreenTap}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Üst Bar */}
          <div 
            className={`absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center justify-between text-white">
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tam Ekrandan Çık
              </button>
              <span>Sayfa: {currentPage}</span>
            </div>
          </div>

          {/* Kitap Sayfası */}
          <div className="flex-1 flex items-center justify-center bg-black overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <img
                  src={`${book.link}/${currentPage}.jpg`}
                  alt={`${book.name} - Sayfa ${currentPage}`}
                  className="max-h-full max-w-full object-contain select-none touch-none"
                  onError={() => {
                    setImageError(true);
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Alt Kontroller */}
          <div 
            className={`absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex justify-center gap-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-4 rounded-full bg-white/10 text-white backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={imageError}
                className="p-4 rounded-full bg-white/10 text-white backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Kenar Kontrolleri */}
          <div 
            className="absolute left-0 inset-y-0 w-1/4"
            onClick={(e) => {
              e.stopPropagation();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
          />
          <div 
            className="absolute right-0 inset-y-0 w-1/4"
            onClick={(e) => {
              e.stopPropagation();
              if (!imageError) handlePageChange(currentPage + 1);
            }}
          />

          {/* Kaydırma İpucu - Sadece ilk görüntülemede göster */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className={`bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full text-white/90 flex items-center gap-3 transition-opacity duration-300 ${
              showControls && showSwipeHint ? 'opacity-100' : 'opacity-0'
            }`}>
              <svg className="w-6 h-6 animate-[swipe_2s_ease-in-out_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>Sayfaları kaydırarak değiştirebilirsiniz</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Kaydırma ve sayfa geçiş animasyonları için özel stil
const style = document.createElement('style');
style.textContent = `
  @keyframes swipe {
    0%, 100% { transform: translateX(0); opacity: 0.5; }
    50% { transform: translateX(10px); opacity: 1; }
  }
`;
document.head.appendChild(style);

export default BookDetailPage; 