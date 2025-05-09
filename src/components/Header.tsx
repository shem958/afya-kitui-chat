import React, { useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Heart,
  Menu,
  X,
  MessageSquareDots,
  Calendar,
  User,
} from "lucide-react";

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if window is scrolled to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 px-4 py-3 sm:py-4 bg-gradient-to-r from-afya-primary to-afya-secondary text-white flex justify-between items-center transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-white fill-white" />
          <h1 className="text-xl sm:text-2xl font-bold">{t("appName")}</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4">
            <a
              href="#chat"
              className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-full transition-colors"
            >
              <MessageSquareDots className="h-4 w-4" />
              <span>{t("chat")}</span>
            </a>
            <a
              href="#appointments"
              className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-full transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>{t("appointments")}</span>
            </a>
            <a
              href="#profile"
              className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-full transition-colors"
            >
              <User className="h-4 w-4" />
              <span>{t("profile")}</span>
            </a>
          </nav>

          <div className="pl-4 border-l border-white/20">
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile - Language Toggle and Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-afya-primary/95 z-40 flex flex-col transition-transform duration-300 transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-grow gap-6 text-white">
          <a
            href="#chat"
            className="flex items-center gap-3 text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            onClick={toggleMenu}
          >
            <MessageSquareDots className="h-6 w-6" />
            <span>{t("chat")}</span>
          </a>
          <a
            href="#appointments"
            className="flex items-center gap-3 text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            onClick={toggleMenu}
          >
            <Calendar className="h-6 w-6" />
            <span>{t("appointments")}</span>
          </a>
          <a
            href="#profile"
            className="flex items-center gap-3 text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            onClick={toggleMenu}
          >
            <User className="h-6 w-6" />
            <span>{t("profile")}</span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;
