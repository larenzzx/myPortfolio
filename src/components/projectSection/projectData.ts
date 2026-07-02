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
import supplyinventory from "../../assets/supplyinventory.svg";
import devfocus from "../../assets/DevFocus.svg";
import gitcraft from "../../assets/GitCraft.svg";
import html from "../../assets/html5.svg";
import css from "../../assets/css.svg";
import js from "../../assets/javascript.svg";
import php from "../../assets/php.svg";
import mysql from "../../assets/mysql.svg";
import postgresql from "../../assets/postgresql.svg";
import tailwind from "../../assets/tailwindcss.svg";
import daisy from "../../assets/daisyui.svg";
import react from "../../assets/react_dark.svg";
import typescript from "../../assets/typescript.svg";
import shadcn from "../../assets/shadcn-ui.svg";
import vite from "../../assets/vite.svg";
import { supabase } from "../../lib/supabaseClient";

// Registry of project preview images
export const PROJECT_IMGS = {
  "cyberguide-ai": cyberguideai,
  "devfocus": devfocus,
  "gitcraft": gitcraft,
  "client-portfolio-erich": erich,
  "supply-office-inventory": supplyinventory,
  "client-portfolio-janrey": journey,
  "client-portfolio-jhon": jhon,
  "pokedex-freelance": pokedex,
  "task-manager": todoo,
  "weather-app": weatherApp,
  "sunny-landing-page": sunnyside,
  "one-zamboanga": capstone,
  "pokedex-battle-simulation": pokemon,
  "react-todo-list": todo,
  "portfolio-website": elective,
  "wesmaardec-event-management": se,
  "ecovariety": ecom,
  "crimsonquest": crimson,
};

