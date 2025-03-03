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
        className="absolute right-3 top-3 z-10 rounded-full bg-black/20 p-2.5 backdrop-blur-sm transition-all duration-300 hover:bg-black/40"
      >
        <BiHeart className={`h-5 w-5 ${favorite ? 'text-red-500' : 'text-white'}`} />
      </button>

      {/* İçerik */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="mb-1 line-clamp-2 text-lg font-bold">{book.name}</h3>

        <div className="space-y-0.5 text-sm opacity-90">
          {book.writer && <p className="line-clamp-1">{book.writer}</p>}
          <p className="line-clamp-1 text-xs opacity-75">{book.publisher}</p>
          {book.series && <p className="line-clamp-1 text-xs opacity-75">{book.series}</p>}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
