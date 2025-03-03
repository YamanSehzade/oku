import { useState } from 'react';
import { BiBookOpen, BiSearch } from 'react-icons/bi';
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

    // Tüm kitap bilgilerini birleştir
    const allBookInfo = [
      normalizeText(book.name),
      normalizeText(book.writer),
      normalizeText(book.publisher),
      normalizeText(book.series),
    ].join(' ');

    // Her bir arama kelimesi kitap bilgilerinin herhangi bir yerinde geçiyor mu kontrol et
    return searchWords.every(word => allBookInfo.includes(word));
  });

  return (
    <div className="space-y-6">
      {/* Sayfa Başlığı */}
      <div className="rounded-lg border-t-4 border-primary-500 bg-white p-4 shadow sm:rounded-lg sm:border-l-4 sm:border-t-0 sm:p-6">
        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900 sm:text-2xl">
          <BiBookOpen className="mr-2 h-6 w-6 text-primary-500 sm:h-7 sm:w-7" />
          Kütüphane
        </h2>
        <p className="text-sm text-gray-600 sm:text-base">
          Tüm kitapların listelendiği bölüm. Kitapları kategorilere göre filtreleyebilir veya arama
          yapabilirsiniz. Beğendiğiniz kitapları favorilere ekleyebilir ve okumaya
          başlayabilirsiniz.
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
        <p className="text-sm text-gray-600">
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
          <p className="text-gray-500">Aramanızla eşleşen kitap bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
