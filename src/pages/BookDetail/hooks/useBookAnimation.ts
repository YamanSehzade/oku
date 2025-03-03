import { useAnimation } from 'framer-motion';
import { useCallback } from 'react';

interface UseBookAnimationProps {
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  setImageError: (error: boolean) => void;
  scrollToTop: () => void;
}

export const SWIPE_CONF = {
  threshold: 50,
  velocity: 300,
  dragElastic: 0.3,
  animationDuration: 0.2,
  transition: {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.2,
    stiffness: 300,
    damping: 30,
  },
} as const;

export const useBookAnimation = ({
  setCurrentPage,
  setImageError,
  scrollToTop,
}: UseBookAnimationProps) => {
  const controls = useAnimation();

  const animatePageChange = useCallback(
    async (direction: 'next' | 'prev') => {
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
    [controls, setCurrentPage, setImageError, scrollToTop]
  );

  return {
    controls,
    animatePageChange,
  };
};
