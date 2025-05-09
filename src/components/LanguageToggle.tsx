import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang: "en" | "sw") => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Language information
  const languages = {
    en: { name: "English", localName: "English" },
    sw: { name: "Swahili", localName: "Kiswahili" },
  };

  return (
    <div className="relative">
      {/* Main Button - Simpler version for mobile */}
      {isMobile ? (
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full flex items-center justify-center p-2 text-white hover:bg-white/10 transition-colors"
          onClick={toggleDropdown}
          aria-label={t("changeLanguage")}
        >
          <Languages className="h-5 w-5" />
        </Button>
      ) : (
        // Expanded version for desktop
        <Button
          variant="ghost"
          className="rounded-full flex items-center gap-2 text-white hover:bg-white/10 border border-white/20 transition-colors px-3 py-1 h-auto"
          onClick={toggleDropdown}
        >
          <Languages className="h-4 w-4" />
          <span className="font-medium">{languages[language].name}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      )}

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-lg z-50 border border-gray-100 animate-in fade-in slide-in-from-top-5 duration-200">
          <button
            className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-afya-neutral/10 transition-colors ${language === "en" ? "text-afya-primary font-medium" : "text-gray-700"}`}
            onClick={() => selectLanguage("en")}
          >
            <span
              className={`w-2 h-2 rounded-full ${language === "en" ? "bg-afya-primary" : "bg-transparent"}`}
            ></span>
            <span>English</span>
          </button>
          <button
            className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-afya-neutral/10 transition-colors ${language === "sw" ? "text-afya-primary font-medium" : "text-gray-700"}`}
            onClick={() => selectLanguage("sw")}
          >
            <span
              className={`w-2 h-2 rounded-full ${language === "sw" ? "bg-afya-primary" : "bg-transparent"}`}
            ></span>
            <span>Kiswahili</span>
          </button>
        </div>
      )}

      {/* Background overlay to detect clicks outside the dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default LanguageToggle;
