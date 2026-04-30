import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "../Footer";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    () => localStorage.getItem("theme") || "night",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    setIsMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Sidebar
        activePath={location.pathname}
        currentTheme={currentTheme}
        onThemeChange={changeTheme}
      />
      <MobileNav
        activePath={location.pathname}
        currentTheme={currentTheme}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onToggle={() => setIsMobileOpen((open) => !open)}
        onThemeChange={changeTheme}
      />

      <main className="min-h-screen pt-16 lg:ml-72 lg:pt-0">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
};
