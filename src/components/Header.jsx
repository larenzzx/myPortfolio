import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("synthwave");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const themes = [
    {
      name: "light",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,18C8.686,18,6,15.314,6,12s2.686-6,6-6s6,2.686,6,6S15.314,18,12,18z M12,8c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S14.209,8,12,8z" />
          <path d="M12,4c-0.552,0-1-0.448-1-1V1c0-0.552,0.448-1,1-1s1,0.448,1,1v2C13,3.552,12.552,4,12,4z" />
          <path d="M12,24c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1s1,0.448,1,1v2C13,23.552,12.552,24,12,24z" />
          <path d="M5.636,6.636c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l1.414-1.414c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L6.343,6.343C6.148,6.538,5.892,6.636,5.636,6.636z" />
          <path d="M16.95,17.95c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l1.414-1.414c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-1.414,1.414C17.462,17.852,17.206,17.95,16.95,17.95z" />
          <path d="M4,13H2c-0.552,0-1-0.448-1-1s0.448-1,1-1h2c0.552,0,1,0.448,1,1S4.552,13,4,13z" />
          <path d="M24,13h-2c-0.552,0-1-0.448-1-1s0.448-1,1-1h2c0.552,0,1,0.448,1,1S24.552,13,24,13z" />
          <path d="M7.05,17.95c-0.256,0-0.512-0.098-0.707-0.293l-1.414-1.414c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.023,0,1.414C7.562,17.852,7.306,17.95,7.05,17.95z" />
          <path d="M18.364,6.636c-0.256,0-0.512-0.098-0.707-0.293l-1.414-1.414c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.023,0,1.414C18.876,6.538,18.62,6.636,18.364,6.636z" />
        </svg>
      ),
    },
    {
      name: "dark",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      ),
    },
    { name: "cupcake", icon: null },
    { name: "bumblebee", icon: null },
    { name: "emerald", icon: null },
    { name: "corporate", icon: null },
    { name: "synthwave", icon: null },
    { name: "retro", icon: null },
    { name: "cyberpunk", icon: null },
    { name: "valentine", icon: null },
    { name: "halloween", icon: null },
    { name: "garden", icon: null },
    { name: "forest", icon: null },
    { name: "aqua", icon: null },
    { name: "lofi", icon: null },
    { name: "pastel", icon: null },
    { name: "fantasy", icon: null },
    { name: "wireframe", icon: null },
    { name: "black", icon: null },
    { name: "luxury", icon: null },
    { name: "dracula", icon: null },
    { name: "cmyk", icon: null },
    { name: "autumn", icon: null },
    { name: "business", icon: null },
    { name: "acid", icon: null },
    { name: "lemonade", icon: null },
    { name: "night", icon: null },
  ];

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Experience", href: "#exp", id: "exp" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Certificates", href: "#certs", id: "certs" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );
    document.querySelectorAll("section[id], div[id]").forEach((s) =>
      observer.observe(s)
    );
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIsThemeOpen(false);
  };

  return (
    <div
      className={`fixed z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-base-100/60 backdrop-blur-lg border-b border-base-content/10 shadow-sm py-1"
          : "bg-transparent py-3"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <a
          href="#"
          className="text-primary font-bold text-base sm:text-xl hover:text-primary/80 transition-colors"
        >
          larenz
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`relative px-1 py-0.5 transition-colors duration-200 text-sm font-medium
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0
                after:bg-primary after:transition-transform after:origin-left hover:after:scale-x-100
                ${
                  activeSection === link.id
                    ? "text-primary after:scale-x-100"
                    : "text-base-content/80 hover:text-primary"
                }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://drive.google.com/file/d/1TFzqWQv-S9QFWLDtgO7pb68jxfOtW6Yp/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Resume
          </a>

          {/* Theme switcher */}
          <div className="relative">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsThemeOpen(!isThemeOpen)}
            >
              <Palette size={18} />
              <span className="ml-1 hidden md:inline text-xs">{currentTheme}</span>
            </button>
            {isThemeOpen && (
              <ul className="absolute right-0 top-full mt-2 menu z-50 max-h-96 w-48 overflow-y-auto rounded-box bg-base-200 p-2 shadow">
                {themes.map((theme) => (
                  <li key={theme.name}>
                    <a
                      className={`flex items-center gap-2 text-sm ${theme.name === currentTheme ? "active" : ""}`}
                      onClick={() => changeTheme(theme.name)}
                    >
                      {theme.icon && <span>{theme.icon}</span>}
                      {theme.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="btn btn-ghost btn-sm lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1 w-5">
              <span
                className={`block h-0.5 w-full bg-base-content transition-all duration-300 origin-center ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-base-content transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-base-content transition-all duration-300 origin-center ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu — animated slide-down */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 pb-4 pt-2 bg-base-100/90 backdrop-blur-lg border-t border-base-content/10">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`py-2 text-sm font-medium transition-colors duration-200 ${
                activeSection === link.id
                  ? "text-primary"
                  : "text-base-content/80 hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Header;
