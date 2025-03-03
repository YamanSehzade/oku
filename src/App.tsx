import { useState } from 'react';
import { BiBookBookmark, BiLibrary, BiUser } from 'react-icons/bi';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { FavoritesProvider } from './context/FavoritesContext';

const App = () => {
  const [activeTab, setActiveTab] = useState('kutuphane');

  return (
    <Router>
      <FavoritesProvider>
        <div className="bg-primary-50 min-h-screen">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <img src="/icons/icon-192x192.png" alt="Oku Logo" className="mr-2 h-8 w-8" />
                  <h1 className="text-secondary-600 text-2xl font-bold">Oku</h1>
                </div>
                <div className="sm:flex sm:space-x-8">
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
            </nav>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
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
    <div className="border-primary-500 border-l-4 bg-white p-6 shadow sm:rounded-lg">
      <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
        <BiLibrary className="text-secondary-500 mr-2 h-7 w-7" />
        Kütüphane
      </h2>
      <p className="text-gray-600">Tüm kitapların listelendiği bölüm.</p>
      {/* Kitap listesi buraya gelecek */}
    </div>
  );
};

const Kitaplik = () => {
  return (
    <div className="border-l-4 border-teal-500 bg-white p-6 shadow sm:rounded-lg">
      <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
        <BiBookBookmark className="mr-2 h-7 w-7 text-teal-500" />
        Kitaplık
      </h2>
      <p className="text-gray-600">Seçtiğiniz kitapların bulunduğu özel koleksiyon.</p>
      {/* Seçili kitaplar listesi buraya gelecek */}
    </div>
  );
};

const Hakkimda = () => {
  return (
    <div className="border-accent-500 border-l-4 bg-white p-6 shadow sm:rounded-lg">
      <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-900">
        <BiUser className="text-accent-500 mr-2 h-7 w-7" />
        Hakkımda
      </h2>
      <p className="text-gray-600">Kişisel bilgiler ve tercihler.</p>
      {/* Hakkımda içeriği buraya gelecek */}
    </div>
  );
};

export default App;
