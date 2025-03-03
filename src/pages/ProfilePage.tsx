import { BiBookOpen, BiTime, BiUser } from 'react-icons/bi';

/**
 * Profil sayfası - Kullanıcı bilgileri ve istatistiklerinin gösterildiği sayfa
 */
const ProfilePage = () => {
  return (
    <div className="space-y-6">
      {/* Profil Başlığı */}
      <div className="border-accent-500 rounded-lg border-t-4 bg-white p-4 shadow sm:rounded-lg sm:border-l-4 sm:border-t-0 sm:p-6">
        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900 sm:text-2xl">
          <BiUser className="text-accent-500 mr-2 h-6 w-6 sm:h-7 sm:w-7" />
          Hakkımda
        </h2>
        <p className="text-sm text-gray-600 sm:text-base">
          Kişisel bilgileriniz ve okuma alışkanlıklarınızla ilgili istatistikler.
        </p>
      </div>

      {/* İstatistikler */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Okuma İstatistikleri */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
            <BiBookOpen className="text-secondary-500 mr-2 h-5 w-5" />
            Okuma İstatistikleri
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Okunan Kitap Sayısı</p>
              <p className="text-secondary-600 mt-1 text-2xl font-semibold">12</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Favori Kategori</p>
              <p className="mt-1 text-lg text-gray-900">Roman</p>
            </div>
          </div>
        </div>

        {/* Zaman İstatistikleri */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
            <BiTime className="mr-2 h-5 w-5 text-teal-500" />
            Zaman İstatistikleri
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Toplam Okuma Süresi</p>
              <p className="mt-1 text-2xl font-semibold text-teal-600">48 saat</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Günlük Ortalama</p>
              <p className="mt-1 text-lg text-gray-900">2 saat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
