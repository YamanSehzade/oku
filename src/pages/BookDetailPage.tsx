import { useState, useRef, useEffect } from 'react';
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
  const [showControls, setShowControls] = useState(true);

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

  // Touch kontrolü için state'ler
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const swipeThreshold = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = true;
    setShowControls(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const isSignificantSwipe = Math.abs(swipeDistance) > swipeThreshold;

    if (isSignificantSwipe) {
      if (swipeDistance > 0 && !imageError) {
        handlePageChange(currentPage + 1);
      } else if (swipeDistance < 0 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    } else {
      setShowControls(!showControls);
    }

    isSwiping.current = false;
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
      setCurrentPage(newPage);
      setImageError(false);
    }
  };

  const handleScreenTap = (e: React.MouseEvent) => {
    // Butonlara tıklandığında kontrolleri değiştirme
    if ((e.target as HTMLElement).tagName === 'BUTTON' || 
        (e.target as HTMLElement).closest('button') ||
        (e.target as HTMLElement).tagName === 'svg' ||
        (e.target as HTMLElement).tagName === 'path') {
      return;
    }
    setShowControls(!showControls);
  };

  if (!book) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kitap bulunamadı</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      <div 
        className="h-full w-full flex items-center justify-center"
        onClick={handleScreenTap}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {imageError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="text-white text-2xl font-semibold mb-4">
                Kitap Bitti
              </div>
              <div className="text-white/70 text-lg">
                Bu kitabı okumayı tamamladınız
              </div>
              <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-colors"
              >
                Ana Sayfaya Dön
              </button>
            </div>
          ) : (
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
          )}
        </div>

        {/* Üst Kontroller */}
        <div 
          className={`absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex justify-between items-center text-white">
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium hover:opacity-100 transition-opacity z-50 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              Ana Sayfa
            </button>
            <div className="flex items-center gap-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white/10 text-white backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-colors z-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-medium bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                Sayfa {currentPage}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={imageError}
                className="p-2 rounded-lg bg-white/10 text-white backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-colors z-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Kenar Kontrolleri */}
        <div 
          className={`absolute left-0 inset-y-0 w-1/4 ${showControls ? 'pointer-events-none' : 'cursor-pointer'}`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        />
        <div 
          className={`absolute right-0 inset-y-0 w-1/4 ${showControls ? 'pointer-events-none' : 'cursor-pointer'}`}
          onClick={() => !imageError && handlePageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export default BookDetailPage;