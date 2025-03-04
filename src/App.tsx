import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { FavoritesProvider } from './context/FavoritesContext';
import { LastReadProvider } from './context/LastReadContext';
import AboutPage from './pages/AboutPage';
import BookDetailPage from './pages/BookDetail/BookDetailPage';
import BookshelfPage from './pages/BookshelfPage';
import LibraryPage from './pages/LibraryPage';

interface DefaultLayoutProps {
  children?: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

interface BookDetailLayoutProps {
  children: React.ReactNode;
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

const BookDetailLayout = ({ children }: BookDetailLayoutProps) => (
  <main className="min-h-screen">{children}</main>
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
      <div className="font-body min-h-screen bg-primary-50">
        <FavoritesProvider>
          <LastReadProvider>
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

              <Route
                path="/kitap/:id"
                element={
                  <BookDetailLayout>
                    <BookDetailPage />
                  </BookDetailLayout>
                }
              />
            </Routes>
          </LastReadProvider>
        </FavoritesProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
