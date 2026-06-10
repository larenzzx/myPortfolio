import { useState, useEffect, useRef } from "react";
import { ChevronDown, FileText, Palette, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems, themes } from "./navItems";
import logo from "../../assets/logoLarenz.png";

export const Sidebar = ({ activePath, currentTheme, onThemeChange, onCommandOpen }) => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && /mac/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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

      <button
        type="button"
        onClick={onCommandOpen}
        className="mb-4 flex items-center justify-between w-full rounded-xl border border-base-content/10 bg-base-200/50 px-3 py-2 text-left text-xs font-medium text-base-content/55 hover:bg-base-200 transition-colors duration-150"
      >
        <div className="flex items-center gap-2">
          <Search size={14} className="text-base-content/40" />
          <span>Search command...</span>
        </div>
        <kbd className="rounded bg-base-content/10 px-1.5 py-0.5 font-mono text-[9px]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
      </button>

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
            className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-base-content/45"
          >
            <Palette size={13} />
            Theme
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsThemeOpen((open) => !open)}
              className="flex h-10 w-full items-center justify-between rounded-xl border border-base-content/10 bg-base-100 px-3 text-sm font-medium capitalize text-base-content outline-none transition-colors hover:border-primary/50"
            >
              <span>{currentTheme}</span>
              <ChevronDown
                size={15}
                className={`text-base-content/45 transition-transform duration-200 ${
                  isThemeOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isThemeOpen && (
              <div className="absolute bottom-full left-0 mb-2 z-50 w-full rounded-xl border border-base-content/10 bg-base-100 p-1.5 shadow-xl">
                <div className="space-y-0.5 max-h-48 overflow-y-auto no-scrollbar">
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => {
                        onThemeChange(theme);
                        setIsThemeOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs capitalize transition-colors ${
                        currentTheme === theme
                          ? "bg-primary text-primary-content"
                          : "text-base-content/75 hover:bg-base-200 hover:text-base-content"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
