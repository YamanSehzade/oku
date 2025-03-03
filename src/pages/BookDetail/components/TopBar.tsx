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
      className={`${controlsClassName} top-0 bg-gradient-to-b from-black/70 to-transparent px-4 py-2`}
    >
      <div className="flex items-center justify-between text-white">
        <button
          onClick={onGoBack}
          className="flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-opacity hover:bg-white/20"
        >
          <BiArrowBack className="mr-2 h-5 w-5" />
          Geri
        </button>
        <div className="flex items-center">
          <h1 className="text-lg font-medium">{book.name}</h1>
        </div>
      </div>
    </div>
  );
};
