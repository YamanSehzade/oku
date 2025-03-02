import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../utils/books';
import { saveLastReadBook } from '../utils/storage';
import { motion, AnimatePresence } from "framer-motion";
import { TouchEvent } from "react";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookIndex = id ? parseInt(id) : -1;
  const currentBook = bookIndex >= 0 && bookIndex < books.length ? books[bookIndex] : null;
  
  // Önceki kitabı takip etmek için ref kullan
  const previousBookRef = useRef<string | null>(null);
  
  // State tanımlamaları
  const [currentPage, setCurrentPage] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const directionRef = useRef<'next' | 'prev'>('next');

  console.log('URL Parametreleri:', { id, type: typeof id },currentPage);
  // ID değiştiğinde kitabı güncelle
  useEffect(() => {
    if (!id) {
      console.log('ID parametresi bulunamadı, ana sayfaya yönlendiriliyor...');
      navigate('/');
      return;
    }

    if (currentBook) {
      // Kitap değiştiyse sayfa numarasını sıfırla
      if (previousBookRef.current !== currentBook.link) {
        setCurrentPage(1);
        setImageError(false);
        previousBookRef.current = currentBook.link;
      }
      
      saveLastReadBook(currentBook);
      document.title = currentBook.name;
    }
  }, [id, currentBook, navigate]);

  // Klavye kontrolü için event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      
      if (e.key === "ArrowLeft" && currentPage > 1) {
        handlePageChange(currentPage - 1, 'prev');
      } else if (e.key === "ArrowRight") {
        handlePageChange(currentPage + 1, 'next');
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, isAnimating]);

  // Kontrolleri otomatik gizleme
  useEffect(() => {
    let timeout: number;
    if (isFullscreen && showControls) {
      timeout = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isFullscreen, showControls]);

  const handlePageChange = (newPage: number, dir: 'next' | 'prev') => {
    if (isAnimating || imageError) return;
    
    directionRef.current = dir;
    setIsAnimating(true);
    setCurrentPage(newPage);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Dokunmatik kontroller
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handlePageChange(currentPage + 1, 'next');
    } else if (isRightSwipe && currentPage > 1) {
      handlePageChange(currentPage - 1, 'prev');
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleImageError = () => {
    setImageError(true);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setIsAnimating(false);
  };

  if (!currentBook) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Kitap bulunamadı</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  const handleImageClick = () => {
    if (isFullscreen) {
      setShowControls(true);
    } else {
      setIsFullscreen(true);
    }
  };

  return (
    <div className={`text-white ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {/* Üst Bar */}
      <div 
        className={`flex justify-between items-center ${isFullscreen ? 'absolute top-0 inset-x-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent' : 'mb-8'} transition-all duration-300 ${
          isFullscreen && !showControls ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button
          onClick={() => isFullscreen ? setIsFullscreen(false) : navigate("/")}
          className="bg-black/40 hover:bg-black/60 text-white px-4 py-2 rounded-lg flex items-center gap-2 backdrop-blur-sm transition-colors"
        >
          <span>←</span> {isFullscreen ? 'Tam Ekrandan Çık' : 'Geri Dön'}
        </button>
        <div className="text-lg flex items-center gap-4">
          <span className={`${isFullscreen ? 'bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm' : ''}`}>
            Sayfa: {currentPage}
          </span>
          {!isFullscreen && (
            <button
              onClick={() => setIsFullscreen(true)}
              className="bg-black/40 hover:bg-black/60 px-3 py-1 rounded-lg text-sm backdrop-blur-sm transition-colors"
            >
              Tam Ekran
            </button>
          )}
        </div>
      </div>

      <div className={`grid ${isFullscreen ? '' : 'grid-cols-1 md:grid-cols-2'} gap-8 ${isFullscreen ? 'h-screen' : ''}`}>
        {/* Kitap Resmi */}
        <div 
          className={`relative ${isFullscreen ? 'h-full w-full' : 'aspect-[3/4]'} rounded-2xl overflow-hidden shadow-2xl cursor-pointer group`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleImageClick}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div 
              key={currentPage}
              className="absolute inset-0"
              initial={{ x: directionRef.current === 'next' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: directionRef.current === 'next' ? '-100%' : '100%' }}
              transition={{ 
                duration: 0.3,
                ease: [0.32, 0.72, 0, 1]
              }}
            >
              <img
                src={`${currentBook.link}/${currentPage}.jpg`}
                alt={`${currentBook.name} - Sayfa ${currentPage}`}
                className={`w-full h-full ${isFullscreen ? 'object-contain' : 'object-cover'} bg-black`}
                onError={handleImageError}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Sayfa Değiştirme Kontrolleri */}
          <div 
            className={`absolute inset-x-0 bottom-0 p-4 flex justify-between transition-all duration-300 bg-gradient-to-t from-black/70 to-transparent ${
              isFullscreen ? (showControls ? 'opacity-100' : 'opacity-0') : 'opacity-100'
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentPage > 1 && !imageError) {
                  handlePageChange(currentPage - 1, 'prev');
                }
              }}
              className="bg-black/40 hover:bg-black/60 text-white w-12 h-12 rounded-full backdrop-blur-sm disabled:opacity-50 transition-colors flex items-center justify-center"
              disabled={currentPage === 1 || imageError}
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!imageError) {
                  handlePageChange(currentPage + 1, 'next');
                }
              }}
              className="bg-black/40 hover:bg-black/60 text-white w-12 h-12 rounded-full backdrop-blur-sm disabled:opacity-50 transition-colors flex items-center justify-center"
              disabled={imageError}
            >
              →
            </button>
          </div>

          {/* Kenar Kontrolleri - Sadece tam ekranda */}
          {isFullscreen && (
            <>
              <div 
                className={`absolute left-0 inset-y-0 w-1/4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentPage > 1 && !imageError && !isAnimating) {
                    handlePageChange(currentPage - 1, 'prev');
                  }
                }}
              />
              <div 
                className={`absolute right-0 inset-y-0 w-1/4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!imageError && !isAnimating) {
                    handlePageChange(currentPage + 1, 'next');
                  }
                }}
              />
            </>
          )}
        </div>

        {/* Kitap Bilgileri - Tam ekran modunda gizle */}
        {!isFullscreen && (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">{currentBook.name}</h2>
            
            <div className="space-y-4">
              {currentBook.writer && (
                <div>
                  <h3 className="text-lg text-gray-400">Yazar</h3>
                  <p className="text-2xl">{currentBook.writer}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg text-gray-400">Yayınevi</h3>
                <p className="text-2xl">{currentBook.publisher}</p>
              </div>

              {currentBook.series && (
                <div>
                  <h3 className="text-lg text-gray-400">Seri</h3>
                  <p className="text-2xl">{currentBook.series}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg text-gray-400">Sayfa Sayısı</h3>
                <p className="text-2xl">{currentBook.pageCount}</p>
              </div>
            </div>

            <div className="text-sm text-gray-400 mt-8">
              <p>Sayfalar arasında gezinmek için:</p>
              <ul className="list-disc ml-4 mt-2">
                <li>Sağa/sola kaydırın</li>
                <li>Ok tuşlarını kullanın</li>
                <li>Ekrandaki ok butonlarına tıklayın</li>
                <li>Tam ekran modunda resme tıklayarak kontrolleri gösterin/gizleyin</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage; 