import "./App.css";
import LibraryPage from "./pages/LibraryPage";
import BookDetailPage from "./pages/BookDetailPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="min-h-screen bg-gray-100">
          <header className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center">
                Kitaplarımız
              </h1>
            </div>
          </header>
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
