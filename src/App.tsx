import "./App.css";
import LibraryPage from "./pages/LibraryPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <h1 className="text-3xl font-semibold text-gray-800">Kitaplarımız</h1>
        <LibraryPage />
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
