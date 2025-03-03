import { useState } from 'react';
import { BiBookBookmark, BiLibrary, BiMenu, BiUser } from 'react-icons/bi';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { FavoritesProvider } from './context/FavoritesContext';

const App = () => {
  const [activeTab, setActiveTab] = useState('kutuphane');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <FavoritesProvider>
        <div className="bg-primary-50 min-h-screen">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
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
                <div className="hidden sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className={`${
                      activeTab === 'kutuphane'
                        ? 'border-secondary-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                    onClick={() => setActiveTab('kutuphane')}
                  >
                    <BiLibrary className="mr-1 h-5 w-5" />
                    Kütüphane
                  </Link>
                  <Link
                    to="/kitaplik"
                    className={`${
                      activeTab === 'kitaplik'
                        ? 'border-secondary-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                    onClick={() => setActiveTab('kitaplik')}
                  >
                    <BiBookBookmark className="mr-1 h-5 w-5" />
                    Kitaplık
                  </Link>
                  <Link
                    to="/hakkimda"
                    className={`${
                      activeTab === 'hakkimda'
                        ? 'border-secondary-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                    onClick={() => setActiveTab('hakkimda')}
                  >
                    <BiUser className="mr-1 h-5 w-5" />
                    Hakkımda
                  </Link>
                </div>
              </div>

              {/* Mobil Menü */}
              {isMenuOpen && (
                <div className="sm:hidden">
                  <div className="space-y-1 pb-3 pt-2">
                    <Link
                      to="/"
                      className={`${
                        activeTab === 'kutuphane'
                          ? 'bg-secondary-50 border-secondary-500 text-secondary-700'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                      } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`}
                      onClick={() => {
                        setActiveTab('kutuphane');
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <BiLibrary className="mr-2 h-5 w-5" />
                        Kütüphane
                      </div>
                    </Link>
                    <Link
                      to="/kitaplik"
                      className={`${
                        activeTab === 'kitaplik'
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                      } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`}
                      onClick={() => {
                        setActiveTab('kitaplik');
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <BiBookBookmark className="mr-2 h-5 w-5" />
                        Kitaplık
                      </div>
                    </Link>
                    <Link
                      to="/hakkimda"
                      className={`${
                        activeTab === 'hakkimda'
                          ? 'bg-accent-50 border-accent-500 text-accent-700'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                      } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`}
                      onClick={() => {
                        setActiveTab('hakkimda');
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <BiUser className="mr-2 h-5 w-5" />
                        Hakkımda
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </nav>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Kutuphane />} />
              <Route path="/kitaplik" element={<Kitaplik />} />
              <Route path="/hakkimda" element={<Hakkimda />} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </Router>
  );
};

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

export default App;
