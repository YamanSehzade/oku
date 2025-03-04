import { logAnalyticsEvent } from '../config/firebase';

export const AnalyticsEvents = {
  // Sayfa görüntüleme olayları
  PAGE_VIEW: 'page_view',
  PAGE_TRANSITION: 'page_transition',

  // Kitap ile ilgili olaylar
  BOOK_VIEW: 'book_view',
  BOOK_READ_START: 'book_read_start',
  BOOK_READ_COMPLETE: 'book_read_complete',
  BOOK_FAVORITE: 'book_favorite',
  BOOK_UNFAVORITE: 'book_unfavorite',
  BOOK_PROGRESS_UPDATE: 'book_progress_update',
  READING_SPEED: 'reading_speed',
  READING_STATS: 'reading_stats',
  PUBLISHER_STATS: 'publisher_stats',

  // Kullanıcı etkileşimleri
  SEARCH_PERFORM: 'search_perform',
  FILTER_APPLY: 'filter_apply',
  SHARE_CLICK: 'share_click',
  USER_INTERACTION: 'user_interaction',

  // Uygulama olayları
  APP_INSTALL: 'app_install',
  APP_UPDATE: 'app_update',
  ERROR_OCCUR: 'error_occur',
  SESSION_START: 'session_start',
  SESSION_END: 'session_end',
} as const;

type EventParams = {
  [key: string]: string | number | boolean;
};

// Sayfa görüntüleme olayı
export const logPageView = (pageName: string, additionalParams?: EventParams) => {
  logAnalyticsEvent(AnalyticsEvents.PAGE_VIEW, {
    page_name: pageName,
    page_url: window?.location?.href,
    ...additionalParams,
  });
};

// Kitap görüntüleme olayı
export const logBookView = (bookId: string, bookTitle: string, additionalParams?: EventParams) => {
  logAnalyticsEvent(AnalyticsEvents.BOOK_VIEW, {
    book_id: bookId,
    book_title: bookTitle,
    timestamp: new Date().toISOString(),
    ...additionalParams,
  });
};

// Kitap okuma başlatma olayı
export const logBookReadStart = (bookId: string, bookTitle: string) => {
  logAnalyticsEvent(AnalyticsEvents.BOOK_READ_START, {
    book_id: bookId,
    book_title: bookTitle,
    timestamp: new Date().toISOString(),
  });
};

// Kitap okuma tamamlama olayı
export const logBookReadComplete = (bookId: string, bookTitle: string, readingDuration: number) => {
  logAnalyticsEvent(AnalyticsEvents.BOOK_READ_COMPLETE, {
    book_id: bookId,
    book_title: bookTitle,
    reading_duration_seconds: readingDuration,
    timestamp: new Date().toISOString(),
  });
};

// Kitap favori olayları
export const logBookFavorite = (bookId: string, bookTitle: string, isFavorite: boolean) => {
  logAnalyticsEvent(isFavorite ? AnalyticsEvents.BOOK_FAVORITE : AnalyticsEvents.BOOK_UNFAVORITE, {
    book_id: bookId,
    book_title: bookTitle,
  });
};

// Kitap ilerleme güncelleme olayı
export const logBookProgress = (
  bookId: string,
  bookTitle: string,
  currentPage: number,
  totalPages: number
) => {
  logAnalyticsEvent(AnalyticsEvents.BOOK_PROGRESS_UPDATE, {
    book_id: bookId,
    book_title: bookTitle,
    current_page: currentPage,
    total_pages: totalPages,
    progress_percentage: Math.round((currentPage / totalPages) * 100),
  });
};

// Arama olayı
export const logSearch = (searchTerm: string, resultCount: number) => {
  logAnalyticsEvent(AnalyticsEvents.SEARCH_PERFORM, {
    search_term: searchTerm,
    result_count: resultCount,
  });
};

// Filtre uygulama olayı
export const logFilterApply = (filterType: string, filterValue: string) => {
  logAnalyticsEvent(AnalyticsEvents.FILTER_APPLY, {
    filter_type: filterType,
    filter_value: filterValue,
  });
};

// Hata olayı
export const logError = (
  errorCode: string,
  errorMessage: string,
  additionalParams?: EventParams
) => {
  logAnalyticsEvent(AnalyticsEvents.ERROR_OCCUR, {
    error_code: errorCode,
    error_message: errorMessage,
    ...additionalParams,
  });
};

// Publisher istatistikleri olayı
export const logPublisherStats = (
  publisher: string,
  bookCount: number,
  totalReadTime: number,
  averageReadTime: number
) => {
  logAnalyticsEvent(AnalyticsEvents.PUBLISHER_STATS, {
    publisher_name: publisher,
    book_count: bookCount,
    total_read_time_seconds: totalReadTime,
    average_read_time_seconds: averageReadTime,
    timestamp: new Date().toISOString(),
  });
};

// Sayfa geçiş olayı
export const logPageTransition = (fromPage: string, toPage: string, duration: number) => {
  logAnalyticsEvent(AnalyticsEvents.PAGE_TRANSITION, {
    from_page: fromPage,
    to_page: toPage,
    transition_duration_ms: duration,
    timestamp: new Date().toISOString(),
  });
};

// Okuma istatistikleri olayı
export const logReadingStats = (
  bookId: string,
  totalPages: number,
  completedPages: number,
  averageTimePerPage: number
) => {
  logAnalyticsEvent(AnalyticsEvents.READING_STATS, {
    book_id: bookId,
    total_pages: totalPages,
    completed_pages: completedPages,
    average_time_per_page_ms: averageTimePerPage,
    timestamp: new Date().toISOString(),
  });
};

// Okuma hızı olayı
export const logReadingSpeed = (bookId: string, pagesPerMinute: number) => {
  logAnalyticsEvent(AnalyticsEvents.READING_SPEED, {
    book_id: bookId,
    pages_per_minute: pagesPerMinute,
    timestamp: new Date().toISOString(),
  });
};

// Kullanıcı etkileşim olayı
export const logUserInteraction = (
  interactionType: string,
  targetElement: string,
  additionalParams?: EventParams
) => {
  logAnalyticsEvent(AnalyticsEvents.USER_INTERACTION, {
    interaction_type: interactionType,
    target_element: targetElement,
    timestamp: new Date().toISOString(),
    ...additionalParams,
  });
};

// Oturum başlangıç olayı
export const logSessionStart = () => {
  logAnalyticsEvent(AnalyticsEvents.SESSION_START, {
    timestamp: new Date().toISOString(),
    session_id: Math.random().toString(36).substring(7),
  });
};

// Oturum bitiş olayı
export const logSessionEnd = (sessionDuration: number) => {
  logAnalyticsEvent(AnalyticsEvents.SESSION_END, {
    session_duration_seconds: sessionDuration,
    timestamp: new Date().toISOString(),
  });
};
