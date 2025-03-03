import { useMemo } from 'react';
import { BiHeart, BiHistory } from 'react-icons/bi';
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

  // Son okunan kitapları tarihe göre sırala
  const recentlyReadBooks = useMemo(() => {
    return books
      .filter(book => lastReadPages.some(lrp => lrp.book.link === book.link))
      .sort((a, b) => {
        const aDate = lastReadPages.find(lrp => lrp.book.link === a.link)?.timestamp || 0;
        const bDate = lastReadPages.find(lrp => lrp.book.link === b.link)?.timestamp || 0;
        return bDate - aDate;
      });
  }, [lastReadPages]);

  return (
    <div className="space-y-6">
      {/* Sayfa Başlığı */}
      <div className="rounded-lg border-t-4 border-primary-500 bg-white p-4 shadow sm:rounded-lg sm:border-l-4 sm:border-t-0 sm:p-6">
        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900 sm:text-2xl">
          <BiHeart className="mr-2 h-6 w-6 text-primary-500 sm:h-7 sm:w-7" />
          Kitaplığım
        </h2>
        <p className="text-sm text-gray-600 sm:text-base">
          Favori kitaplarınız ve son okuduğunuz kitaplar burada listelenir. Favori kitaplarınıza
          hızlıca erişebilir, kaldığınız yerden okumaya devam edebilirsiniz.
        </p>
      </div>

      {/* Son Okunan Kitaplar */}
      {recentlyReadBooks.length > 0 && (
        <section className="space-y-4">
          <h3 className="flex items-center text-lg font-semibold text-gray-900">
            <BiHistory className="mr-2 h-5 w-5" />
            Son Okunan Kitaplar
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyReadBooks.map((book, index) => (
              <BookCard key={book.link} book={book} index={index} />
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((book, index) => (
              <BookCard key={book.link} book={book} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Boş Durum */}
      {recentlyReadBooks.length === 0 && favorites.length === 0 && (
        <div className="text-center text-gray-500">
          <p>Henüz kitaplığınızda kitap bulunmuyor.</p>
          <p>Kitap okumaya başlayın veya favori kitaplarınızı ekleyin.</p>
        </div>
      )}
    </div>
  );
};

export default BookshelfPage;
