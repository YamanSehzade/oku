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
          <div className="mb-4 text-2xl font-semibold text-white">Kitap Bitti</div>
          <div className="text-lg text-white/70">Bu kitabı okumayı tamamladınız</div>
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
        className={`${styles.image.base} ${styles.image.responsive} h-auto`}
        onError={onError}
        draggable={false}
      />
    </div>
  );
};
