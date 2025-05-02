import React, { useState, useEffect } from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");

  const themes = [
    { name: "light", icon: "☀️" },
    { name: "dark", icon: "🌙" },
    { name: "cupcake", icon: "🧁" },
    { name: "bumblebee", icon: "🐝" },
    { name: "emerald", icon: "💚" },
    { name: "corporate", icon: "🏢" },
    { name: "synthwave", icon: "🌌" },
    { name: "retro", icon: "🕹️" },
    { name: "cyberpunk", icon: "⚡" },
    { name: "valentine", icon: "❤️" },
    { name: "halloween", icon: "🎃" },
    { name: "garden", icon: "🌼" },
    { name: "forest", icon: "🌲" },
    { name: "aqua", icon: "💧" },
    { name: "lofi", icon: "📼" },
    { name: "pastel", icon: "🖍️" },
    { name: "fantasy", icon: "🧚" },
    { name: "wireframe", icon: "🦴" },
    { name: "black", icon: "🖤" },
    { name: "luxury", icon: "💎" },
    { name: "dracula", icon: "🧛" },
    { name: "cmyk", icon: "🖨️" },
    { name: "autumn", icon: "🍂" },
    { name: "business", icon: "📊" },
    { name: "acid", icon: "☣️" },
    { name: "lemonade", icon: "🍋" },
    { name: "night", icon: "🌃" },
    { name: "coffee", icon: "☕" },
    { name: "winter", icon: "❄️" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleThemeDropdown = () => {
    setIsThemeOpen(!isThemeOpen);
  };

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIsThemeOpen(false);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  return (
    <>
      <div className="navbar fixed z-10 bg-gray-500 bg-opacity-10 bg-clip-padding backdrop-blur backdrop-contrast-100 backdrop-saturate-100 backdrop-filter">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-box bg-base-200 bg-clip-padding p-2 text-base-content shadow"
              >
                <li>
                  <Link to="/#about">About</Link>
                </li>
                <li>
                  <Link to="/#exp">Experience</Link>
                </li>
                <li>
                  <Link to="/#skills">Skills</Link>
                </li>
                <li>
                  <Link to="/#projects">Projects</Link>
                </li>
                <li>
                  <Link to="/#contact">Contact</Link>
                </li>
                <li>
                  <Link to="/#blogs">Blogs</Link>
                </li>
              </ul>
            )}
          </div>
          <Link
            to="/"
            className="btn btn-ghost animate-pulse text-base font-bold sm:text-xl"
          >
            larenzz
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/#about">About</Link>
            </li>
            <li>
              <Link to="/#exp">Experience</Link>
            </li>
            <li>
              <Link to="/#skills">Skills</Link>
            </li>
            <li>
              <Link to="/#projects">Projects</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
            <li>
              <Link to="/#blogs">Blogs</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Button btn="Resume" />
          <div className="divider divider-horizontal mx-2"></div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost"
              onClick={toggleThemeDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                />
              </svg>
              <span className="ml-2 hidden md:inline">{currentTheme}</span>
            </div>
            {isThemeOpen && (
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 max-h-96 w-52 overflow-y-auto rounded-box bg-base-200 p-2 shadow"
              >
                {themes.map((theme) => (
                  <li key={theme.name}>
                    <a
                      className={theme.name === currentTheme ? "active" : ""}
                      onClick={() => changeTheme(theme.name)}
                    >
                      <span className="mr-2">{theme.icon}</span>
                      {theme.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogHeader;
