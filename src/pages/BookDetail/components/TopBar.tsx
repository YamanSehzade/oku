import { BiArrowBack } from 'react-icons/bi';
import { Book } from '../../../types/book';

interface TopBarProps {
  book: Book;
  controlsClassName: string;
  onGoBack: () => void;
}

export const TopBar = ({ book, controlsClassName, onGoBack }: TopBarProps) => {
  return (
    <div
      className={`${controlsClassName} top-0 mx-2 mt-4 rounded-2xl bg-black/70 px-3 py-2 backdrop-blur-sm sm:mx-4 sm:px-4`}
    >
      <div className="flex items-center justify-between text-white">
        <button
          onClick={onGoBack}
          className="flex items-center rounded-xl bg-white/10 px-3 py-2 text-xs font-medium backdrop-blur-sm transition-opacity hover:bg-white/20 sm:px-4 sm:text-sm"
        >
          <BiArrowBack className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
          Geri
        </button>
        <div className="flex items-center">
          <h1 className="truncate text-sm font-medium sm:text-base">{book.name}</h1>
        </div>
      </div>
    </div>
  );
};
