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
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-gray-200/50 dark:border-gray-800/40 bg-bg p-5 lg:flex lg:flex-col select-none">
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
        className="mb-4 flex items-center justify-between w-full rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-gray-50/40 px-3 py-2 text-left text-xs font-mono font-medium text-gray-500 hover:bg-gray-100/60 transition-colors duration-150"
      >
        <div className="flex items-center gap-2">
          <Search size={14} className="text-gray-400" />
          <span>Search portfolio</span>
        </div>
        <kbd className="rounded border border-gray-200/80 dark:border-gray-800/80 bg-bg px-1.5 py-0.5 text-[9px] font-mono">
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
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 border border-transparent ${
                active
                  ? "bg-gray-100/70 border-gray-200/40 dark:border-gray-800/30 text-ink font-semibold"
                  : "text-gray-500 hover:bg-gray-100/50 hover:text-ink"
              }`}
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        {/* Ultra-minimalist inline theme selector (bryllim.com style) */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/40 pt-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[10px] font-mono text-gray-400">
            {themes.map((theme, i) => (
              <span key={theme} className="flex items-center">
                {i > 0 && <span className="mr-2 text-gray-200/60 dark:text-gray-800/40">/</span>}
                <button
                  type="button"
                  onClick={() => onThemeChange(theme)}
                  className={`hover:text-ink bg-transparent border-0 p-0 outline-none cursor-pointer transition-colors capitalize ${
                    currentTheme === theme
                      ? "text-ink font-bold underline underline-offset-4 decoration-1.5 decoration-build/50"
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
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-ink text-bg font-semibold text-sm hover:opacity-90 transition-opacity duration-150 border border-gray-200/10"
        >
          <FileText size={15} />
          Resume
        </Link>
      </div>
    </aside>
  );
};
