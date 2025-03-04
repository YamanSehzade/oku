import { PanInfo } from 'framer-motion';
import { useCallback } from 'react';
import { SWIPE_CONF } from './useBookAnimation';

interface UseBookEventsProps {
  currentPage: number;
  imageError: boolean;
  handlePageChange: (page: number) => Promise<void>;
  controls: any;
  isClickableElement: (target: HTMLElement) => boolean;
}

export const useBookEvents = ({
  currentPage,
  imageError,
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
          handlePageChange(currentPage + 1);
        } else if (info.velocity.x > velocity && canGoPrev) {
          handlePageChange(currentPage - 1);
        } else if (info.offset.x < -threshold && canGoNext) {
          handlePageChange(currentPage + 1);
        } else if (info.offset.x > threshold && canGoPrev) {
          handlePageChange(currentPage - 1);
        } else {
          controls.start({ x: 0, transition: { duration: SWIPE_CONF.animationDuration } });
        }
      }
    },
    [currentPage, imageError, handlePageChange, controls, isClickableElement]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const xMovement = Math.abs(info.offset.x);
      const yMovement = Math.abs(info.offset.y);
      const dragAngle = Math.atan2(yMovement, xMovement) * (180 / Math.PI);
      const velocity = Math.abs(info.velocity.x);

      // 45 dereceden daha dik bir açıysa dikey scroll olarak kabul et
      if (dragAngle > 45) {
        controls.start({ x: 0, transition: { duration: SWIPE_CONF.animationDuration } });
        return;
      }

      const threshold = window.innerWidth * 0.15;
      const canGoNext = !imageError;
      const canGoPrev = currentPage > 1;

      // Hız veya mesafe yeterliyse sayfa değiştir
      if (xMovement > threshold || velocity > SWIPE_CONF.velocity) {
        if (info.offset.x > 0 && canGoPrev) {
          handlePageChange(currentPage - 1);
        } else if (info.offset.x < 0 && canGoNext) {
          handlePageChange(currentPage + 1);
        } else {
          controls.start({ x: 0, transition: { duration: SWIPE_CONF.animationDuration } });
        }
      } else {
        controls.start({ x: 0, transition: { duration: SWIPE_CONF.animationDuration } });
      }
    },
    [currentPage, imageError, handlePageChange, controls]
  );

  const handleEdgeControl = useCallback(
    (direction: 'prev' | 'next', e: React.MouseEvent) => {
      if (isClickableElement(e.target as HTMLElement)) return;

      e.preventDefault();
      e.stopPropagation();

      if (direction === 'next' && !imageError) {
        handlePageChange(currentPage + 1);
      } else if (direction === 'prev' && currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    },
    [currentPage, imageError, handlePageChange, isClickableElement]
  );

  return {
    handleInteraction,
    handleDragEnd,
    handleEdgeControl,
  };
};
