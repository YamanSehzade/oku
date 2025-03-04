import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { BiBookmark, BiChevronDown, BiError, BiHeart, BiHistory, BiLibrary } from 'react-icons/bi';
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

  // Kartların açık/kapalı durumunu tutacak state'ler
  const [isRecentOpen, setIsRecentOpen] = useState(true);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isFinishedOpen, setIsFinishedOpen] = useState(false);

  // Bölümleri açıp kapatma fonksiyonu
  const toggleSection = (section: 'recent' | 'favorites' | 'finished') => {
    // Aynı bölüme tıklandığında sadece o bölümü aç/kapat
    if (section === 'recent' && isRecentOpen) {
      setIsRecentOpen(false);
      return;
    }
    if (section === 'favorites' && isFavoritesOpen) {
      setIsFavoritesOpen(false);
      return;
    }
    if (section === 'finished' && isFinishedOpen) {
      setIsFinishedOpen(false);
      return;
    }

    // Farklı bir bölüme tıklandığında diğerlerini kapat
    setIsRecentOpen(section === 'recent');
    setIsFavoritesOpen(section === 'favorites');
    setIsFinishedOpen(section === 'finished');
  };

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
      <div className="rounded-lg border-l-2 border-primary-400 bg-white p-3 shadow-sm dark:bg-gray-800 sm:p-4">
        <h2 className="mb-2 flex items-center text-lg font-medium text-gray-800 dark:text-white sm:text-xl">
          <BiLibrary className="mr-2 h-5 w-5 text-primary-400 sm:h-6 sm:w-6" />
          Kitaplığım
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Favori kitaplarınız ve son okuduğunuz kitaplar burada listelenir.
        </p>
      </div>

      {/* Son Okunan Kitaplar */}
      {recentlyReadBooks.length > 0 && (
        <section className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
          <button
            onClick={() => toggleSection('recent')}
            className="flex w-full items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <BiHistory className="mr-2 h-5 w-5 text-primary-500" />
              Son Okunan Kitaplar
            </h3>
            <motion.div animate={{ rotate: isRecentOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <BiChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </motion.div>
          </button>
          <AnimatePresence>
            {isRecentOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-t border-gray-100 p-6 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    {recentlyReadBooks.map((book, index) => (
                      <BookCard
                        key={book.link}
                        book={book}
                        index={index}
                        lastReadPage={lastReadPages.find(lrp => lrp.book.link === book.link)?.page}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* Favori Kitaplar */}
      {favorites.length > 0 && (
        <section className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
          <button
            onClick={() => toggleSection('favorites')}
            className="flex w-full items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <BiHeart className="mr-2 h-5 w-5 text-primary-500" />
              Favori Kitaplar
            </h3>
            <motion.div
              animate={{ rotate: isFavoritesOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <BiChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </motion.div>
          </button>
          <AnimatePresence>
            {isFavoritesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-t border-gray-100 p-6 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    {favorites.map((book, index) => (
                      <BookCard key={book.link} book={book} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* Biten Kitaplar */}
      {finishedBooks.length > 0 && (
        <section className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
          <button
            onClick={() => toggleSection('finished')}
            className="flex w-full items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <BiBookmark className="mr-2 h-5 w-5 text-primary-500" />
              Biten Kitaplar
            </h3>
            <motion.div
              animate={{ rotate: isFinishedOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <BiChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </motion.div>
          </button>
          <AnimatePresence>
            {isFinishedOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-t border-gray-100 p-6 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    {finishedBooks.map((book, index) => (
                      <BookCard
                        key={book.link}
                        book={book}
                        index={index}
                        lastReadPage={lastReadPages.find(lrp => lrp.book.link === book.link)?.page}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* Boş Durum */}
      {recentlyReadBooks.length === 0 && favorites.length === 0 && finishedBooks.length === 0 && (
        <div className="rounded-lg bg-white p-8 text-center text-gray-500 shadow-md dark:bg-gray-800">
          <BiError className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-500" />
          <p className="text-lg font-medium dark:text-white">
            Henüz kitaplığınızda kitap bulunmuyor.
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Kitap okumaya başlayın veya favori kitaplarınızı ekleyin.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookshelfPage;
