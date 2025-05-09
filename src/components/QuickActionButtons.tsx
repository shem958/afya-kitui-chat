import React from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  HelpCircle,
  ChevronRight,
  Phone,
  Clipboard,
  MapIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuickActionButtonsProps {
  onActionClick: (action: string) => void;
}

export const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  onActionClick,
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const actions = [
    {
      id: "clinics",
      icon: <MapPin />,
      label: t("clinicLocations"),
      description: t("findClinicNearYou"),
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "appointment",
      icon: <Calendar />,
      label: t("scheduleAppointment"),
      description: t("bookYourVisit"),
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "faqs",
      icon: <HelpCircle />,
      label: t("faqs"),
      description: t("commonQuestions"),
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-sm">
      <h2 className="text-lg font-bold text-afya-primary mb-3">
        {t("quickActions")}
      </h2>

      {isMobile ? (
        // Mobile layout - Grid of cards
        <div className="grid grid-cols-3 gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r ${action.color} text-white mb-2`}
              >
                {React.cloneElement(action.icon, { className: "h-5 w-5" })}
              </div>
              <span className="text-xs font-medium text-center text-gray-800 line-clamp-2">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      ) : (
        // Desktop layout - List of action items
        <div className="flex flex-col gap-2">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className="flex items-center p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-afya-secondary/30 hover:bg-afya-neutral/5 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r ${action.color} text-white mr-4 shadow-sm`}
              >
                {React.cloneElement(action.icon, { className: "h-6 w-6" })}
              </div>

              <div className="flex-grow text-left">
                <h3 className="font-medium text-gray-900">{action.label}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>

              <div className="text-afya-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <ChevronRight className="h-5 w-5" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Additional quick contact options */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-afya-secondary"
            onClick={() => onActionClick("call")}
          >
            <Phone className="h-4 w-4" />
            <span className="text-xs">{t("callUs")}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-afya-secondary"
            onClick={() => onActionClick("directions")}
          >
            <MapIcon className="h-4 w-4" />
            <span className="text-xs">{t("directions")}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-afya-secondary"
            onClick={() => onActionClick("records")}
          >
            <Clipboard className="h-4 w-4" />
            <span className="text-xs">{t("medicalRecords")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionButtons;
