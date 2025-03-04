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

  // Arama fonksiyonu
  const filteredBooks = books.filter(book => {
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
    <div className="space-y-6">
      {/* Sayfa Başlığı */}
      <div className="rounded-lg border-l-2 border-primary-400 bg-white p-3 shadow-sm sm:p-4">
        <h2 className="mb-2 flex items-center text-lg font-medium text-gray-800 sm:text-xl">
          <BiBookOpen className="mr-2 h-5 w-5 text-primary-400 sm:h-6 sm:w-6" />
          Kütüphane
        </h2>
        <p className="text-sm text-gray-500">
          Tüm kitapların listelendiği bölüm. Kitapları kategorilere göre filtreleyebilir veya arama
          yapabilirsiniz.
        </p>
      </div>

      {/* Arama Çubuğu */}
      <div
        className={`sticky top-0 z-50 bg-white/80 p-3 backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'rounded-none shadow-md' : 'rounded-lg'}`}
      >
        <div className="relative transition-all duration-300 hover:scale-[1.01] hover:transform">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <BiSearch className="h-5 w-5 text-primary-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Kitap adı, yazar, yayınevi veya seri adı ile arayın..."
            className={`block w-full rounded-xl border-2 border-gray-100 bg-white py-3.5 pl-11 pr-4 text-sm shadow-lg placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:text-base`}
          />
        </div>
      </div>

      {/* Sonuç Bilgisi */}
      {searchTerm && (
        <p className="flex items-center text-sm text-gray-600">
          <BiFilterAlt className="mr-1.5 h-4 w-4 text-gray-400" />
          <span className="font-medium">{filteredBooks.length}</span> sonuç bulundu
        </p>
      )}

      {/* Kitap Listesi */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
        <div className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </div>
      )}

      {/* Sonuç Bulunamadı */}
      {filteredBooks.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
          <BiError className="mx-auto mb-3 h-8 w-8 text-gray-400" />
          <p className="text-gray-500">Aramanızla eşleşen kitap bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
