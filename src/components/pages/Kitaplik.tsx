import { BiBookBookmark } from 'react-icons/bi';

/**
 * Kitaplık sayfası - Kullanıcının seçtiği kitapların listelendiği sayfa
 */
const Kitaplik = () => {
  return (
    <div className="rounded-lg border-t-4 border-teal-500 bg-white p-4 shadow sm:rounded-lg sm:border-l-4 sm:border-t-0 sm:p-6">
      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900 sm:text-2xl">
        <BiBookBookmark className="mr-2 h-6 w-6 text-teal-500 sm:h-7 sm:w-7" />
        Kitaplık
      </h2>
      <p className="text-sm text-gray-600 sm:text-base">
        Seçtiğiniz kitapların bulunduğu özel koleksiyon.
      </p>
    </div>
  );
};

export default Kitaplik;
