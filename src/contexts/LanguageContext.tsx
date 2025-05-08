
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'sw';

export type Translations = {
  [key: string]: {
    en: string;
    sw: string;
  };
};

// Common translations across the application
export const appTranslations: Translations = {
  appName: {
    en: 'Afya Kitui Chat',
    sw: 'Mazungumzo ya Afya Kitui'
  },
  welcomeMessage: {
    en: 'Welcome to Afya Kitui! How can I help you today?',
    sw: 'Karibu Afya Kitui! Nawezaje kukusaidia leo?'
  },
  languageToggle: {
    en: 'Kiswahili',
    sw: 'English'
  },
  inputPlaceholder: {
    en: 'Type your message here...',
    sw: 'Andika ujumbe wako hapa...'
  },
  sendButton: {
    en: 'Send',
    sw: 'Tuma'
  },
  voiceButton: {
    en: 'Speak',
    sw: 'Zungumza'
  },
  listening: {
    en: 'Listening...',
    sw: 'Inasikiliza...'
  },
  clinicLocations: {
    en: 'Clinic Locations',
    sw: 'Maeneo ya Kliniki'
  },
  scheduleAppointment: {
    en: 'Schedule Appointment',
    sw: 'Panga Miadi'
  },
  faqs: {
    en: 'FAQs',
    sw: 'Maswali ya Mara kwa Mara'
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    sw: 'Sera ya Faragha'
  },
  reportIssue: {
    en: 'Report Issue',
    sw: 'Ripoti Tatizo'
  },
  offlineMode: {
    en: 'You are offline. Some features may be limited.',
    sw: 'Uko nje ya mtandao. Baadhi ya vipengele vinaweza kuwa na vikwazo.'
  },
  onlineMode: {
    en: 'You are online.',
    sw: 'Uko mtandaoni.'
  },
  loading: {
    en: 'Loading...',
    sw: 'Inapakia...'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    if (appTranslations[key] && appTranslations[key][language]) {
      return appTranslations[key][language];
    }
    console.warn(`Translation missing for key: ${key} in language: ${language}`);
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
