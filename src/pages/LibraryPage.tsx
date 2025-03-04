import { useCallback, useEffect, useRef, useState } from 'react';
import { BiBookOpen, BiError, BiFilterAlt, BiSearch } from 'react-icons/bi';
import 'react-lazy-load-image-component/src/effects/blur.css';
import BookCard from '../components/BookCard';
import { books } from '../utils/books';

// Sayfa başına gösterilecek kitap sayısı
const BOOKS_PER_PAGE = 50;

/**
 * Kütüphane sayfası - Tüm kitapların listelendiği ana sayfa
 */
const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const observer = useRef<IntersectionObserver>();
  const lastBookElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setLoading(true);
          setTimeout(() => {
            setPage(prevPage => prevPage + 1);
            setLoading(false);
          }, 100); // Yükleme animasyonunu görebilmek için kısa bir gecikme
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Türkçe karakterleri İngilizce karakterlere dönüştür
  const turkishToEnglish = (text: string): string => {
    const charMap: { [key: string]: string } = {
      ı: 'i',
      İ: 'i',
      ğ: 'g',
      Ğ: 'g',
      ü: 'u',
      Ü: 'u',
      ş: 's',
      Ş: 's',
      ö: 'o',
      Ö: 'o',
      ç: 'c',
      Ç: 'c',
      â: 'a',
      Â: 'a',
      î: 'i',
      Î: 'i',
      û: 'u',
      Û: 'u',
    };

    return text.replace(/[ıİğĞüÜşŞöÖçÇâÂîÎûÛ]/g, letter => charMap[letter] || letter);
  };

  // Metni normalize et
  const normalizeText = (text: string | null | undefined): string => {
    if (!text) return '';
    // Önce tüm boşlukları tek boşluğa çevir ve trim yap
    const trimmed = text.replace(/\s+/g, ' ').trim().toLowerCase();
    // Türkçe karakterleri dönüştür
    return turkishToEnglish(trimmed);
  };

  // Benzersiz yayınevlerini al
  const publishers = Array.from(new Set(books.map(book => book.publisher))).sort();

  // Arama fonksiyonu
  const filteredBooks = books.filter(book => {
    // Yayınevi filtresi
    if (selectedPublisher && book.publisher !== selectedPublisher) {
      return false;
    }

    const searchWords = normalizeText(searchTerm)
      .split(' ')
      .filter(word => word.length > 0);
    if (searchWords.length === 0) return true;

    // Her bir kitap alanını ayrı ayrı kontrol et ve kelime parçalarını birleştir
    const bookFieldsText = [
      normalizeText(book.name),
      normalizeText(book.writer),
      normalizeText(book.publisher),
      normalizeText(book.series),
    ]
      .filter(Boolean) // null/undefined değerleri filtrele
      .join(' '); // Tüm alanları birleştir

    // Her bir arama kelimesi kitap bilgilerinin herhangi bir yerinde geçiyor mu kontrol et
    return searchWords.every(searchWord => bookFieldsText.includes(searchWord));
  });

  // Filtrelenmiş ve sayfalanmış kitaplar
  const paginatedBooks = filteredBooks.slice(0, page * BOOKS_PER_PAGE);

  useEffect(() => {
    setHasMore(paginatedBooks.length < filteredBooks.length);
  }, [paginatedBooks.length, filteredBooks.length]);

  useEffect(() => {
    // Arama yapıldığında sayfayı sıfırla
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="space-y-4">
      {/* Sayfa Başlığı */}
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-1.5 flex items-center text-lg font-medium text-gray-800 sm:text-xl dark:text-white">
          <BiBookOpen className="mr-2 h-5 w-5 text-primary-500 sm:h-6 sm:w-6" />
          Kütüphane
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tüm kitapların listelendiği bölüm. Kitapları kategorilere göre filtreleyebilir veya arama
          yapabilirsiniz.
        </p>
      </div>

      {/* Arama ve Filtre Alanı */}
      <div
        className={`sticky top-0 z-50 rounded-lg bg-white/95 p-3 backdrop-blur-lg transition-all duration-300 dark:bg-gray-800/95 ${
          isScrolled ? 'shadow-lg' : 'border border-gray-100 dark:border-gray-700'
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          {/* Arama Kutusu */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <BiSearch className="h-[18px] w-[18px] text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Kitap adı, yazar, yayınevi veya seri adı ile arayın..."
              className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-[15px] text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-500 focus:border-primary-500 focus:bg-white focus:shadow-md focus:outline-none focus:ring-1 focus:ring-primary-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
            />
          </div>

          {/* Yayınevi Filtresi */}
          <div className="relative flex w-full sm:w-auto">
            <select
              value={selectedPublisher}
              onChange={e => setSelectedPublisher(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 pr-10 text-[15px] text-gray-900 shadow-sm transition-all duration-200 focus:border-primary-500 focus:bg-white focus:shadow-md focus:outline-none focus:ring-1 focus:ring-primary-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400 dark:focus:bg-gray-800"
            >
              <option value="">Tüm Yayınevleri</option>
              {publishers.map(publisher => (
                <option key={publisher} value={publisher} className="py-2">
                  {publisher}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Sonuç Bilgisi */}
      {(searchTerm || selectedPublisher) && (
        <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <BiFilterAlt className="h-4 w-4 text-primary-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filteredBooks.length} sonuç bulundu
            </span>
          </div>
          {(searchTerm || selectedPublisher) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedPublisher('');
              }}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      )}

      {/* Kitap Listesi */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {paginatedBooks.map((book, index) => (
          <div
            key={book.link}
            ref={index === paginatedBooks.length - 1 ? lastBookElementRef : undefined}
          >
            <BookCard book={book} index={index} />
          </div>
        ))}
      </div>

      {/* Yükleniyor */}
      {loading && (
        <div className="flex justify-center py-6">
          <div className="border-3 h-8 w-8 animate-spin rounded-full border-primary-500 border-t-transparent"></div>
        </div>
      )}

      {/* Sonuç Bulunamadı */}
      {filteredBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 py-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
          <BiError className="mb-3 h-10 w-10 text-gray-400 dark:text-gray-500" />
          <p className="text-gray-600 dark:text-gray-400">Aramanızla eşleşen kitap bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
