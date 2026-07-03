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
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    const applyTheme = (theme) => {
      let resolvedTheme = theme;
      if (theme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        resolvedTheme = isDark ? "dark" : "light";
      }
      document.documentElement.setAttribute("data-theme", resolvedTheme);
      document.documentElement.classList.toggle(
        "dark",
        resolvedTheme === "dark" || resolvedTheme === "cyber-night"
      );
    };

    applyTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);

    if (currentTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => {
        const resolvedTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", resolvedTheme);
        document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
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
    if (!document.startViewTransition) {
      setCurrentTheme(theme);
      setIsMobileOpen(false);
      return;
    }

    document.startViewTransition(() => {
      setCurrentTheme(theme);
      setIsMobileOpen(false);
    });
  };

  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-bg text-ink">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-ink relative overflow-x-hidden font-sans">
      {/* Page-wide halftone backdrop */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 select-none">
        <div className="halftone halftone-wide mask-tr absolute right-0 top-0 h-[70vh] w-[65vw]"></div>
        <div className="halftone mask-bl absolute bottom-0 left-0 h-[60vh] w-[55vw]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
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

        <main className="min-h-screen flex-1 pt-16 lg:ml-56 lg:pt-0">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
            {children}
            <Footer />
          </div>
        </main>
      </div>
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
