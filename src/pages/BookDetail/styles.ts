export const styles = {
  container: 'fixed inset-0 bg-black',

  // Ana içerik stilleri
  content: {
    wrapper: 'flex h-full w-full items-center justify-center overflow-hidden',
    container: 'absolute inset-0 flex items-start justify-center overflow-y-auto scroll-smooth',
    imageContainer: 'min-h-full w-full',
  },

  // Kontrol stilleri
  controls: {
    base: 'fixed inset-x-0 z-50 transition-opacity duration-300',
    visible: 'pointer-events-auto opacity-100',
    hidden: 'pointer-events-none opacity-0',
    button:
      'rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30',
  },

  // Hata sayfası stilleri
  error: {
    container: 'flex h-screen items-center justify-center',
    content: 'text-center',
    title: 'mb-4 text-2xl font-bold text-gray-900',
    button:
      'rounded-lg bg-secondary-600 px-6 py-2 text-white transition-colors hover:bg-secondary-700',
  },

  // Görsel stilleri
  image: {
    base: 'min-h-full w-full select-none',
    responsive: 'object-contain landscape:object-cover',
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
    },
  },
} as const;
