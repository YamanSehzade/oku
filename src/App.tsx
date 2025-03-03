import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { FavoritesProvider } from './context/FavoritesContext';

// Bileşen importları
import Header from './components/Header';
import BookshelfPage from './pages/BookshelfPage';
import LibraryPage from './pages/LibraryPage';
import ProfilePage from './pages/ProfilePage';

/**
 * Ana uygulama bileşeni
 * Routing ve state yönetimini sağlar
 */
const App = () => {
  // Navigasyon state'leri
  const [activeTab, setActiveTab] = useState('kutuphane');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <FavoritesProvider>
        <div className="bg-primary-50 min-h-screen">
          {/* Header Bileşeni */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />

          {/* Ana İçerik */}
          <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<LibraryPage />} />
              <Route path="/kitaplik" element={<BookshelfPage />} />
              <Route path="/hakkimda" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