// Registry of technology logo images
export const TECH_RESOLVER = {
  "HTML5": html,
  "CSS3": css,
  "JavaScript": js,
  "PHP": php,
  "MySQL": mysql,
  "PostgreSQL": postgresql,
  "Django": "https://svgl.app/library/django.svg",
  "Tailwind CSS": tailwind,
  "DaisyUI": daisy,
  "React": react,
  "TypeScript": typescript,
  "shadcn/ui": shadcn,
  "Vite": vite,
};

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
  typescript: { logo: typescript, name: "TypeScript" },
  shadcn: { logo: shadcn, name: "shadcn/ui" },
  vite: { logo: vite, name: "Vite" },
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
    liveLink: "https://larenzzx.pythonanywhere.com/",
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
    slug: "devfocus",
    projectImg: devfocus,
    projectTitle: "DevFocus",
    projectRole: "Frontend Developer",
    category: "Personal",
    year: "2026",
    link: "https://github.com/larenzzx/DevFocus.git",
    liveView: true,
    liveLink: "https://devfocus-sigma.vercel.app/",
    isExperience: true,
    caseStudy: {
      problem:
        "Developers need a unified, distraction-free environment to track sprints, focus using Pomodoro timers, and block out noise without shifting tabs.",
      outcome:
        "Created a premium Glassmorphism bento-style dashboard combining Pomodoro timers, ambient soundscapes, sprint task lists, and visual focus metrics.",
    },
    ...withTech([tech.react, tech.vite, tech.typescript, tech.tailwind, tech.shadcn]),
  },
  {
    slug: "gitcraft",
    projectImg: gitcraft,
    projectTitle: "GitCraft",
    projectRole: "Frontend Developer",
    category: "Personal",
    year: "2026",
    link: "https://github.com/larenzzx/GitCraft.git",
    liveView: true,
    liveLink: "https://git-craft.vercel.app/",
    isExperience: true,
    caseStudy: {
      problem:
        "Version control can be intimidating for beginners, and command-line mistakes can feel costly.",
      outcome:
        "Built an interactive Git & GitHub sandbox simulator combining a local visual workspace, live commit trees, an in-browser CLI terminal, and structured training academies.",
    },
    ...withTech([tech.react, tech.vite, tech.tailwind]),
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
    ...withTech([tech.react, tech.vite, tech.tailwind]),
  },
  {
    slug: "supply-office-inventory",
    projectImg: supplyinventory,
    projectTitle: "WMSU Supply Office Inventory System",
    projectRole: "Full Stack Developer",
    category: "Freelance",
    year: "2026",
    link: "https://github.com/larenzzx/wmsu-supply-office-inventory.git",
    liveView: true,
    isExperience: true,
    liveLink: "https://wmsu-supplyoffice.infinityfreeapp.com/",
    ...withTech([tech.html, tech.css, tech.js, tech.php, tech.mysql]),
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
    ...withTech([tech.react, tech.vite, tech.tailwind]),
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
    ...withTech([tech.react, tech.vite, tech.tailwind]),
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
    ...withTech([tech.react, tech.vite, tech.tailwind, tech.daisy]),
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
    ...withTech([tech.react, tech.vite, tech.tailwind]),
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
    ...withTech([tech.react, tech.vite, tech.tailwind, tech.daisy]),
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
    ...withTech([tech.react, tech.vite, tech.tailwind, tech.daisy]),
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
  allProjects.find((project: any) => project.featured) ?? allProjects[0];

export const getProjectBySlug = (slug: string | undefined) =>
  allProjects.find((project) => project.slug === slug);

export const fetchProjectsFromSupabase = async () => {
  // Start with a copy of all static local projects
  let projectsList = [...allProjects];

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("year", { ascending: false });

    if (error) throw error;

    if (data) {
      data.forEach((p) => {
        // Self-heal/clean strings from any formatting linebreaks/spaces
        const cleanSlug = p.slug ? p.slug.replace(/\s+/g, "") : "";
        const cleanImageUrl = p.image_url ? p.image_url.replace(/\s+/g, "") : "";
        const cleanLink = p.link ? p.link.replace(/\s+/g, "") : null;
        const cleanLiveLink = p.live_link ? p.live_link.replace(/\s+/g, "") : null;
        
        const techStack = (p.stack || []).map((name) => {
          const cleanName = name ? name.trim().replace(/\s+/g, " ") : "";
          return TECH_RESOLVER[cleanName] || cleanName;
        });
        const techNames = (p.stack || []).map(name => name ? name.trim().replace(/\s+/g, " ") : "");

        const projectObj = {
          slug: cleanSlug,
          projectImg: PROJECT_IMGS[cleanImageUrl] || cleanImageUrl,
          projectTitle: p.project_title ? p.project_title.trim().replace(/\s+/g, " ") : "",
          projectRole: "",
          category: p.category ? p.category.trim().replace(/\s+/g, " ") : "",
          year: p.year ? p.year.replace(/\s+/g, "") : "",
          link: cleanLink,
          liveView: !!p.live_view,
          liveLink: cleanLiveLink,
          isExperience: !!p.is_experience,
          featured: !!p.featured,
          caseStudy: (p.case_study_problem || p.case_study_outcome) ? {
            problem: p.case_study_problem ? p.case_study_problem.trim().replace(/\s+/g, " ") : "",
            outcome: p.case_study_outcome ? p.case_study_outcome.trim().replace(/\s+/g, " ") : "",
          } : null,
          techStack,
          techNames,
          group: p.is_experience ? "freelance" : "academic",
          created_at: p.created_at
        };

        if (p.is_deleted) {
          // If soft deleted in database, remove from visible list
          projectsList = projectsList.filter((item) => item.slug !== p.slug);
        } else {
          const existingIndex = projectsList.findIndex((item) => item.slug === p.slug);
          if (existingIndex > -1) {
            // Replace static details with database edits
            projectsList[existingIndex] = projectObj;
          } else {
            // Append new projects added in admin panel
            projectsList.push(projectObj);
          }
        }
      });
    }
  } catch (err) {
    console.warn("Failed to fetch projects from Supabase, using local fallback:", err.message);
  }

  // Sort projects: year descending (primary), created_at descending (secondary)
  projectsList.sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    if (yearB !== yearA) {
      return yearB - yearA;
    }

    const dateA = (a as any).created_at ? new Date((a as any).created_at).getTime() : 0;
    const dateB = (b as any).created_at ? new Date((b as any).created_at).getTime() : 0;
    return dateB - dateA;
  });

  return projectsList;
};
