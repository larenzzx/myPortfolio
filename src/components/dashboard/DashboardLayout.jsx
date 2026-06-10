import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Chatbot } from "../chatbot/Chatbot";
import { Footer } from "../Footer";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { CommandMenu } from "./CommandMenu";

export const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    () => localStorage.getItem("theme") || "system",
  );

  useEffect(() => {
    const applyTheme = (theme) => {
      let resolvedTheme = theme;
      if (theme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        resolvedTheme = isDark ? "night" : "corporate";
      }
      document.documentElement.setAttribute("data-theme", resolvedTheme);
    };

    applyTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);

    if (currentTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => {
        const resolvedTheme = e.matches ? "night" : "corporate";
        document.documentElement.setAttribute("data-theme", resolvedTheme);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [currentTheme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Command Menu keyboard trigger
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

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
        onCommandOpen={() => setIsCommandOpen(true)}
      />
      <MobileNav
        activePath={location.pathname}
        currentTheme={currentTheme}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onToggle={() => setIsMobileOpen((open) => !open)}
        onThemeChange={changeTheme}
        onCommandOpen={() => setIsCommandOpen(true)}
      />

      <main className="min-h-screen pt-16 lg:ml-72 lg:pt-0">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          {children}
          <Footer />
        </div>
      </main>
      <Chatbot />
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={changeTheme}
      />
    </div>
  );
};
