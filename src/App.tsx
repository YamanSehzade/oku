import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { BookDetailModal } from './components/BookDetailModal';
import Header from './components/Header';
import { Providers } from './context/Providers';
import AboutPage from './pages/AboutPage';
import BookshelfPage from './pages/BookshelfPage';
import LibraryPage from './pages/LibraryPage';

const App = () => {
  // URL'e göre başlangıç tab'ini belirle
  const getInitialTab = () => {
    const path = window.location.pathname;
    if (path === '/') return 'kitaplik';
    if (path === '/kutuphane') return 'kutuphane';
    if (path === '/hakkinda') return 'hakkinda';
    return 'kitaplik';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Providers>
        <div className="font-body min-h-screen bg-primary-50 dark:bg-gray-900">
          <Routes>
            <Route
              path="/"
              element={
                <main className="min-h-screen bg-primary-50 transition-colors duration-200 dark:bg-gray-900">
                  <div className="pt-[env(safe-area-inset-top)]">
                    <Header
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      isMenuOpen={isMenuOpen}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  </div>
                  <div className="mx-auto max-w-7xl px-4 py-6 pb-[env(safe-area-inset-bottom)] sm:px-6 lg:px-8">
                    <Outlet />
                  </div>
                </main>
              }
            >
              <Route index element={<BookshelfPage />} />
              <Route path="kutuphane" element={<LibraryPage />} />
              <Route path="hakkinda" element={<AboutPage />} />
            </Route>
          </Routes>
          <BookDetailModal />
        </div>
      </Providers>
    </BrowserRouter>
  );
};

export default App;
