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
      <div className={styles.error.container}>
        <div className={styles.error.content}>
          <div className="mb-4 text-2xl font-semibold text-white dark:text-yellow-400">
            Kitap Bitti
          </div>
          <div className="text-lg text-white/70 dark:text-yellow-400/60">
            Bu kitabı okumayı tamamladınız
          </div>
          <button onClick={onGoBack} className={styles.error.button}>
            Geri Dön
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
