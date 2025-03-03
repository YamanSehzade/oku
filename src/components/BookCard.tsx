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

  // Kitap başlığını düzenle
  const getFormattedTitle = () => {
    let title = book.name;

    // Yaş bilgisini kontrol et ve formatla
    const ageMatch = title.match(/(\d+)\s*[Yy]aş/);
    if (ageMatch) {
      const age = ageMatch[1];
      if (title.toLowerCase().includes('üzeri')) {
        return `${age}+ Yaş`;
      }
      if (title === 'Yaş' || title === 'Yaş ve Üzeri') {
        return `${age}+ Yaş`;
      }
      return `${age} Yaş`;
    }

    // Eğer seri adı varsa ve başlık seri adını içeriyorsa
    if (book.series && title.includes(book.series)) {
      // Seri adını başlıktan çıkar
      title = title
        .replace(book.series, '')
        .replace(/^[-\s]*/, '') // Baştaki tire ve boşlukları temizle
        .replace(/^[0-9]+[-\s]*/, ''); // Baştaki sayı ve tire/boşlukları temizle
    }

    // Başlık boş kaldıysa seri adını kullan
    if (!title.trim() && book.series) {
      return book.series;
    }

    return title;
  };

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
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Arka Plan Resmi */}
      <div
        className="absolute inset-0 transform bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url(${imageError ? `${book.link}/2.jpg` : `${book.link}/${lastReadPage || 1}.jpg`})`,
        }}
        onError={() => setImageError(true)}
      />

      {/* Karartma Katmanı */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-75" />

      {/* Favori Butonu */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${
          favorite
            ? 'bg-red-500/90 text-white hover:bg-red-600'
            : 'bg-black/20 text-white hover:bg-black/40'
        }`}
      >
        <BiHeart
          className={`h-6 w-6 transform transition-transform duration-300 ${
            favorite ? 'scale-110' : 'scale-100 group-hover:scale-110'
          }`}
        />
      </button>

      {/* Sayfa Bilgisi */}
      <div className="absolute left-4 top-4 z-10">
        <div
          className={`rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur-sm transition-colors duration-300 ${
            lastReadPage ? 'bg-primary-500/90 text-white' : 'bg-black/20 text-white'
          }`}
        >
          {lastReadPage ? `${lastReadPage} / ${book.pageCount}` : `${book.pageCount} sayfa`}
        </div>
      </div>

      {/* İçerik */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/90 to-transparent p-5">
        <div className="flex flex-grow flex-col justify-between">
          <div>
            <h3 className="font-book mb-3 text-xl font-semibold text-white group-hover:text-primary-200">
              {getFormattedTitle()}
            </h3>
          </div>
          <div className="space-y-2">
            {book.writer && (
              <p className="line-clamp-1 text-base font-medium text-white/95">{book.writer}</p>
            )}
            <div className="flex flex-col gap-1">
              <p className="line-clamp-1 text-sm font-medium text-white/80">{book.publisher}</p>
              {book.series && (
                <p className="line-clamp-1 text-sm font-medium text-white/80">{book.series}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
