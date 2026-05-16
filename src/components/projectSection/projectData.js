import journey from "../../assets/janrey.svg";
import jhon from "../../assets/jhon.svg";
import erich from "../../assets/erich.svg";
import pokedex from "../../assets/pokedex.svg";
import todoo from "../../assets/todoo.svg";
import weatherApp from "../../assets/weatherapp.svg";
import sunnyside from "../../assets/sunnyside.svg";
import capstone from "../../assets/capstone.svg";
import elective from "../../assets/elective.svg";
import se from "../../assets/SE.svg";
import ecom from "../../assets/ecommerce.svg";
import crimson from "../../assets/crimsonquest.svg";
import todo from "../../assets/todolist.svg";
import pokemon from "../../assets/pokemon.svg";
import cyberguideai from "../../assets/cyberguideai.svg";
import html from "../../assets/html5.svg";
import css from "../../assets/css.svg";
import js from "../../assets/javascript.svg";
import php from "../../assets/php.svg";
import mysql from "../../assets/mysql.svg";
import postgresql from "../../assets/postgresql.svg";
import tailwind from "../../assets/tailwindcss.svg";
import daisy from "../../assets/daisyui.svg";
import react from "../../assets/react_dark.svg";

const tech = {
  html: { logo: html, name: "HTML5" },
  css: { logo: css, name: "CSS3" },
  js: { logo: js, name: "JavaScript" },
  php: { logo: php, name: "PHP" },
  mysql: { logo: mysql, name: "MySQL" },
  postgresql: { logo: postgresql, name: "PostgreSQL" },
  django: { logo: "https://svgl.app/library/django.svg", name: "Django" },
  tailwind: { logo: tailwind, name: "Tailwind CSS" },
  daisy: { logo: daisy, name: "DaisyUI" },
  react: { logo: react, name: "React" },
};

const withTech = (items) => ({
  techStack: items.map((item) => item.logo),
  techNames: items.map((item) => item.name),
});

export const experienceProjects = [
  {
    slug: "cyberguide-ai",
    projectImg: cyberguideai,
    projectTitle: "CyberGuide AI",
    projectRole: "Full Stack Developer",
    category: "Personal",
    year: "2026",
    link: "https://github.com/larenzzx/cyberguideai.git",
    liveView: true,
    liveLink: "https://cyberguideai.onrender.com/",
    isExperience: true,
    featured: true,
    caseStudy: {
      problem:
        "SOC analysts, helpdesk users, IT administrators, and cybersecurity learners need a focused workspace for operational guidance and investigation workflows.",
      outcome:
        "Built a Django assistant that combines AI guidance with threat intelligence lookup, IOC extraction, phishing email analysis, user access management, and admin approval workflows.",
    },
    ...withTech([tech.django, tech.postgresql, tech.tailwind, tech.daisy]),
  },
  {
    slug: "client-portfolio-erich",
    projectImg: erich,
    projectTitle: "Client Portfolio",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2026",
    link: "https://github.com/erich411/Portfolio",
    liveView: true,
    liveLink: "https://portfolio-iota-sand-35.vercel.app/",
    isExperience: true,
    ...withTech([tech.react, tech.tailwind]),
  },
  {
    slug: "client-portfolio-janrey",
    projectImg: journey,
    projectTitle: "Client Portfolio",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/przvlll/myportfolio",
    liveView: true,
    liveLink: "https://przvlllportfolio.netlify.app/",
    isExperience: true,
    ...withTech([tech.react, tech.tailwind]),
  },
  {
    slug: "client-portfolio-jhon",
    projectImg: jhon,
    projectTitle: "Client Portfolio",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/dinojondino12/jondinoportfolio",
    liveView: true,
    liveLink: "https://jondinorodrigo.netlify.app/",
    isExperience: true,
    ...withTech([tech.react, tech.tailwind]),
  },
  {
    slug: "pokedex-freelance",
    projectImg: pokedex,
    projectTitle: "Pokedex",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/ziaramelon/minipokedex",
    liveView: false,
    isExperience: true,
    ...withTech([tech.react, tech.tailwind, tech.daisy]),
  },
  {
    slug: "task-manager",
    projectImg: todoo,
    projectTitle: "Task Manager",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/ziaramelon/myReactTodolist",
    liveView: true,
    liveLink: "https://reacttodolistproj.netlify.app/",
    isExperience: true,
    ...withTech([tech.react, tech.tailwind]),
  },
  {
    slug: "weather-app",
    projectImg: weatherApp,
    projectTitle: "Weather App",
    projectRole: "Frontend Developer",
    category: "Personal",
    year: "2025",
    link: "https://github.com/larenzzx/jsWeatherApp",
    liveView: true,
    liveLink: "https://larenzzsimpleweatherapp.netlify.app/",
    isExperience: true,
    ...withTech([tech.html, tech.css, tech.js]),
  },
  {
    slug: "sunny-landing-page",
    projectImg: sunnyside,
    projectTitle: "Sunny Landing Page",
    projectRole: "Frontend Developer",
    category: "Personal",
    year: "2024",
    link: "https://github.com/larenzzx/sunnyside",
    liveView: true,
    liveLink: "https://larenzzx.github.io/sunnyside/",
    isExperience: true,
    ...withTech([tech.html, tech.css, tech.js]),
  },
];

