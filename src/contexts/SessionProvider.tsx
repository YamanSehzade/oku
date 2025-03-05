import React, { createContext, useContext, useEffect } from 'react';
import { logSessionEnd, logSessionStart } from '../utils/analytics';

interface SessionContextType {
  sessionStartTime: number;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sessionStartTime = Date.now();

  useEffect(() => {
    // Oturum başlangıcını kaydet
    logSessionStart();

    // Oturum sonlandırma işlemleri
    const handleSessionEnd = () => {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
      logSessionEnd(sessionDuration);
    };

    // Sayfa kapatıldığında veya sekme değiştirildiğinde
    window.addEventListener('beforeunload', handleSessionEnd);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        handleSessionEnd();
      }
    });

    return () => {
      window.removeEventListener('beforeunload', handleSessionEnd);
      window.removeEventListener('visibilitychange', handleSessionEnd);
      handleSessionEnd();
    };
  }, [sessionStartTime]);

  return <SessionContext.Provider value={{ sessionStartTime }}>{children}</SessionContext.Provider>;
};
