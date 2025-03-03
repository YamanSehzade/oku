import React, { useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { Book } from '../utils/books';

type Props = {
  book: Book;
  index: number;
  lastReadPage?: number;
};

const BookCard: React.FC<Props> = ({ book, lastReadPage }) => {
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
      className="group relative block aspect-[3/4] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
    >
      {/* Arka Plan Resmi */}
      <div
        className="absolute inset-0 transform bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${imageError ? `${book.link}/2.jpg` : `${book.link}/${lastReadPage || 1}.jpg`})`,
        }}
        onError={() => setImageError(true)}
      />

      {/* Karartma Katmanı */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      {/* Favori Butonu */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          favorite
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
        }`}
      >
        <BiHeart
          className={`h-5 w-5 transform transition-transform duration-300 ${
            favorite ? 'scale-110' : 'scale-100 group-hover:scale-110'
          }`}
        />
      </button>

      {/* Sayfa Bilgisi */}
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
        {lastReadPage && (
          <div className="rounded-md bg-primary-500 px-2 py-1 text-xs font-medium text-white shadow-lg">
            {lastReadPage} / {book.pageCount}
          </div>
        )}
        {!lastReadPage && (
          <div className="rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-gray-600 shadow-lg">
            {book.pageCount} sayfa
          </div>
        )}
      </div>

      {/* İçerik */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black p-3">
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-white">{book.name}</h3>
        <div className="space-y-0.5">
          {book.writer && (
            <p className="line-clamp-1 text-xs font-medium text-white/90">{book.writer}</p>
          )}
          <div className="flex flex-col">
            <p className="line-clamp-1 text-xs text-white/70">{book.publisher}</p>
            {book.series && <p className="line-clamp-1 text-xs text-white/70">{book.series}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
