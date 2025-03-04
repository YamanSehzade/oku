import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { BookDetailModal } from './components/BookDetailModal';
import Header from './components/Header';
import { Providers } from './context/Providers';
import AboutPage from './pages/AboutPage';
import BookshelfPage from './pages/BookshelfPage';
import LibraryPage from './pages/LibraryPage';

interface DefaultLayoutProps {
  children?: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const DefaultLayout = ({
  children,
  activeTab,
  setActiveTab,
  isMenuOpen,
  setIsMenuOpen,
}: DefaultLayoutProps) => (
  <main className="min-h-screen bg-primary-50">
    <Header
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
    />
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children || <Outlet />}</div>
  </main>
);

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
        <div className="font-body min-h-screen bg-primary-50">
          <Routes>
            <Route
              path="/"
              element={
                <DefaultLayout
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
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
