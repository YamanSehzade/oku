import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Book } from '../../../types/book';

interface BottomBarProps {
  book: Book;
  currentPage: number;
  controlsClassName: string;
  buttonClassName: string;
  imageError: boolean;
  onPageChange: (page: number) => void;
}

export const BottomBar = ({
  book,
  currentPage,
  controlsClassName,
  buttonClassName,
  imageError,
  onPageChange,
}: BottomBarProps) => {
  return (
    <div
      className={`${controlsClassName} bottom-0 mx-2 mb-4 rounded-2xl bg-black/50 px-3 py-2 backdrop-blur-sm dark:bg-black/30 sm:mx-4 sm:px-4`}
    >
      <div className="flex flex-col space-y-2 text-white dark:text-yellow-400 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="text-xs sm:text-sm">
          {book.writer && <div className="font-medium">{book.writer}</div>}
          <div className="text-white/70 dark:text-yellow-400/60">{book.publisher}</div>
        </div>
        <div className="flex items-center justify-between sm:gap-8">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${buttonClassName} rounded-xl p-2`}
          >
            <BiChevronLeft className="h-6 w-6" />
          </button>
          <span className="rounded-xl bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-sm dark:bg-white/5 sm:text-sm">
            {currentPage} / {book.pageCount}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={imageError}
            className={`${buttonClassName} rounded-xl p-2`}
          >
            <BiChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
