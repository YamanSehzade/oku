import React, { useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { useApp } from '../context/AppContext';
import { useFavorites } from '../context/FavoritesContext';
import { Book } from '../types/book';

type Props = {
  book: Book;
  index: number;
  lastReadPage?: number;
};

const BookCard: React.FC<Props> = ({ book, lastReadPage }) => {
  const [imageError, setImageError] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { setSelectedBook } = useApp();
  const favorite = isFavorite(book);

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedBook(book);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(book);
    } else {
      addFavorite(book);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative block aspect-[3/4] cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Favori Butonu */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${
          favorite
            ? 'bg-red-500/90 text-white hover:bg-red-600'
            : 'bg-black/30 text-white hover:bg-black/50'
        }`}
      >
        <BiHeart
          className={`h-5 w-5 transform transition-transform duration-300 ${
            favorite ? 'scale-110' : 'scale-100 group-hover:scale-110'
          }`}
        />
      </button>

      {/* Sayfa Bilgisi */}
      <div className="absolute left-3 top-3 z-10">
        <div
          className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-sm transition-colors duration-300 ${
            lastReadPage ? 'bg-primary-500/90 text-white' : 'bg-black/30 text-white'
          }`}
        >
          {lastReadPage ? `${lastReadPage} / ${book.pageCount}` : `${book.pageCount} sayfa`}
        </div>
      </div>

      {/* İçerik */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/90 to-transparent p-3">
        <div className="flex flex-grow flex-col justify-between">
          <div>
            <h3 className="font-book mb-1.5 text-sm font-medium text-white group-hover:text-primary-200">
              {getFormattedTitle()}
            </h3>
          </div>
          <div className="space-y-0.5">
            {book.writer && (
              <p className="line-clamp-1 text-xs font-medium text-white/95">{book.writer}</p>
            )}
            <div className="flex flex-col gap-0.5">
              <p className="line-clamp-1 text-[10px] font-medium text-white/85">{book.publisher}</p>
              {book.series && (
                <p className="line-clamp-1 text-[10px] font-medium text-white/85">{book.series}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
