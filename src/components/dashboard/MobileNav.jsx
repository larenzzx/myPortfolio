import { Menu, Palette, X, Search, FileText } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { navItems, themes } from "./navItems";
import logo from "../../assets/logoLarenz.png";

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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-base-content/10 bg-base-100/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
            <img
              src={logo}
              alt="Mark Larenz brand logo"
              className="h-9 w-9 rounded-xl object-cover ring-1 ring-primary/30"
            />
            <span className="text-sm font-bold text-base-content">
              Mark Larenz
            </span>
          </NavLink>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCommandOpen}
              className="btn btn-ghost btn-sm min-h-10 w-10 p-0 rounded-xl border border-base-content/10"
              aria-label="Open search menu"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              onClick={onToggle}
              className="btn btn-ghost btn-sm min-h-10 rounded-xl border border-base-content/10"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-base-content/35 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed bottom-0 right-0 top-0 z-50 w-[min(22rem,88vw)] border-l border-base-content/10 bg-base-100 p-4 shadow-2xl transition-transform duration-300 ease-spring lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-base-content">
              Mark Larenz
            </p>
            <p className="text-xs text-base-content/55">Navigation</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm min-h-9 rounded-xl"
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
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-content"
                    : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
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
            className="btn btn-primary btn-sm w-full rounded-xl flex items-center justify-center gap-2"
          >
            <FileText size={15} />
            Resume
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-base-content/10 bg-base-200/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
            Theme
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => onThemeChange(theme)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs capitalize ${
                  currentTheme === theme
                    ? "border-primary bg-primary text-primary-content"
                    : "border-base-content/10 bg-base-100 text-base-content/70"
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
