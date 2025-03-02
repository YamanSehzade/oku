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
    <Link
      to={`/kitap/${index}`}
      className="group relative block aspect-[3/4] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      {/* Arka Plan Resmi */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${imageError ? `${book.link}/2.jpg` : `${book.link}/1.jpg`})`
        }}
        onError={() => setImageError(true)}
      />

      {/* Karartma Katmanı */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Sayfa Sayısı */}
      <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm font-medium">
        {book.pageCount || '?'} sayfa
      </div>

      {/* Favori Butonu */}
      <button
        onClick={(e) => {
          e.preventDefault();
          handleFavoriteClick(e);
        }}
        className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all duration-300"
      >
        <svg
          className={`w-5 h-5 ${favorite ? 'text-red-500' : 'text-white'}`}
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

      {/* İçerik */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="text-lg font-bold mb-1 line-clamp-2">
          {book.name}
        </h3>
        
        <div className="space-y-0.5 text-sm opacity-90">
          {book.writer && (
            <p className="line-clamp-1">{book.writer}</p>
          )}
          <p className="text-xs opacity-75 line-clamp-1">{book.publisher}</p>
          {book.series && (
            <p className="text-xs opacity-75 line-clamp-1">{book.series}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
