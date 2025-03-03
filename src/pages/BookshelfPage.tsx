import { BiBookBookmark } from 'react-icons/bi';
import BookCard from '../components/BookCard';
import { useFavorites } from '../context/FavoritesContext';

/**
 * Kitaplık sayfası - Kullanıcının seçtiği kitapların listelendiği sayfa
 */
const BookshelfPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-6">
      {/* Sayfa Başlığı */}
      <div className="rounded-lg border-t-4 border-teal-500 bg-white p-4 shadow sm:rounded-lg sm:border-l-4 sm:border-t-0 sm:p-6">
        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900 sm:text-2xl">
          <BiBookBookmark className="mr-2 h-6 w-6 text-teal-500 sm:h-7 sm:w-7" />
          Kitaplık
        </h2>
        <p className="text-sm text-gray-600 sm:text-base">
          Seçtiğiniz kitapların bulunduğu özel koleksiyon. Burada favori kitaplarınızı
          görüntüleyebilir ve yönetebilirsiniz.
        </p>
      </div>

      {/* Favori Kitaplar Listesi */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.length > 0 ? (
          favorites.map((book, index) => <BookCard key={index} book={book} index={index} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">
            <p className="text-lg">Henüz favori kitabınız bulunmuyor.</p>
            <p className="mt-2">Kütüphane sayfasından kitap ekleyebilirsiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookshelfPage;
