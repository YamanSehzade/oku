import { useMemo } from 'react';
import { BiBookmark, BiHeart, BiHistory } from 'react-icons/bi';
import BookCard from '../components/BookCard';
import { useFavorites } from '../context/FavoritesContext';
import { useLastRead } from '../context/LastReadContext';
import { books } from '../utils/books';

/**
 * Kitaplık sayfası - Favori ve son okunan kitapların listelendiği sayfa
 */
const BookshelfPage = () => {
  const { lastReadPages } = useLastRead();
  const { favorites } = useFavorites();

  // Son okunan kitapları tarihe göre sırala ve son 5 kitabı al
  const recentlyReadBooks = useMemo(() => {
    return books
      .filter(book => {
        const lastRead = lastReadPages.find(lrp => lrp.book.link === book.link);
        return lastRead && !lastRead.isFinished;
      })
      .sort((a, b) => {
        const aDate = lastReadPages.find(lrp => lrp.book.link === a.link)?.timestamp || 0;
        const bDate = lastReadPages.find(lrp => lrp.book.link === b.link)?.timestamp || 0;
        return bDate - aDate;
      })
      .slice(0, 5); // Son 5 kitabı al
  }, [lastReadPages]);

  // Biten kitapları tarihe göre sırala
  const finishedBooks = useMemo(() => {
    return books
      .filter(book => {
        const lastRead = lastReadPages.find(lrp => lrp.book.link === book.link);
        return lastRead?.isFinished;
      })
      .sort((a, b) => {
        const aDate = lastReadPages.find(lrp => lrp.book.link === a.link)?.timestamp || 0;
        const bDate = lastReadPages.find(lrp => lrp.book.link === b.link)?.timestamp || 0;
        return bDate - aDate;
      });
  }, [lastReadPages]);

  return (
    <div className="space-y-6">
      {/* Sayfa Başlığı */}
      <div className="rounded-lg border-l-2 border-primary-400 bg-white p-3 shadow-sm sm:p-4">
        <h2 className="mb-2 flex items-center text-lg font-medium text-gray-800 sm:text-xl">
          <BiHeart className="mr-2 h-5 w-5 text-primary-400 sm:h-6 sm:w-6" />
          Kitaplığım
        </h2>
        <p className="text-sm text-gray-500">
          Favori kitaplarınız ve son okuduğunuz kitaplar burada listelenir.
        </p>
      </div>

      {/* Son Okunan Kitaplar */}
      {recentlyReadBooks.length > 0 && (
        <section className="space-y-4">
          <h3 className="flex items-center text-lg font-semibold text-gray-900">
            <BiHistory className="mr-2 h-5 w-5" />
            Son Okunan Kitaplar
          </h3>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {recentlyReadBooks.map((book, index) => (
              <BookCard
                key={book.link}
                book={book}
                index={index}
                lastReadPage={lastReadPages.find(lrp => lrp.book.link === book.link)?.page}
              />
            ))}
          </div>
        </section>
      )}

      {/* Favori Kitaplar */}
      {favorites.length > 0 && (
        <section className="space-y-4">
          <h3 className="flex items-center text-lg font-semibold text-gray-900">
            <BiHeart className="mr-2 h-5 w-5" />
            Favori Kitaplar
          </h3>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {favorites.map((book, index) => (
              <BookCard key={book.link} book={book} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Biten Kitaplar */}
      {finishedBooks.length > 0 && (
        <section className="space-y-4">
          <h3 className="flex items-center text-lg font-semibold text-gray-900">
            <BiBookmark className="mr-2 h-5 w-5" />
            Biten Kitaplar
          </h3>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {finishedBooks.map((book, index) => (
              <BookCard
                key={book.link}
                book={book}
                index={index}
                lastReadPage={lastReadPages.find(lrp => lrp.book.link === book.link)?.page}
              />
            ))}
          </div>
        </section>
      )}

      {/* Boş Durum */}
      {recentlyReadBooks.length === 0 && favorites.length === 0 && finishedBooks.length === 0 && (
        <div className="text-center text-gray-500">
          <p>Henüz kitaplığınızda kitap bulunmuyor.</p>
          <p>Kitap okumaya başlayın veya favori kitaplarınızı ekleyin.</p>
        </div>
      )}
    </div>
  );
};

export default BookshelfPage;
