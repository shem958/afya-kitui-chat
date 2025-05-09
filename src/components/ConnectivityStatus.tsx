import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Wifi, WifiOff, AlertCircle } from "lucide-react";

export const ConnectivityStatus: React.FC = () => {
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showFullBanner, setShowFullBanner] = useState<boolean>(
    !navigator.onLine,
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // When coming back online, show the success message briefly
      setIsVisible(true);
      setShowFullBanner(true);
      const timer = setTimeout(() => {
        setShowFullBanner(false);
      }, 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsVisible(true);
      setShowFullBanner(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Hide the online indicator after a few seconds if we're starting online
    if (isOnline) {
      const timer = setTimeout(() => {
        setShowFullBanner(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const toggleBanner = () => {
    setShowFullBanner((prev) => !prev);
  };

  return (
    <>
      {/* Floating indicator that's always visible in offline mode or temporarily in online mode */}
      {!showFullBanner && (
        <div
          className={`fixed bottom-4 left-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 z-50`}
          onClick={toggleBanner}
        >
          <div
            className={`rounded-full p-2 ${
              isOnline
                ? "bg-green-500 text-white"
                : "bg-amber-500 text-white animate-pulse"
            }`}
          >
            {isOnline ? (
              <Wifi className="h-5 w-5" />
            ) : (
              <WifiOff className="h-5 w-5" />
            )}
          </div>
        </div>
      )}

      {/* Full banner message */}
      <div
        className={`fixed bottom-0 left-0 right-0 px-4 py-3 text-sm transition-all duration-500 shadow-lg z-40 ${
          showFullBanner
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        } ${
          isOnline
            ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
            : "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5 animate-pulse" />
            )}
            <span className="font-medium">
              {isOnline ? t("onlineMode") : t("offlineMode")}
            </span>
          </div>

          <button
            onClick={toggleBanner}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close notification"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ConnectivityStatus;
