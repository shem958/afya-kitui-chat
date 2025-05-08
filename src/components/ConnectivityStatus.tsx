
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, WifiOff } from 'lucide-react';

export const ConnectivityStatus: React.FC = () => {
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 px-4 py-2 text-sm flex items-center justify-center gap-2 transition-opacity duration-300 ${
        isOnline 
          ? 'bg-green-100 text-green-800' 
          : 'bg-amber-100 text-amber-800 animate-pulse-slow'
      }`}
    >
      {isOnline 
        ? <><Wifi className="h-4 w-4" /> {t('onlineMode')}</>
        : <><WifiOff className="h-4 w-4" /> {t('offlineMode')}</>
      }
    </div>
  );
};

export default ConnectivityStatus;
