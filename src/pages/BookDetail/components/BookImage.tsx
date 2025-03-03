import { Book } from '../../../types/book';

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
      <div className="flex min-h-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-2xl font-semibold text-white">Kitap Bitti</div>
        <div className="text-lg text-white/70">Bu kitabı okumayı tamamladınız</div>
        <button
          onClick={onGoBack}
          className="mt-8 rounded-lg bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <img
      src={currentImageUrl}
      alt={`${book.name} - Sayfa ${currentPage}`}
      className="min-h-full w-full select-none object-contain landscape:object-cover"
      onError={onError}
      draggable={false}
    />
  );
};
