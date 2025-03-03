import './App.css';
import LibraryPage from './pages/LibraryPage';
import BookDetailPage from './pages/BookDetailPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="min-h-screen">
          <main className="pb-12">
            <Routes>
              <Route path="/" element={<LibraryPage />} />
              <Route path="/kitap/:id" element={<BookDetailPage />} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
