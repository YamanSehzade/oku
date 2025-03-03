import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { BookmarksProvider } from './context/BookmarksContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Bileşen importları
import Header from './components/Header';
import BookDetailPage from './pages/BookDetailPage';
import BookshelfPage from './pages/BookshelfPage';
import LibraryPage from './pages/LibraryPage';
import ProfilePage from './pages/ProfilePage';

/**
 * Ana uygulama bileşeni
 * Routing ve state yönetimini sağlar
 */
const AppContent = () => {
  const [activeTab, setActiveTab] = useState('kutuphane');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // URL değiştiğinde activeTab'i güncelle
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveTab('kutuphane');
    } else if (path === '/kitaplik') {
      setActiveTab('kitaplik');
    } else if (path === '/hakkimda') {
      setActiveTab('hakkimda');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-primary-50">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<LibraryPage />} />
          <Route path="/kitaplik" element={<BookshelfPage />} />
          <Route path="/hakkimda" element={<ProfilePage />} />
          <Route path="/kitap/:id" element={<BookDetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <FavoritesProvider>
        <BookmarksProvider>
          <AppContent />
        </BookmarksProvider>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
