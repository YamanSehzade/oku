import { Book } from "../utils/books";

type Props = {
  book: Book;
};

const BookCard = ({ book }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-64 transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="relative">
        <img
          src={`${book.link}/2.jpg`}
          alt={book.name}
          className="w-full h-40 object-cover rounded-md"
        />
        <span className="absolute top-2 right-2 bg-blue-500 text-red text-xs px-2 py-1 rounded">
          {book.pageCount} Sayfa
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {book.name}
        </h3>
        <p className="text-sm text-gray-600">{book.writer}</p>
        <p className="text-xs text-gray-500">{book.publisher}</p>
      </div>

      <a
        href={book.link}
        className="mt-3 block text-center bg-blue-500 text-white py-2 rounded-md text-sm font-medium transition hover:bg-blue-600"
      >
        Detaylı İncele
      </a>
    </div>
  );
};

export default BookCard;
