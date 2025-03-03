import { PanInfo } from 'framer-motion';
import { useCallback } from 'react';
import { SWIPE_CONF } from './useBookAnimation';

interface UseBookEventsProps {
  currentPage: number;
  imageError: boolean;
  animatePageChange: (direction: 'next' | 'prev') => Promise<void>;
  handlePageChange: (page: number) => Promise<void>;
  controls: any;
  isClickableElement: (target: HTMLElement) => boolean;
}

export const useBookEvents = ({
  currentPage,
  imageError,
  animatePageChange,
  handlePageChange,
  controls,
  isClickableElement,
}: UseBookEventsProps) => {
  const handleInteraction = useCallback(
    (type: 'keyboard' | 'touch' | 'click', e: any) => {
      // Tıklama kontrolü
      if (type === 'click' && isClickableElement(e.target as HTMLElement)) {
        return;
      }

      // Klavye kontrolü
      if (type === 'keyboard') {
        const key = (e as KeyboardEvent).key;
        if (key === 'ArrowRight' && !imageError) {
          handlePageChange(currentPage + 1);
        } else if (key === 'ArrowLeft' && currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
        return;
      }

      // Dokunma kontrolü
      if (type === 'touch') {
        const info = e as PanInfo;
        const { velocity, threshold } = SWIPE_CONF;
        const canGoNext = !imageError;
        const canGoPrev = currentPage > 1;

        if (info.velocity.x < -velocity && canGoNext) {
          animatePageChange('next');
        } else if (info.velocity.x > velocity && canGoPrev) {
          animatePageChange('prev');
        } else if (info.offset.x < -threshold && canGoNext) {
          animatePageChange('next');
        } else if (info.offset.x > threshold && canGoPrev) {
          animatePageChange('prev');
        } else {
          controls.start({ x: 0, transition: { duration: SWIPE_CONF.animationDuration } });
        }
      }
    },
    [currentPage, imageError, handlePageChange, animatePageChange, controls, isClickableElement]
  );

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      handleInteraction('touch', info);
    },
    [handleInteraction]
  );

  const handleEdgeControl = useCallback(
    (direction: 'prev' | 'next', e: React.MouseEvent) => {
      if (isClickableElement(e.target as HTMLElement)) return;

      e.preventDefault();
      e.stopPropagation();

      handlePageChange(direction === 'next' ? currentPage + 1 : currentPage - 1);
    },
    [currentPage, handlePageChange, isClickableElement]
  );

  return {
    handleInteraction,
    handleDragEnd,
    handleEdgeControl,
  };
};
