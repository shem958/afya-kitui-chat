
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuickActionButtonsProps {
  onActionClick: (action: string) => void;
}

export const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({ onActionClick }) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <Button 
        variant="outline"
        className="flex flex-col items-center justify-center p-3 h-auto gap-2 border-afya-secondary hover:bg-afya-secondary hover:text-white"
        onClick={() => onActionClick('clinics')}
      >
        <MapPin className="h-6 w-6" />
        <span className="text-sm text-center">{t('clinicLocations')}</span>
      </Button>
      
      <Button 
        variant="outline"
        className="flex flex-col items-center justify-center p-3 h-auto gap-2 border-afya-secondary hover:bg-afya-secondary hover:text-white"
        onClick={() => onActionClick('appointment')}
      >
        <Calendar className="h-6 w-6" />
        <span className="text-sm text-center">{t('scheduleAppointment')}</span>
      </Button>
      
      <Button 
        variant="outline"
        className="flex flex-col items-center justify-center p-3 h-auto gap-2 border-afya-secondary hover:bg-afya-secondary hover:text-white"
        onClick={() => onActionClick('faqs')}
      >
        <HelpCircle className="h-6 w-6" />
        <span className="text-sm text-center">{t('faqs')}</span>
      </Button>
    </div>
  );
};

export default QuickActionButtons;
