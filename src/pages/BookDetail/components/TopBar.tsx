import { BiArrowBack, BiPrinter } from 'react-icons/bi';
import { Book } from '../../../types/book';

interface TopBarProps {
  book: Book;
  controlsClassName: string;
  onGoBack: () => void;
  currentPage: number;
}

export const TopBar = ({ book, controlsClassName, onGoBack, currentPage }: TopBarProps) => {
  const handlePrint = () => {
    // Mevcut görüntülenen resmi bul
    const currentImage = document.querySelector('.BookImage img') as HTMLImageElement;
    if (!currentImage) return;

    // Yeni pencere aç ve sadece resmi yazdır
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <img src="${currentImage.src}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

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
        <div className="flex items-center gap-2 sm:gap-4">
          <h1 className="truncate text-sm font-medium sm:text-base">{book.name}</h1>
          <button
            onClick={handlePrint}
            className="flex items-center rounded-xl bg-white/10 p-2 text-xs font-medium backdrop-blur-sm transition-opacity hover:bg-white/20 sm:text-sm"
            title="Sayfayı Yazdır"
          >
            <BiPrinter className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
