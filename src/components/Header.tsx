import { BiBookOpen, BiInfoCircle, BiLibrary, BiMenuAltRight, BiMoon, BiSun } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    {
      id: 'kitaplik',
      name: 'Kitaplık',
      icon: BiLibrary,
      href: '/',
    },
    {
      id: 'kutuphane',
      name: 'Kütüphane',
      icon: BiBookOpen,
      href: '/kutuphane',
    },
    {
      id: 'hakkinda',
      name: 'Hakkında',
      icon: BiInfoCircle,
      href: '/hakkinda',
    },
  ];

  return (
    <header className="bg-white shadow-sm transition-colors duration-200 dark:bg-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo ve Başlık */}
          <div className="flex flex-shrink-0 items-center">
            <img
              src="/icons/icon-512x512.png"
              alt="Oku Logo"
              className="mr-3 h-10 w-10 bg-transparent sm:h-12 sm:w-12"
            />
            <h1 className="font-display text-2xl font-bold text-secondary-600 sm:text-3xl dark:text-secondary-400">
              OKU
            </h1>
          </div>

          {/* Desktop Menü */}
          <div className="hidden sm:flex sm:space-x-8">
            {tabs.map(tab => (
              <Link
                key={tab.id}
                to={tab.href}
                className={`${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon
                  className={`mr-2 h-5 w-5 ${
                    activeTab === tab.id ? 'text-primary-500' : 'text-gray-400'
                  }`}
                />
                {tab.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Tema Değiştirme Butonu */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-yellow-400 dark:hover:bg-yellow-400/10"
              title={theme === 'light' ? 'Koyu Tema' : 'Açık Tema'}
            >
              {theme === 'light' ? <BiMoon className="h-5 w-5" /> : <BiSun className="h-5 w-5" />}
            </button>

            {/* Mobil Menü Butonu */}
            <div className="sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:hover:bg-gray-700 dark:hover:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <BiMenuAltRight
                  className={`h-7 w-7 transform transition-transform duration-300 ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobil Menü */}
        <div
          className={`transform overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
            isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-1 pb-3 pt-2">
            {tabs.map(tab => (
              <Link
                key={tab.id}
                to={tab.href}
                className={`${
                  activeTab === tab.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                } block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all duration-200`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center">
                  <tab.icon
                    className={`mr-2 h-5 w-5 ${
                      activeTab === tab.id ? 'text-primary-500' : 'text-gray-400'
                    }`}
                  />
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
