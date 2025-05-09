
import React from 'react';
import { Flag, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="p-3 sm:p-4 bg-afya-neutral text-afya-dark text-xs sm:text-sm">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <a 
          href="#privacy" 
          className="flex items-center gap-1 hover:text-afya-primary transition-colors"
        >
          <Flag className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{t('privacyPolicy')}</span>
        </a>
        
        <a 
          href="#report" 
          className="flex items-center gap-1 hover:text-afya-primary transition-colors"
        >
          <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{t('reportIssue')}</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
