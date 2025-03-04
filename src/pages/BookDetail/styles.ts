export const styles = {
  container: 'fixed inset-0 bg-black',

  // Ana içerik stilleri
  content: {
    wrapper: 'h-full w-full',
    container: 'h-full w-full overflow-y-auto overscroll-none -webkit-overflow-scrolling-touch',
    imageContainer: 'w-full',
  },

  // Kontrol stilleri
  controls: {
    base: 'fixed inset-x-0 z-50 transition-opacity duration-300',
    visible: 'pointer-events-auto opacity-100',
    hidden: 'pointer-events-none opacity-0',
    button:
      'rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-black/10 dark:hover:bg-black/20',
  },

  // Hata sayfası stilleri
  error: {
    container: 'flex h-screen items-center justify-center',
    content: 'text-center',
    title: 'mb-4 text-2xl font-bold text-gray-900 dark:text-white',
    button:
      'rounded-lg bg-secondary-600 px-6 py-2 text-white transition-colors hover:bg-secondary-700',
  },

  // Görsel stilleri
  image: {
    base: 'w-full',
    responsive: 'object-contain',
  },

  // Motion div stilleri
  motion: {
    base: {
      touchAction: 'pan-y',
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      perspective: 1000,
      WebkitPerspective: 1000,
      WebkitOverflowScrolling: 'touch',
    },
  },
} as const;
