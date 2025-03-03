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
  activeTab,
  setActiveTab,
  isMenuOpen,
  setIsMenuOpen,
}: DefaultLayoutProps) => (
  <>
    <Header
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
    />
    <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
      <Outlet />
    </main>
  </>
);

const BookDetailLayout = ({ children }: BookDetailLayoutProps) => (
  <main className="min-h-screen">{children}</main>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('kitaplik');
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
                <Route index element={<LibraryPage />} />
                <Route path="kitaplik" element={<BookshelfPage />} />
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
