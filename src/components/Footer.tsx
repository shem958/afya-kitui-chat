import React from "react";
import { Flag, AlertTriangle, Shield, Heart, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-afya-primary/90 to-afya-secondary/90 text-white py-4">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left - Logo & brief text */}
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-white fill-white" />
            <span className="font-bold text-sm md:text-base">Afya Health</span>
            <span className="text-xs text-white/70">| {t("helpingKitui")}</span>
          </div>

          {/* Right - Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#about"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
            >
              <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                <Info className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm">{t("aboutUs")}</span>
            </a>

            <a
              href="#privacy"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
            >
              <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                <Shield className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm">{t("privacyPolicy")}</span>
            </a>

            <a
              href="#report"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
            >
              <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                <AlertTriangle className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm">{t("reportIssue")}</span>
            </a>
          </div>
        </div>

        {/* Copyright line */}
        <div className="mt-4 pt-4 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center text-xs text-white/70">
          <div>
            © {currentYear} Afya Health. {t("allRightsReserved")}
          </div>
          <div className="mt-2 sm:mt-0">
            <button
              className="mx-2 hover:text-white transition-colors"
              onClick={() => {
                /* Language toggle function would go here */
              }}
            >
              {language === "en" ? "Kiswahili" : "English"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
