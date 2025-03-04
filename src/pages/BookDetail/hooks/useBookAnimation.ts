import { useAnimation } from 'framer-motion';
import { useCallback } from 'react';

interface UseBookAnimationProps {
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  setImageError: (error: boolean) => void;
  scrollToTop: () => void;
  currentPage: number;
}

export const SWIPE_CONF = {
  transition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  velocity: 0.5,
  threshold: 100,
  animationDuration: 0.3,
};

export const useBookAnimation = ({
  setCurrentPage,
  setImageError,
  scrollToTop,
  currentPage,
}: UseBookAnimationProps) => {
  const controls = useAnimation();

  const animatePageChange = useCallback(
    async (direction: 'next' | 'prev' | 'direct', targetPage?: number) => {
      if (direction === 'direct' && targetPage !== undefined) {
        // Direkt sayfa değişimi için animasyon
        const pageDiff = targetPage - currentPage;
        const xOffset = pageDiff > 0 ? -window.innerWidth : window.innerWidth;

        await controls.start({
          x: xOffset,
          transition: SWIPE_CONF.transition,
        });

        setCurrentPage(targetPage);
        setImageError(false);
        scrollToTop();

        await controls.set({ x: -xOffset });
        await controls.start({
          x: 0,
          transition: SWIPE_CONF.transition,
        });
        return;
      }

      // Normal sayfa geçişi için animasyon
      const xOffset = direction === 'next' ? -window.innerWidth : window.innerWidth;
      await controls.start({
        x: xOffset,
        transition: SWIPE_CONF.transition,
      });
      setCurrentPage(prev => (direction === 'next' ? prev + 1 : prev - 1));
      setImageError(false);
      scrollToTop();
      await controls.set({ x: -xOffset });
      await controls.start({
        x: 0,
        transition: SWIPE_CONF.transition,
      });
    },
    [controls, setCurrentPage, setImageError, scrollToTop, currentPage]
  );

  return {
    controls,
    animatePageChange,
  };
};
