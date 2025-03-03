import React, { useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { Book } from '../utils/books';

type Props = {
  book: Book;
  index: number;
};

const BookCard: React.FC<Props> = ({ book }) => {
  const [imageError, setImageError] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(book);
  const location = useLocation();

  // Kitabın link'inden id'yi çıkar
  const getBookId = () => {
    const urlParts = book.link.split('/');
    return urlParts[urlParts.length - 1];
  };

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
      to={`/kitap/${getBookId()}`}
      state={{ from: location.pathname }}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      {/* Arka Plan Resmi */}
      <div
        className="absolute inset-0 transform bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${imageError ? `${book.link}/2.jpg` : `${book.link}/1.jpg`})`,
        }}
        onError={() => setImageError(true)}
      />

      {/* Karartma Katmanı */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      {/* Favori Butonu */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          favorite
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
        }`}
      >
        <BiHeart
          className={`h-6 w-6 transform transition-transform duration-300 ${
            favorite ? 'scale-110' : 'scale-100 group-hover:scale-110'
          }`}
        />
      </button>

      {/* İçerik */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-white sm:text-base">
          {book.name}
        </h3>
        <div className="space-y-1">
          {book.writer && (
            <p className="line-clamp-1 text-xs font-medium text-white/90 sm:text-sm">
              {book.writer}
            </p>
          )}
          <div className="flex flex-col space-y-0.5">
            <p className="line-clamp-1 text-xs text-white/70">{book.publisher}</p>
            {book.series && <p className="line-clamp-1 text-xs text-white/70">{book.series}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
