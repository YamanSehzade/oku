import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
let analytics = null;

try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);

    // Analytics collection'ı sadece production ortamında aktif et
    if (import.meta.env.DEV) {
      // Development ortamında analytics'i devre dışı bırak
      setAnalyticsCollectionEnabled(analytics, false);
      window.localStorage.setItem('debug', '*');
    } else {
      // Production ortamında analytics'i aktif et
      setAnalyticsCollectionEnabled(analytics, true);
    }
  }
} catch (error) {
  console.error('Analytics initialization error:', error);
}

export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (error) {
      console.error('Analytics event logging error:', error);
    }
  }
};

export default analytics;
