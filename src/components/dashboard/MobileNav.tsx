import { Menu, Palette, X, Search, FileText } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { navItems, themes } from "./navItems";


export const MobileNav = ({
  activePath,
  currentTheme,
  isOpen,
  onClose,
  onToggle,
  onThemeChange,
  onCommandOpen,
}) => {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-bg/90 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" onClick={onClose} className="flex items-center">
            <span className="text-sm font-bold text-ink font-serif tracking-tight">
              Mark Tabotabo
            </span>
          </NavLink>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCommandOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-bg text-ink hover:bg-gray-100 transition-colors duration-150"
              aria-label="Open search menu"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              onClick={onToggle}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-bg text-ink hover:bg-gray-100 transition-colors duration-150"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-gray-950/20 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 w-[min(20rem,88vw)] border-l border-gray-200 dark:border-gray-800 bg-bg p-5 shadow-2xl transition-transform duration-300 ease-spring lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-ink font-serif tracking-tight">
              Mark Tabotabo
            </p>
            <p className="text-xs text-gray-400 font-mono">Navigation</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-ink transition-colors"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ label, path, id, Icon }) => {
            const active =
              activePath === path ||
              (path !== "/" && activePath.startsWith(`${path}/`));
            return (
              <NavLink
                key={id}
                to={path}
                onClick={onClose}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                  active
                    ? "text-ink font-bold"
                    : "text-gray-500 hover:text-ink"
                }`}
              >
                <Icon size={15} className={active ? "text-ink" : "text-gray-400"} />
                <div className="flex items-center gap-1">
                  {active && <span className="font-mono text-ink text-xs">→</span>}
                  <span>{label}</span>
                </div>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-4">
          <Link
            to="/resume"
            onClick={onClose}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-ink text-bg font-semibold text-[13px] hover:opacity-90 transition-opacity duration-150"
          >
            <FileText size={14} />
            Resume
          </Link>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
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
      </aside>
    </>
  );
};
