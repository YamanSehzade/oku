import { BiBookOpen } from 'react-icons/bi';
import BookCard from '../components/BookCard';
import { books } from '../utils/books';

/**
 * Kütüphane sayfası - Tüm kitapların listelendiği ana sayfa
 */
const LibraryPage = () => {
  return (
    <div className="space-y-6">
      {/* Sayfa Başlığı */}
      <div className="rounded-lg border-t-4 border-primary-500 bg-white p-4 shadow sm:rounded-lg sm:border-l-4 sm:border-t-0 sm:p-6">
        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900 sm:text-2xl">
          <BiBookOpen className="mr-2 h-6 w-6 text-primary-500 sm:h-7 sm:w-7" />
          Kütüphane
        </h2>
        <p className="text-sm text-gray-600 sm:text-base">
          Tüm kitapların listelendiği bölüm. Kitapları kategorilere göre filtreleyebilir veya arama
          yapabilirsiniz. Beğendiğiniz kitapları favorilere ekleyebilir ve okumaya
          başlayabilirsiniz.
        </p>
      </div>

      {/* Kitap Listesi */}
      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {books.map((book, index) => (
          <BookCard key={book.link} book={book} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
