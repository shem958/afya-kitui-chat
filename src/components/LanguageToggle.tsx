
import React from 'react';
import { Button } from '@/components/ui/button';
import { Language } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <Button 
      variant="outline" 
      className="rounded-full flex items-center gap-2 bg-afya-neutral border-afya-secondary hover:bg-afya-neutral/80 hover:text-afya-secondary transition-colors" 
      onClick={toggleLanguage}
    >
      <Language className="h-4 w-4" />
      <span>{t('languageToggle')}</span>
    </Button>
  );
};

export default LanguageToggle;
