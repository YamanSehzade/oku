import React, { useState } from 'react';
import { Book } from "../utils/books";
import { Link } from "react-router-dom";
import { useFavorites } from '../context/FavoritesContext';

type Props = {
  book: Book;
  index: number;
};

const BookCard: React.FC<Props> = ({ book, index }) => {
  const [imageError, setImageError] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(book);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(book);
    } else {
      addFavorite(book);
    }
  };

  return (
    <div className="relative group h-[280px] sm:h-[320px] md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
      {/* Kitap Resmi - Arka Plan */}
      <div className="absolute inset-0">
        <img
          src={imageError ? `${book.link}/2.jpg` : `${book.link}/1.jpg`}
          alt={book.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImageError(true)}
        />
        {/* Karartma Katmanı */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* İçerik */}
      <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 text-white">
        {/* Sayfa Sayısı Badge */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-blue-500/80 backdrop-blur px-2 sm:px-3 py-1 rounded-full">
          <span className="text-xs sm:text-sm font-medium">{book.pageCount} Sayfa</span>
        </div>

        {/* Kitap Bilgileri */}
        <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 line-clamp-2">
          {book.name}
        </h3>
        
        <div className="space-y-0.5 sm:space-y-1 mb-3 sm:mb-4">
          {book.writer && (
            <p className="text-base sm:text-lg text-gray-200">{book.writer}</p>
          )}
          <p className="text-xs sm:text-sm text-gray-300">{book.publisher}</p>
          {book.series && (
            <p className="text-xs sm:text-sm text-gray-400">{book.series}</p>
          )}
        </div>

        {/* Favori Butonu */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-300"
        >
          <svg
            className={`w-6 h-6 ${favorite ? 'text-red-500' : 'text-gray-400'}`}
            fill={favorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Okuma Butonu */}
        <Link
          to={`/kitap/${index}`}
          className="block w-full text-center bg-blue-500/80 backdrop-blur hover:bg-blue-600/80 text-white py-2 sm:py-3 rounded-lg transition-colors duration-200 text-sm sm:text-base font-medium"
        >
          Okumaya Başla
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
