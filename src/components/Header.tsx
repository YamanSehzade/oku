import { BiBookBookmark, BiLibrary, BiMenu, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

/**
 * Header bileşeni - Uygulama başlığı ve navigasyon menüsünü içerir
 * @param activeTab - Aktif sekme
 * @param setActiveTab - Aktif sekmeyi değiştiren fonksiyon
 * @param isMenuOpen - Mobil menünün açık/kapalı durumu
 * @param setIsMenuOpen - Mobil menüyü açıp/kapatan fonksiyon
 */
const Header = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }: HeaderProps) => {
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
            <h1 className="text-secondary-600 text-2xl font-bold sm:text-3xl">Oku</h1>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="sm:hidden">
            <button
              type="button"
              className="text-secondary-500 hover:bg-secondary-100 hover:text-secondary-600 inline-flex items-center justify-center rounded-md p-2 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <BiMenu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Menü */}
          <DesktopMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Mobil Menü */}
        {isMenuOpen && (
          <MobileMenu
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </nav>
    </header>
  );
};

/**
 * Desktop menü bileşeni
 */
const DesktopMenu = ({
  activeTab,
  setActiveTab,
}: Omit<HeaderProps, 'isMenuOpen' | 'setIsMenuOpen'>) => (
  <div className="hidden sm:flex sm:space-x-8">
    <NavLink
      to="/"
      icon={<BiLibrary className="mr-1 h-5 w-5" />}
      text="Kütüphane"
      isActive={activeTab === 'kutuphane'}
      onClick={() => setActiveTab('kutuphane')}
    />
    <NavLink
      to="/kitaplik"
      icon={<BiBookBookmark className="mr-1 h-5 w-5" />}
      text="Kitaplık"
      isActive={activeTab === 'kitaplik'}
      onClick={() => setActiveTab('kitaplik')}
    />
    <NavLink
      to="/hakkimda"
      icon={<BiUser className="mr-1 h-5 w-5" />}
      text="Hakkımda"
      isActive={activeTab === 'hakkimda'}
      onClick={() => setActiveTab('hakkimda')}
    />
  </div>
);

/**
 * Mobil menü bileşeni
 */
const MobileMenu = ({
  activeTab,
  setActiveTab,
  setIsMenuOpen,
}: Omit<HeaderProps, 'isMenuOpen'>) => (
  <div className="sm:hidden">
    <div className="space-y-1 pb-3 pt-2">
      <MobileNavLink
        to="/"
        icon={<BiLibrary className="mr-2 h-5 w-5" />}
        text="Kütüphane"
        isActive={activeTab === 'kutuphane'}
        onClick={() => {
          setActiveTab('kutuphane');
          setIsMenuOpen(false);
        }}
        activeClassName="bg-secondary-50 border-secondary-500 text-secondary-700"
      />
      <MobileNavLink
        to="/kitaplik"
        icon={<BiBookBookmark className="mr-2 h-5 w-5" />}
        text="Kitaplık"
        isActive={activeTab === 'kitaplik'}
        onClick={() => {
          setActiveTab('kitaplik');
          setIsMenuOpen(false);
        }}
        activeClassName="bg-teal-50 border-teal-500 text-teal-700"
      />
      <MobileNavLink
        to="/hakkimda"
        icon={<BiUser className="mr-2 h-5 w-5" />}
        text="Hakkımda"
        isActive={activeTab === 'hakkimda'}
        onClick={() => {
          setActiveTab('hakkimda');
          setIsMenuOpen(false);
        }}
        activeClassName="bg-accent-50 border-accent-500 text-accent-700"
      />
    </div>
  </div>
);

/**
 * Desktop navigasyon link bileşeni
 */
const NavLink = ({
  to,
  icon,
  text,
  isActive,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <Link
    to={to}
    className={`${
      isActive
        ? 'border-secondary-500 text-gray-900'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
    onClick={onClick}
  >
    {icon}
    {text}
  </Link>
);

/**
 * Mobil navigasyon link bileşeni
 */
const MobileNavLink = ({
  to,
  icon,
  text,
  isActive,
  onClick,
  activeClassName,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
  activeClassName: string;
}) => (
  <Link
    to={to}
    className={`${
      isActive
        ? activeClassName
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
    } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`}
    onClick={onClick}
  >
    <div className="flex items-center">
      {icon}
      {text}
    </div>
  </Link>
);

export default Header;
