import { logAnalyticsEvent } from '../config/firebase';

export const AnalyticsEvents = {
  // Sayfa görüntüleme olayları
  PAGE_VIEW: 'page_view',

  // Kitap ile ilgili olaylar
  BOOK_VIEW: 'book_view',
  BOOK_READ_START: 'book_read_start',
  BOOK_READ_COMPLETE: 'book_read_complete',
  BOOK_FAVORITE: 'book_favorite',
  BOOK_UNFAVORITE: 'book_unfavorite',
  BOOK_PROGRESS_UPDATE: 'book_progress_update',

  // Kullanıcı etkileşimleri
  SEARCH_PERFORM: 'search_perform',
  FILTER_APPLY: 'filter_apply',
  SHARE_CLICK: 'share_click',

  // Uygulama olayları
  APP_INSTALL: 'app_install',
  APP_UPDATE: 'app_update',
  ERROR_OCCUR: 'error_occur',
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
