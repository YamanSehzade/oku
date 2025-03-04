import { BiArrowBack, BiMoon, BiPrinter, BiSun } from 'react-icons/bi';
import { useTheme } from '../../../context/ThemeContext';
import { Book } from '../../../types/book';

interface TopBarProps {
  book: Book;
  controlsClassName?: string;
  onGoBack: () => void;
}

export const TopBar = ({ book, controlsClassName, onGoBack }: TopBarProps) => {
  const { theme, toggleTheme } = useTheme();

  const handlePrint = () => {
    const currentImage = document.querySelector('img[alt*="Sayfa"]') as HTMLImageElement;
    if (!currentImage) return;

    // iOS için basit bir çözüm
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      const printWindow = window.open(currentImage.src, '_blank');
      if (printWindow) {
        printWindow.focus();
      }
    } else {
      // Diğer tarayıcılar için iframe çözümü
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const printDocument = iframe.contentWindow?.document;
      if (!printDocument) return;

      printDocument.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${book.name}</title>
            <style>
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                }
                img {
                  width: 100%;
                  height: auto;
                  page-break-inside: avoid;
                }
              }
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                min-height: 100vh;
                background: #000;
              }
              img {
                max-width: 100%;
                width: 100%;
                height: auto;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="${currentImage.src}" onload="window.focus(); window.print(); window.close();" />
          </body>
        </html>
      `);
      printDocument.close();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }
  };

  return (
    <div
      className={`${controlsClassName} top-0 mx-1 mt-2 rounded-xl bg-black/50 px-2 py-1.5 backdrop-blur-sm dark:bg-black/30 sm:mx-4 sm:mt-4 sm:rounded-2xl sm:px-3 sm:py-2`}
    >
      <div className="flex items-center justify-between text-white dark:text-yellow-400">
        <button
          onClick={onGoBack}
          className="flex items-center rounded-lg bg-white/10 px-2 py-1.5 text-[10px] font-medium backdrop-blur-sm transition-opacity hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs"
        >
          <BiArrowBack className="mr-1 h-3.5 w-3.5 sm:mr-1.5 sm:h-4 sm:w-4" />
          Geri
        </button>
        <div className="flex items-center gap-1 sm:gap-4">
          <h1 className="max-w-[120px] truncate text-xs font-medium sm:max-w-none sm:text-sm">
            {book.name}
          </h1>
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center rounded-lg bg-white/10 p-1.5 text-[10px] font-medium backdrop-blur-sm transition-opacity hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 sm:rounded-xl sm:p-2 sm:text-xs"
              title={theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
            >
              {theme === 'dark' ? (
                <BiSun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <BiMoon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center rounded-lg bg-white/10 p-1.5 text-[10px] font-medium backdrop-blur-sm transition-opacity hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 sm:rounded-xl sm:p-2 sm:text-xs"
              title="Sayfayı Yazdır"
            >
              <BiPrinter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
