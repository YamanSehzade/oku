import "./App.css";
import LibraryPage from "./pages/LibraryPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
          
          <div className="container mx-auto">
            <LibraryPage />
          </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
