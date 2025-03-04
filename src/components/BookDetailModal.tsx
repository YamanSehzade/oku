import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import BookDetailPage from '../pages/BookDetail/BookDetailPage';

export const BookDetailModal = () => {
  const { selectedBook, setSelectedBook } = useApp();

  const handleClose = () => {
    setSelectedBook(null);
  };

  return (
    <AnimatePresence>
      {selectedBook && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
            onClick={handleClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-0 z-[101] bg-white"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-full w-full overflow-hidden">
              <BookDetailPage />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
