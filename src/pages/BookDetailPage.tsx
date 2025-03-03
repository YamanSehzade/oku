import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BiArrowBack, BiBookmark } from 'react-icons/bi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarksContext';
import { books } from '../utils/books';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  // URL'den gelen id'yi decode et ve kitabı bul
  const decodedId = id ? decodeURIComponent(id) : '';
  const book = books.find(b => {
    // URL'den gelen id, kitabın link'inin son kısmı olacak
    const urlParts = b.link.split('/');
    const bookId = urlParts[urlParts.length - 1];
    return bookId === decodedId;
  });

  const [currentPage, setCurrentPage] = useState(2);
  const [imageError, setImageError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleGoBack = () => {
    // Önceki sayfanın URL'sini kontrol et
    const previousPath = location.state?.from || '/';
    navigate(previousPath);
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = 500;

    if (info.velocity.x < -velocity && !imageError) {
      await animatePageChange('next');
    } else if (info.velocity.x > velocity && currentPage > 1) {
      await animatePageChange('prev');
    } else if (info.offset.x < -threshold && !imageError) {
      await animatePageChange('next');
    } else if (info.offset.x > threshold && currentPage > 1) {
      await animatePageChange('prev');
    } else {
      controls.start({ x: 0, transition: { duration: 0.2 } });
    }
  };

  const animatePageChange = async (direction: 'next' | 'prev') => {
    const xOffset = direction === 'next' ? -window.innerWidth : window.innerWidth;
    await controls.start({ x: xOffset, transition: { duration: 0.2 } });
    setCurrentPage(prev => (direction === 'next' ? prev + 1 : prev - 1));
    setImageError(false);
    scrollToTop();
    await controls.set({ x: -xOffset });
    await controls.start({ x: 0, transition: { duration: 0.2 } });
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

  const handleBookmarkClick = () => {
    if (!book) return;

    if (isBookmarked(book)) {
      removeBookmark(book);
    } else {
      addBookmark(book, currentPage);
    }
  };

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
        className={`fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/70 to-transparent px-4 py-2 transition-opacity duration-300 ${
          showControls ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
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
            <h1 className="mr-4 text-lg font-medium">{book.name}</h1>
            <button
              onClick={handleBookmarkClick}
              className={`rounded-full p-2 ${
                isBookmarked(book)
                  ? 'bg-accent-500/20 text-accent-400'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <BiBookmark className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="flex h-full w-full items-center justify-center overflow-hidden"
        onClick={handleScreenTap}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
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

        {/* Alt Kontroller */}
        <div
          className={`fixed inset-x-0 bottom-0 z-50 m-4 rounded-xl bg-gradient-to-b from-black/70 to-transparent px-4 py-2 transition-opacity duration-300 ${
            showControls ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
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
                Sayfa {currentPage} / {book.pageCount}
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
