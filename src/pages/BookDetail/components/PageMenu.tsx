import { useEffect, useState } from 'react';

interface PageMenuProps {
  book: {
    pageCount: number;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
  onClose: () => void;
}

export const PageMenu = ({ book, currentPage, onPageChange, onClose }: PageMenuProps) => {
  const [pagesPerGroup, setPagesPerGroup] = useState(8);
  const [currentGroup, setCurrentGroup] = useState(Math.ceil(currentPage / 8));
  const totalGroups = Math.ceil(book.pageCount / pagesPerGroup);

  useEffect(() => {
    setCurrentGroup(Math.ceil(currentPage / pagesPerGroup));
  }, [currentPage, pagesPerGroup]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // sm breakpoint
        setPagesPerGroup(8);
      } else if (width < 768) {
        // md breakpoint
        setPagesPerGroup(12);
      } else {
        setPagesPerGroup(16);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPageNumbers = () => {
    const start = (currentGroup - 1) * pagesPerGroup + 1;
    const end = Math.min(start + pagesPerGroup - 1, book.pageCount);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleGroupChange = (newGroup: number) => {
    setCurrentGroup(newGroup);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    onClose();
  };

  return (
    <div className="fixed inset-x-0 bottom-20 z-50 mx-2 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur-sm dark:bg-gray-900/95 sm:absolute sm:bottom-full sm:left-1/2 sm:mx-0 sm:w-64 sm:-translate-x-1/2">
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`touch-manipulation rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-primary-100 text-primary-600 dark:bg-yellow-500/20 dark:text-yellow-500'
                : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      {totalGroups > 1 && (
        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            onClick={() => handleGroupChange(currentGroup - 1)}
            disabled={currentGroup === 1}
            className="flex-1 touch-manipulation rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Önceki
          </button>
          <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {currentGroup} / {totalGroups}
          </span>
          <button
            onClick={() => handleGroupChange(currentGroup + 1)}
            disabled={currentGroup === totalGroups}
            className="flex-1 touch-manipulation rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};
