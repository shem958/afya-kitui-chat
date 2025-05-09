
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuickActionButtonsProps {
  onActionClick: (action: string) => void;
}

export const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({ onActionClick }) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      <Button 
        variant="outline"
        className="flex flex-col items-center justify-center p-2 sm:p-3 h-auto gap-1 sm:gap-2 border-afya-secondary hover:bg-afya-secondary hover:text-white"
        onClick={() => onActionClick('clinics')}
      >
        <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="text-xs sm:text-sm text-center line-clamp-2">{t('clinicLocations')}</span>
      </Button>
      
      <Button 
        variant="outline"
        className="flex flex-col items-center justify-center p-2 sm:p-3 h-auto gap-1 sm:gap-2 border-afya-secondary hover:bg-afya-secondary hover:text-white"
        onClick={() => onActionClick('appointment')}
      >
        <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="text-xs sm:text-sm text-center line-clamp-2">{t('scheduleAppointment')}</span>
      </Button>
      
      <Button 
        variant="outline"
        className="flex flex-col items-center justify-center p-2 sm:p-3 h-auto gap-1 sm:gap-2 border-afya-secondary hover:bg-afya-secondary hover:text-white"
        onClick={() => onActionClick('faqs')}
      >
        <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="text-xs sm:text-sm text-center line-clamp-2">{t('faqs')}</span>
      </Button>
    </div>
  );
};

export default QuickActionButtons;
