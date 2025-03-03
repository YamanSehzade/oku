import { BiUser } from 'react-icons/bi';

/**
 * Hakkımda sayfası - Kullanıcı bilgileri ve tercihlerinin gösterildiği sayfa
 */
const Hakkimda = () => {
  return (
    <div className="border-accent-500 rounded-lg border-t-4 bg-white p-4 shadow sm:rounded-lg sm:border-l-4 sm:border-t-0 sm:p-6">
      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900 sm:text-2xl">
        <BiUser className="text-accent-500 mr-2 h-6 w-6 sm:h-7 sm:w-7" />
        Hakkımda
      </h2>
      <p className="text-sm text-gray-600 sm:text-base">Kişisel bilgiler ve tercihler.</p>
    </div>
  );
};

export default Hakkimda;
