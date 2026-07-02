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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/40 bg-bg/90 px-4 py-3 backdrop-blur-md lg:hidden">
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
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-bg text-ink hover:bg-gray-100/70 transition-colors duration-150"
              aria-label="Open search menu"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              onClick={onToggle}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-bg text-ink hover:bg-gray-100/70 transition-colors duration-150"
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
        className={`fixed bottom-0 right-0 top-0 z-50 w-[min(22rem,88vw)] border-l border-gray-200/50 dark:border-gray-800/50 bg-bg p-5 shadow-2xl transition-transform duration-300 ease-spring lg:hidden ${
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
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100/70 text-gray-500 hover:text-ink transition-colors"
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
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors border border-transparent ${
                  active
                    ? "bg-gray-100/70 border-gray-200/40 dark:border-gray-800/30 text-ink font-semibold"
                    : "text-gray-500 hover:bg-gray-100/50 hover:text-ink"
                }`}
              >
                <Icon size={17} />
                {label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-4">
          <Link
            to="/resume"
            onClick={onClose}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-ink text-bg font-semibold text-sm hover:opacity-90 transition-opacity duration-150 border border-gray-200/10"
          >
            <FileText size={15} />
            Resume
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/50 bg-gray-50/50 p-4">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
            Theme
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => onThemeChange(theme)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-mono capitalize transition-all duration-150 ${
                  currentTheme === theme
                    ? "border-ink bg-ink text-bg font-semibold"
                    : "border-gray-200 dark:border-gray-800 bg-bg text-gray-500 hover:text-ink hover:border-gray-400"
                }`}
              >
                <Palette size={14} />
                {theme}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
