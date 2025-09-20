import { useState, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("synthwave");

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
    {
      name: "cupcake",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,3A4,4 0 0,1 16,7C16,7.73 15.81,8.41 15.46,9H18A2,2 0 0,1 20,11V12A2,2 0 0,1 18,14H17L16,21H8L7,14H6A2,2 0 0,1 4,12V11A2,2 0 0,1 6,9H8.54C8.19,8.41 8,7.73 8,7A4,4 0 0,1 12,3M12,5A2,2 0 0,0 10,7C10,8.1 10.9,9 12,9C13.1,9 14,8.1 14,7A2,2 0 0,0 12,5Z" />
        </svg>
      ),
    },
    {
      name: "bumblebee",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.5 5C11.84 5 10.27 5.24 8.84 5.65L6.5 3.5L5 5L9.26 9.26C9.09 9.81 9 10.4 9 11C9 11.6 9.09 12.19 9.26 12.74L5 17L6.5 18.5L8.84 16.35C10.27 16.76 11.84 17 13.5 17C14.32 17 15.24 16.94 16.17 16.83L13.5 19.5L15 21L21 15V13H19C19 13.34 18.97 13.68 18.91 14H16.83C16.94 13.68 17 13.34 17 13C17 12.66 16.94 12.32 16.83 12H18.91C18.97 12.32 19 12.66 19 13H21V11H19C19 10.66 18.97 10.32 18.91 10H16.83C16.94 10.32 17 10.66 17 11C17 11.34 16.94 11.68 16.83 12H18.91C18.97 11.68 19 11.34 19 11V9M13.5 7C14.33 7 15.13 7.05 15.89 7.14L11 12L15.89 16.86C15.13 16.95 14.33 17 13.5 17C12.67 17 11.87 16.95 11.11 16.86L16 12L11.11 7.14C11.87 7.05 12.67 7 13.5 7Z" />
        </svg>
      ),
    },
    {
      name: "emerald",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M6,2L18,2L22,8L12,22L2,8L6,2M12,4.5L9.5,7H14.5L12,4.5M8.5,9L6.5,9L9,11.5L8.5,9M15.5,9L18.5,9L15,11.5L15.5,9M12,13.5L8.5,17H15.5L12,13.5Z" />
        </svg>
      ),
    },
    {
      name: "corporate",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,7L20,3V5L12,9L4,5V3L12,7M2,6V8L12,13L22,8V6L12,11L2,6M2,10V12L12,17L22,12V10L12,15L2,10M2,14V16L12,21L22,16V14L12,19L2,14Z" />
        </svg>
      ),
    },
    {
      name: "synthwave",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,15.42 15.42,19 11,19V21H13V23H9V21H11V19C6.58,19 3,15.42 3,11H5C5,14.31 7.69,17 11,17A6,6 0 0,0 17,11H19Z" />
        </svg>
      ),
    },
    {
      name: "retro",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1L13.5,2.5L16.17,5.17C15.24,5.06 14.32,5 13.5,5C11.84,5 10.27,5.24 8.84,5.65L6.5,3.5L5,5L9.26,9.26C9.09,9.81 9,10.4 9,11C9,11.6 9.09,12.19 9.26,12.74L5,17L6.5,18.5L8.84,16.35C10.27,16.76 11.84,17 13.5,17C14.32,17 15.24,16.94 16.17,16.83L13.5,19.5L15,21L21,15V13H19C19,13.34 18.97,13.68 18.91,14H16.83C16.94,13.68 17,13.34 17,13C17,12.66 16.94,12.32 16.83,12H18.91C18.97,12.32 19,12.66 19,13H21V11H19C19,10.66 18.97,10.32 18.91,10H16.83C16.94,10.32 17,10.66 17,11C17,11.34 16.94,11.68 16.83,12H18.91C18.97,11.68 19,11.34 19,11V9Z" />
        </svg>
      ),
    },
    {
      name: "cyberpunk",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,3L2,12L12,21L22,12L12,3M12,4.5L19.5,12L12,19.5L4.5,12L12,4.5M8,12L12,8L16,12L12,16L8,12Z" />
        </svg>
      ),
    },
    {
      name: "valentine",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>
      ),
    },
    {
      name: "halloween",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2C17.5,2 22,6.5 22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2M12,4C7.58,4 4,7.58 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,7.58 16.42,4 12,4M8,11C8.55,11 9,10.55 9,10C9,9.45 8.55,9 8,9C7.45,9 7,9.45 7,10C7,10.55 7.45,11 8,11M16,11C16.55,11 17,10.55 17,10C17,9.45 16.55,9 16,9C15.45,9 15,9.45 15,10C15,10.55 15.45,11 16,11M12,13L7,18H17L12,13Z" />
        </svg>
      ),
    },
    {
      name: "garden",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,22A1,1 0 0,1 11,21V19H7A2,2 0 0,1 5,17V15A6.5,6.5 0 0,1 11.5,8.5H12.5A6.5,6.5 0 0,1 19,15V17A2,2 0 0,1 17,19H13V21A1,1 0 0,1 12,22M12,10.5A4.5,4.5 0 0,0 7.5,15V17H11V15A1,1 0 0,1 12,14A1,1 0 0,1 13,15V17H16.5V15A4.5,4.5 0 0,0 12,10.5M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2Z" />
        </svg>
      ),
    },
    {
      name: "forest",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,3L8,9H11V14H13V9H16M5,10L4,11L5,12H7V16H9V12H10L11,11L10,10H5M19,10L18,11L19,12H21V16H23V12H22L23,11L22,10H19M12,17V20H14V17H12M5,18V21H7V18H5M19,18V21H21V18H19Z" />
        </svg>
      ),
    },
    {
      name: "aqua",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2C13.1,2 14,2.9 14,4V8.5C16.5,9.5 18.5,11.8 18.9,14.5C19.1,16.3 18.3,18 16.9,19.2C15.2,20.5 12.8,20.5 11.1,19.2C9.7,18 8.9,16.3 9.1,14.5C9.5,11.8 11.5,9.5 14,8.5V4C14,2.9 13.1,2 12,2M12,4A6,6 0 0,1 18,10A6,6 0 0,1 12,16A6,6 0 0,1 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z" />
        </svg>
      ),
    },
    {
      name: "lofi",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,15.42 15.42,19 11,19V21H13V23H9V21H11V19C6.58,19 3,15.42 3,11H5C5,14.31 7.69,17 11,17A6,6 0 0,0 17,11H19Z" />
        </svg>
      ),
    },
    {
      name: "pastel",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H18A2,2 0 0,1 20,16V18A2,2 0 0,1 18,20H13V22A1,1 0 0,1 12,23H11A1,1 0 0,1 10,22V20H6A2,2 0 0,1 4,18V16A2,2 0 0,1 6,14H9.29L9.56,13.73C8.59,12.59 8,11.11 8,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5A4.5,4.5 0 0,0 5,9.5A4.5,4.5 0 0,0 9.5,14A4.5,4.5 0 0,0 14,9.5A4.5,4.5 0 0,0 9.5,5Z" />
        </svg>
      ),
    },
    {
      name: "fantasy",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2L14,8H22L16,12L18,20L12,16L6,20L8,12L2,8H10L12,2Z" />
        </svg>
      ),
    },
    {
      name: "wireframe",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M3,3V21H21V3H3M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H10V11H7M12,11V13H17V11H12M7,15V17H12V15H7M14,15V17H17V15H14Z" />
        </svg>
      ),
    },
    {
      name: "black",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4Z" />
        </svg>
      ),
    },
    {
      name: "luxury",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M6,2L18,2L22,8L12,22L2,8L6,2M12,4.5L9.5,7H14.5L12,4.5M8.5,9L6.5,9L9,11.5L8.5,9M15.5,9L18.5,9L15,11.5L15.5,9M12,13.5L8.5,17H15.5L12,13.5Z" />
        </svg>
      ),
    },
    {
      name: "dracula",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M8,7L16,7C17.1,7 18,7.9 18,9V11C18,13.8 15.8,16 13,16V20C13,20.6 12.6,21 12,21C11.4,21 11,20.6 11,20V16C8.2,16 6,13.8 6,11V9C6,7.9 6.9,7 8,7Z" />
        </svg>
      ),
    },
    {
      name: "cmyk",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2C17.5,2 22,6.5 22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M7,9L12,14L17,9H7Z" />
        </svg>
      ),
    },
    {
      name: "autumn",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3,16.75 4,17.25C7,8.25 17,8 17,8Z" />
        </svg>
      ),
    },
    {
      name: "business",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,7L20,3V5L12,9L4,5V3L12,7M2,6V8L12,13L22,8V6L12,11L2,6M2,10V12L12,17L22,12V10L12,15L2,10M2,14V16L12,21L22,16V14L12,19L2,14Z" />
        </svg>
      ),
    },
    {
      name: "acid",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,2C17.5,2 22,6.5 22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2M12,4C7.58,4 4,7.58 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,7.58 16.42,4 12,4M8,11A1,1 0 0,1 9,10A1,1 0 0,1 10,11A1,1 0 0,1 9,12A1,1 0 0,1 8,11M14,11A1,1 0 0,1 15,10A1,1 0 0,1 16,11A1,1 0 0,1 15,12A1,1 0 0,1 14,11M8,15C8.91,16.17 10.39,17 12,17C13.61,17 15.09,16.17 16,15H8Z" />
        </svg>
      ),
    },
    {
      name: "lemonade",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12,18C8.686,18,6,15.314,6,12s2.686-6,6-6s6,2.686,6,6S15.314,18,12,18z M12,8c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S14.209,8,12,8z" />
          <path d="M12,4c-0.552,0-1-0.448-1-1V1c0-0.552,0.448-1,1-1s1,0.448,1,1v2C13,3.552,12.552,4,12,4z" />
          <path d="M12,24c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1s1,0.448,1,1v2C13,23.552,12.552,24,12,24z" />
          <path d="M5.636,6.636c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l1.414-1.414c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L6.343,6.343C6.148,6.538,5.892,6.636,5.636,6.636z" />
        </svg>
      ),
    },
    {
      name: "night",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      ),
    },
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
      <div className="navbar fixed z-10 bg-base-100/70 text-base-content backdrop-blur backdrop-contrast-100 backdrop-saturate-100 backdrop-filter">
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
                  <a href="#about">About</a>
                </li>
                {/* <li>
                  <a href="#exp">Experience</a>
                </li> */}
                <li>
                  <a href="#skills">Skills</a>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#certs">Certificates</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                {/* <li>
                  <a href="#blogs">Blogs</a>
                </li> */}
              </ul>
            )}
          </div>
          <a
            href="#"
            className="btn btn-ghost animate-pulse text-base font-bold sm:text-xl"
          >
            larenz
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="#about">About</a>
            </li>
            {/* <li>
              <a href="#exp">Experience</a>
            </li> */}
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#certs">Certificates</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            {/* <li>
              <a href="#blogs">Blogs</a>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          <a
            href="https://drive.google.com/file/d/1dqqeL91GURjAXiUEM4hBtWujOvc4VoBl/view?usp=sharing"
            target="_blank"
            className="btn btn-primary"
          >
            Resume
          </a>
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

export default Header;
