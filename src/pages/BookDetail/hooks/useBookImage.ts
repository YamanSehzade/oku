import { useEffect, useMemo, useRef } from 'react';
import { Book } from '../../../types/book';

interface UseBookImageProps {
  book: Book | undefined;
  currentPage: number;
  imageError: boolean;
}

export const useBookImage = ({ book, currentPage, imageError }: UseBookImageProps) => {
  // Görsel önbelleğe alma için ref
  const imageCache = useRef<Set<string>>(new Set());

  // Görsel URL'lerini oluştur ve önbelleğe al
  const { currentImageUrl, nextImageUrl, prevImageUrl } = useMemo(() => {
    if (!book) return { currentImageUrl: '', nextImageUrl: '', prevImageUrl: '' };

    const current = `${book.link}/${currentPage}.jpg`;
    const next = `${book.link}/${currentPage + 1}.jpg`;
    const prev = currentPage > 1 ? `${book.link}/${currentPage - 1}.jpg` : '';

    return { currentImageUrl: current, nextImageUrl: next, prevImageUrl: prev };
  }, [book, currentPage]);

  // Görselleri önceden yükle
  useEffect(() => {
    if (!book || imageError) return;

    const preloadImage = (url: string) => {
      if (!url || imageCache.current.has(url)) return;

      const img = new Image();
      img.src = url;
      imageCache.current.add(url);
    };

    preloadImage(nextImageUrl);
    preloadImage(prevImageUrl);
  }, [book, currentPage, nextImageUrl, prevImageUrl, imageError]);

  return {
    imageCache,
    currentImageUrl,
    nextImageUrl,
    prevImageUrl,
  };
};