export const academicProjects = [
  {
    slug: "one-zamboanga",
    projectImg: capstone,
    projectTitle: "One Zamboanga: Evacuation Center Management System",
    projectRole: "Full Stack Developer",
    category: "Capstone",
    year: "2025",
    link: "https://github.com/larenzzx/oneZamboanga_capstone",
    liveView: false,
    isExperience: false,
    caseStudy: {
      problem:
        "Evacuation center management needs organized digital workflows for records, coordination, and access to information.",
      outcome:
        "Built as a capstone full-stack system focused on evacuation center management workflows.",
    },
    ...withTech([tech.html, tech.css, tech.js, tech.php, tech.mysql]),
  },
  {
    slug: "pokedex-battle-simulation",
    projectImg: pokemon,
    projectTitle: "PokeHub",
    projectRole: "Individual Project",
    category: "IT142",
    year: "2025",
    link: "https://github.com/larenzzx/reactPokedex.git",
    liveView: true,
    liveLink: "https://poke-hub-six.vercel.app/",
    isExperience: false,
    caseStudy: {
      problem:
        "A learning-driven React project needed structured Pokemon data presentation with an interactive battle simulation.",
      outcome:
        "Created an individual project combining a Pokedex interface with battle simulation behavior.",
    },
    ...withTech([tech.react, tech.tailwind, tech.daisy]),
  },
  {
    slug: "react-todo-list",
    projectImg: todo,
    projectTitle: "Todo-list App using ReactJS",
    projectRole: "Individual Project",
    category: "IT142",
    year: "2025",
    link: "https://github.com/larenzzx/react-Todolist.git",
    liveView: true,
    liveLink: "https://larenzzx-react-todolist.netlify.app/",
    isExperience: false,
    ...withTech([tech.react, tech.tailwind, tech.daisy]),
  },
  {
    slug: "portfolio-website",
    projectImg: elective,
    projectTitle: "Portfolio Website",
    projectRole: "Individual Project",
    category: "IT Elective 4",
    year: "2025",
    link: "https://github.com/larenzzx/tabotabo_portfolioWebsite",
    liveView: true,
    liveLink: "https://larenzzx.github.io/tabotabo_portfolioWebsite/",
    isExperience: false,
    ...withTech([tech.html, tech.css, tech.js]),
  },
  {
    slug: "wesmaardec-event-management",
    projectImg: se,
    projectTitle: "WESMAARDEC Event Management",
    projectRole: "Full Stack Developer",
    category: "Software Eng.",
    year: "2024",
    link: "https://github.com/larenzzx/WESMAARDEC-Event-Management-System",
    liveView: false,
    isExperience: false,
    caseStudy: {
      problem:
        "Event management work benefits from a system that can organize event-related data and workflows.",
      outcome:
        "Built as a Software Engineering full-stack project for WESMAARDEC event management.",
    },
    ...withTech([tech.html, tech.css, tech.js, tech.php, tech.mysql]),
  },
  {
    slug: "ecovariety",
    projectImg: ecom,
    projectTitle: "ECOVARIETY E-commerce Plant Store",
    projectRole: "Frontend Developer",
    category: "IT Elective 2",
    year: "2024",
    link: "https://github.com/larenzzx/Ecovariety",
    liveView: false,
    isExperience: false,
    ...withTech([tech.html, tech.css, tech.js]),
  },
  {
    slug: "crimsonquest",
    projectImg: crimson,
    projectTitle: "CrimsonQuest: Campus Directory",
    projectRole: "Full Stack Developer",
    category: "Database Project",
    year: "2023",
    link: "https://github.com/larenzzx/CrimsonQuest",
    liveView: false,
    isExperience: false,
    ...withTech([tech.html, tech.css, tech.js, tech.php, tech.mysql]),
  },
];

export const allProjects = [
  ...experienceProjects.map((project) => ({ ...project, group: "freelance" })),
  ...academicProjects.map((project) => ({ ...project, group: "academic" })),
];

export const featuredProject =
  allProjects.find((project) => project.featured) ?? allProjects[0];

export const getProjectBySlug = (slug) =>
  allProjects.find((project) => project.slug === slug);
