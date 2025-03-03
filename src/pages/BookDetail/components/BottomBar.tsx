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
      className={`${controlsClassName} bottom-0 m-4 rounded-xl bg-gradient-to-b from-black/70 to-transparent px-4 py-2`}
    >
      <div className="flex items-center justify-between text-white">
        <div className="text-sm">
          {book.writer && <div className="font-medium">{book.writer}</div>}
          <div className="text-white/70">{book.publisher}</div>
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={buttonClassName}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            Sayfa {currentPage} / {book.pageCount}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={imageError}
            className={buttonClassName}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
