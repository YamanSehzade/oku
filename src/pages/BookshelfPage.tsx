import { useMemo } from 'react';
import BookCard from '../components/BookCard';
import { useFavorites } from '../context/FavoritesContext';
import { useLastRead } from '../context/LastReadContext';

/**
 * Kitaplık sayfası - Kullanıcının seçtiği kitapların listelendiği sayfa
 */
const BookshelfPage = () => {
  const { favorites } = useFavorites();
  const { lastReadPages } = useLastRead();

  // Son okunan kitapları tarihe göre sırala
  const recentlyRead = useMemo(() => {
    return [...lastReadPages].sort(
      (a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime()
    );
  }, [lastReadPages]);

  if (favorites.length === 0 && lastReadPages.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Kitaplığınız boş</h2>
        <p className="text-gray-600">
          Favori kitaplarınızı ekleyin veya kitapları okuyarak kaldığınız yeri kaydedin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Son Okunanlar */}
      {recentlyRead.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Son Okunanlar</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {recentlyRead.map((lastRead, index) => (
              <div key={lastRead.book.link} className="relative">
                <BookCard book={lastRead.book} index={index} />
                <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-center">
                  <span className="rounded-b-lg bg-accent-500 px-2 py-1 text-xs font-medium text-white">
                    Sayfa {lastRead.page}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Favoriler */}
      {favorites.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Favoriler</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {favorites.map((book, index) => (
              <BookCard key={book.link} book={book} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BookshelfPage;
