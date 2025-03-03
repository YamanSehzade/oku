import { useState } from 'react';
import { BiBookOpen, BiError, BiFilterAlt, BiSearch } from 'react-icons/bi';
import BookCard from '../components/BookCard';
import { books } from '../utils/books';

/**
 * Kütüphane sayfası - Tüm kitapların listelendiği ana sayfa
 */
const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <BiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Kitap adı, yazar, yayınevi veya seri adı ile arayın..."
          className="block w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-base"
        />
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
        {filteredBooks.map((book, index) => (
          <BookCard key={book.link} book={book} index={index} />
        ))}
      </div>

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
