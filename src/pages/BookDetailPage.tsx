import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../utils/books';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookIndex = id ? parseInt(id) : -1;
  const book = bookIndex >= 0 && bookIndex < books.length ? books[bookIndex] : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [imageError, setImageError] = useState(false);

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
      setCurrentPage(newPage);
      setImageError(false);
    }
  };

  return (
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
          <div className="text-gray-600">
            Sayfa: {currentPage}
          </div>
        </div>

        {/* Kitap Görüntüleyici */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-900">
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

          {/* Sayfa Değiştirme Kontrolleri */}
          <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-black/50 text-white backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={imageError}
              className="p-3 rounded-full bg-black/50 text-white backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
  );
};

export default BookDetailPage; 