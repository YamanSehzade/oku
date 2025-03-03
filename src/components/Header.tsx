import { BiBookOpen, BiHeart, BiMenu, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

/**
 * Header bileşeni - Uygulama başlığı ve navigasyon menüsünü içerir
 * @param activeTab - Aktif sekme
 * @param setActiveTab - Aktif sekmeyi değiştiren fonksiyon
 * @param isMenuOpen - Mobil menünün açık/kapalı durumu
 * @param setIsMenuOpen - Mobil menüyü açıp/kapatan fonksiyon
 */
const Header = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }: Props) => {
  const tabs = [
    {
      id: 'kutuphane',
      name: 'Kütüphane',
      icon: BiBookOpen,
      href: '/',
    },
    {
      id: 'kitaplik',
      name: 'Kitaplık',
      icon: BiHeart,
      href: '/kitaplik',
    },
    {
      id: 'hakkimda',
      name: 'Hakkımda',
      icon: BiUser,
      href: '/hakkimda',
    },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo ve Başlık */}
          <div className="flex flex-shrink-0 items-center">
            <img
              src="/icons/icon-192x192.png"
              alt="Oku Logo"
              className="mr-3 h-10 w-10 sm:h-12 sm:w-12"
            />
            <h1 className="text-2xl font-bold text-secondary-600 sm:text-3xl">Oku</h1>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-secondary-500 hover:bg-secondary-100 hover:text-secondary-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <BiMenu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Menü */}
          <div className="hidden sm:flex sm:space-x-8">
            {tabs.map(tab => (
              <Link
                key={tab.id}
                to={tab.href}
                className={`${
                  activeTab === tab.id
                    ? 'border-secondary-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobil Menü */}
        <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="space-y-1 pb-3 pt-2">
            {tabs.map(tab => (
              <Link
                key={tab.id}
                to={tab.href}
                className={`${
                  activeTab === tab.id
                    ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center">
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
