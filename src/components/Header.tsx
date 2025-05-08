
import React from 'react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <header className="p-4 bg-afya-primary text-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">{t('appName')}</h1>
      <LanguageToggle />
    </header>
  );
};

export default Header;
