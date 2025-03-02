import BookCard from "../components/BookCard";
import { books } from "../utils/books";

const LibraryPage = () => {
  return (
    <ul className="list-disc pl-5">
      <h1 className="text-xl font-semibold text-gray-800">Kitaplarımız TEST</h1>
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </ul>
  );
};

export default LibraryPage;
