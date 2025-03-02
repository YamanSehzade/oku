import BookCard from "../components/BookCard";
import { books } from "../utils/books";

const LibraryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <BookCard key={index} book={book} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
