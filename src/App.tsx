import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { LastReadProvider } from './context/LastReadContext';

// Bileşen importları
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import BookDetailPage from './pages/BookDetailPage';
import BookshelfPage from './pages/BookshelfPage';
import LibraryPage from './pages/LibraryPage';

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
    }
  }, [location.pathname]);

  return (
    <div className="font-body min-h-screen bg-primary-50">
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
          <Route path="/hakkinda" element={<AboutPage />} />
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
        <LastReadProvider>
          <AppContent />
        </LastReadProvider>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
