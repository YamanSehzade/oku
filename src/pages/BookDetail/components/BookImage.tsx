import { Book } from '../../../types/book';
import { styles } from '../styles';

interface BookImageProps {
  book: Book;
  currentPage: number;
  imageError: boolean;
  currentImageUrl: string;
  onError: () => void;
  onGoBack: () => void;
}

export const BookImage = ({
  book,
  currentPage,
  imageError,
  currentImageUrl,
  onError,
  onGoBack,
}: BookImageProps) => {
  if (imageError) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-white/10 dark:backdrop-blur-lg">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-yellow-500/20 dark:text-yellow-500">
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-yellow-400">
            Kitap Bitti
          </h3>
          <p className="mb-6 text-lg text-gray-600 dark:text-yellow-400/70">
            Bu kitabı okumayı tamamladınız
          </p>
          <button
            onClick={onGoBack}
            className="w-full rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500/50"
          >
            Kütüphaneye Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] w-full">
      <img
        src={currentImageUrl}
        alt={`${book.name} - Sayfa ${currentPage}`}
        className={`${styles.image.base} ${styles.image.responsive} h-auto dark:[filter:sepia(0.3)_saturate(1.2)_hue-rotate(0deg)_brightness(0.85)]`}
        onError={onError}
        draggable={false}
      />
    </div>
  );
};
