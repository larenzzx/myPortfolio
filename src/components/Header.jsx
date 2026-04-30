import { useEffect, useState } from "react";
import { Menu, Moon, Palette, Sun, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#exp", id: "exp" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Certificates", href: "#certs", id: "certs" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const themes = [
  { name: "night", label: "Night", Icon: Moon },
  { name: "corporate", label: "Corporate", Icon: Sun },
  { name: "business", label: "Business", Icon: Palette },
  { name: "winter", label: "Winter", Icon: Sun },
  { name: "dracula", label: "Dracula", Icon: Moon },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    () => localStorage.getItem("theme") || "night"
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "night";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIsThemeOpen(false);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsThemeOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b py-3 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-200 ease-out ${
        isScrolled
          ? "border-base-content/10 bg-base-100/80 shadow-sm"
          : "border-transparent bg-base-100/35 shadow-none"
      }`}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-3 px-4">
        <a
          href="#"
          onClick={closeMenus}
          className="group flex items-center gap-2 font-bold text-base-content transition-colors hover:text-primary"
          aria-label="Go to top"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm font-black text-primary-content shadow-sm shadow-primary/20 transition-transform duration-300 group-hover:-translate-y-0.5">
            ML
          </span>
          <span className="hidden text-sm tracking-wide sm:inline">Mark Larenz</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-base-content/10 bg-base-100/55 p-1 shadow-sm backdrop-blur-lg lg:flex">
          {navLinks.map((link) => {
            const active = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-content shadow-sm shadow-primary/20"
                    : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://drive.google.com/file/d/1TFzqWQv-S9QFWLDtgO7pb68jxfOtW6Yp/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm min-h-10 rounded-xl px-4"
          >
            Resume
          </a>

          <div className="relative">
            <button
              type="button"
              className="btn btn-ghost btn-sm min-h-10 rounded-xl border border-base-content/10 bg-base-100/60"
              onClick={() => setIsThemeOpen((open) => !open)}
              aria-label="Choose theme"
              aria-expanded={isThemeOpen}
            >
              <Palette size={17} />
              <span className="hidden text-xs capitalize md:inline">{currentTheme}</span>
            </button>

            {isThemeOpen && (
              <div className="absolute right-0 top-full mt-3 w-52 rounded-2xl border border-base-content/10 bg-base-100 p-2 shadow-xl shadow-base-content/10">
                {themes.map(({ name, label, Icon }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => changeTheme(name)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      currentTheme === name
                        ? "bg-primary text-primary-content"
                        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm min-h-10 rounded-xl border border-base-content/10 bg-base-100/60 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
          isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-4 mt-3 rounded-2xl border border-base-content/10 bg-base-100/95 p-2 shadow-xl shadow-base-content/10 backdrop-blur-xl">
          {navLinks.map((link) => {
            const active = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={closeMenus}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-content"
                    : "text-base-content/75 hover:bg-base-200 hover:text-base-content"
                }`}
              >
                {link.label}
                {active && <span className="h-2 w-2 rounded-full bg-current" />}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;
