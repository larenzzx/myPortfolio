import { useState, useEffect } from "react";
import { FileText, Search } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { navItems, themes } from "./navItems";

interface SidebarProps {
  activePath: string;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  onCommandOpen: () => void;
}

export const Sidebar = ({
  activePath,
  currentTheme,
  onThemeChange,
  onCommandOpen,
}: SidebarProps) => {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && /mac/i.test(navigator.userAgent));
  }, []);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 border-r border-gray-200 dark:border-gray-800 bg-bg p-5 lg:flex lg:flex-col select-none">
      <NavLink
        to="/"
        className="mb-6 flex items-center p-2 hover:opacity-85 transition-opacity duration-200"
      >
        <div className="min-w-0">
          <p className="text-lg font-bold text-ink font-serif tracking-tight">
            Mark Tabotabo
          </p>
        </div>
      </NavLink>

      <button
        type="button"
        onClick={onCommandOpen}
        className="mb-4 flex items-center justify-between w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-100 px-3 py-2 text-left text-xs font-mono font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-150"
      >
        <div className="flex items-center gap-2">
          <Search size={14} className="text-gray-400" />
          <span>Search portfolio</span>
        </div>
        <kbd className="rounded border border-gray-200 dark:border-gray-800 bg-bg px-1.5 py-0.5 text-[9px] font-mono">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      <nav className="space-y-1">
        {navItems.map(({ label, path, id, Icon }) => {
          const active =
            activePath === path || (path !== "/" && activePath.startsWith(`${path}/`));
          return (
            <NavLink
              key={id}
              to={path}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                active
                  ? "text-ink font-bold"
                  : "text-gray-500 hover:text-ink"
              }`}
            >
              <Icon size={15} strokeWidth={active ? 2.5 : 2} className={active ? "text-ink" : "text-gray-400"} />
              <div className="flex items-center gap-1">
                {active && <span className="font-mono text-ink text-xs animate-fadeIn">→</span>}
                <span>{label}</span>
              </div>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        {/* Ultra-minimalist inline theme selector (bryllim.com style) */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[10px] font-mono text-gray-400">
            {themes.map((theme, i) => (
              <span key={theme} className="flex items-center">
                {i > 0 && <span className="mr-2 text-gray-200 dark:text-gray-800">/</span>}
                <button
                  type="button"
                  onClick={() => onThemeChange(theme)}
                  className={`hover:text-ink bg-transparent border-0 p-0 outline-none cursor-pointer transition-colors capitalize ${
                    currentTheme === theme
                      ? "text-ink font-bold underline underline-offset-4 decoration-1 decoration-ink/40"
                      : "text-gray-400"
                  }`}
                >
                  {theme === "cyber-night" ? "cyber" : theme}
                </button>
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/resume"
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-ink text-bg font-semibold text-[13px] hover:opacity-90 transition-opacity duration-150"
        >
          <FileText size={14} />
          Resume
        </Link>
      </div>
    </aside>
  );
};
