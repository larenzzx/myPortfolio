import { ChevronDown, FileText, Palette } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems, themes } from "./navItems";
import logo from "../../assets/logoLarenz.png";

export const Sidebar = ({ activePath, currentTheme, onThemeChange }) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-base-content/10 bg-base-100/90 p-4 backdrop-blur-xl lg:flex lg:flex-col">
      <NavLink to="/" className="mb-6 flex items-center gap-3 rounded-2xl p-2">
        <img
          src={logo}
          alt="Mark Larenz brand logo"
          className="h-11 w-11 rounded-2xl object-cover ring-1 ring-primary/30"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-base-content">
            Mark Larenz
          </p>
        </div>
      </NavLink>

      <nav className="space-y-1">
        {navItems.map(({ label, path, id, Icon }) => {
          const active =
            activePath === path || (path !== "/" && activePath.startsWith(`${path}/`));
          return (
            <NavLink
              key={id}
              to={path}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-content shadow-sm shadow-primary/25"
                  : "text-base-content/65 hover:bg-base-200 hover:text-base-content"
              }`}
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3">
        <div className="rounded-2xl border border-base-content/10 bg-base-200/50 p-3">
          <label
            htmlFor="desktop-theme"
            className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-base-content/45"
          >
            <Palette size={13} />
            Theme
          </label>
          <div className="relative">
            <select
              id="desktop-theme"
              value={currentTheme}
              onChange={(event) => onThemeChange(event.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-base-content/10 bg-base-100 px-3 pr-9 text-sm font-medium capitalize text-base-content outline-none transition-colors focus:border-primary"
              aria-label="Choose theme"
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base-content/45"
            />
          </div>
        </div>

        <a
          href="https://drive.google.com/file/d/1TFzqWQv-S9QFWLDtgO7pb68jxfOtW6Yp/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm w-full rounded-xl"
        >
          <FileText size={15} />
          Resume
        </a>
      </div>
    </aside>
  );
};
