
import React from 'react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <header className="px-3 py-3 sm:px-4 sm:py-4 bg-afya-primary text-white flex justify-between items-center shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold">{t('appName')}</h1>
      <LanguageToggle />
    </header>
  );
};

export default Header;
