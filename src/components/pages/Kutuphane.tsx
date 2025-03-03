import { BiLibrary } from 'react-icons/bi';

/**
 * Kütüphane sayfası - Tüm kitapların listelendiği ana sayfa
 */
const Kutuphane = () => {
  return (
    <div className="border-primary-500 rounded-lg border-t-4 bg-white p-4 shadow sm:rounded-lg sm:border-l-4 sm:border-t-0 sm:p-6">
      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900 sm:text-2xl">
        <BiLibrary className="text-secondary-500 mr-2 h-6 w-6 sm:h-7 sm:w-7" />
        Kütüphane
      </h2>
      <p className="text-sm text-gray-600 sm:text-base">Tüm kitapların listelendiği bölüm.</p>
    </div>
  );
};

export default Kutuphane;
