import { useState } from "react";
import { SectionTitle } from "../SectionTitle";
import { ProjectCard } from "./ProjectCard";
import { Briefcase, GraduationCap, LayoutGrid } from "lucide-react";

import ziara from "../../assets/ziara.svg";
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
import html from "../../assets/html5.svg";
import css from "../../assets/css.svg";
import js from "../../assets/javascript.svg";
import php from "../../assets/php.svg";
import mysql from "../../assets/mysql.svg";
import tailwind from "../../assets/tailwindcss.svg";
import daisy from "../../assets/daisyui.svg";
import react from "../../assets/react_dark.svg";

/* ----------------------------------------------------------------
   Project data
---------------------------------------------------------------- */
const experienceProjects = [
  {
    projectImg: ziara,
    projectTitle: "Client Portfolio",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/ziaramelon/reactPortfolio",
    liveView: true,
    liveLink: "https://personal-porfolio-raiza.netlify.app/",
    techStack: [react, tailwind],
    isExperience: true,
  },
  {
    projectImg: journey,
    projectTitle: "Client Portfolio",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/przvlll/myportfolio",
    liveView: true,
    liveLink: "https://przvlllportfolio.netlify.app/",
    techStack: [react, tailwind],
    isExperience: true,
  },
  {
    projectImg: jhon,
    projectTitle: "Client Portfolio",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/dinojondino12/jondinoportfolio",
    liveView: true,
    liveLink: "https://jondinorodrigo.netlify.app/",
    techStack: [react, tailwind],
    isExperience: true,
  },
  {
    projectImg: erich,
    projectTitle: "Client Portfolio",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/erich411/Portfolio",
    liveView: true,
    liveLink: "https://erichramos.netlify.app/",
    techStack: [react, tailwind],
    isExperience: true,
  },
  {
    projectImg: pokedex,
    projectTitle: "Pokedex",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/ziaramelon/minipokedex",
    liveView: false,
    techStack: [react, tailwind, daisy],
    isExperience: true,
  },
  {
    projectImg: todoo,
    projectTitle: "Task Manager",
    projectRole: "Frontend Developer",
    category: "Freelance",
    year: "2025",
    link: "https://github.com/ziaramelon/myReactTodolist",
    liveView: true,
    liveLink: "https://reacttodolistproj.netlify.app/",
    techStack: [react, tailwind],
    isExperience: true,
  },
  {
    projectImg: weatherApp,
    projectTitle: "Weather App",
    projectRole: "Frontend Developer",
    category: "Personal",
    year: "2025",
    link: "https://github.com/larenzzx/jsWeatherApp",
    liveView: true,
    liveLink: "https://larenzzsimpleweatherapp.netlify.app/",
    techStack: [html, css, js],
    isExperience: true,
  },
  {
    projectImg: sunnyside,
    projectTitle: "Sunny Landing Page",
    projectRole: "Frontend Developer",
    category: "Personal",
    year: "2024",
    link: "https://github.com/larenzzx/sunnyside",
    liveView: true,
    liveLink: "https://larenzzx.github.io/sunnyside/",
    techStack: [html, css, js],
    isExperience: true,
  },
];

const academicProjects = [
  {
    projectImg: capstone,
    projectTitle: "One Zamboanga: Evacuation Center Management System",
    projectRole: "Full Stack Developer",
    category: "Capstone",
    year: "2025",
    link: "https://github.com/larenzzx/oneZamboanga_capstone",
    liveView: false,
    techStack: [html, css, js, php, mysql],
    isExperience: false,
  },
  {
    projectImg: pokemon,
    projectTitle: "Pokedex with Battle Simulation",
    projectRole: "Individual Project",
    category: "IT142",
    year: "2025",
    link: "https://github.com/larenzzx/reactPokedex.git",
    liveView: false,
    techStack: [react, tailwind, daisy],
    isExperience: false,
  },
  {
    projectImg: todo,
    projectTitle: "Todo-list App using ReactJS",
    projectRole: "Individual Project",
    category: "IT142",
    year: "2025",
    link: "https://github.com/larenzzx/react-Todolist.git",
    liveView: true,
    liveLink: "https://larenzzx-react-todolist.netlify.app/",
    techStack: [react, tailwind, daisy],
    isExperience: false,
  },
  {
    projectImg: elective,
    projectTitle: "Portfolio Website",
    projectRole: "Individual Project",
    category: "IT Elective 4",
    year: "2025",
    link: "https://github.com/larenzzx/tabotabo_portfolioWebsite",
    liveView: true,
    liveLink: "https://larenzzx.github.io/tabotabo_portfolioWebsite/",
    techStack: [html, css, js],
    isExperience: false,
  },
  {
    projectImg: se,
    projectTitle: "WESMAARDEC Event Management",
    projectRole: "Full Stack Developer",
    category: "Software Eng.",
    year: "2024",
    link: "https://github.com/larenzzx/WESMAARDEC-Event-Management-System",
    liveView: false,
    techStack: [html, css, js, php, mysql],
    isExperience: false,
  },
  {
    projectImg: ecom,
    projectTitle: "ECOVARIETY E-commerce Plant Store",
    projectRole: "Frontend Developer",
    category: "IT Elective 2",
    year: "2024",
    link: "https://github.com/larenzzx/Ecovariety",
    liveView: false,
    techStack: [html, css, js],
    isExperience: false,
  },
  {
    projectImg: crimson,
    projectTitle: "CrimsonQuest: Campus Directory",
    projectRole: "Full Stack Developer",
    category: "Database Project",
    year: "2023",
    link: "https://github.com/larenzzx/CrimsonQuest",
    liveView: false,
    techStack: [html, css, js, php, mysql],
    isExperience: false,
  },
];

const allProjects = [
  ...experienceProjects.map((p) => ({ ...p, group: "freelance" })),
  ...academicProjects.map((p) => ({ ...p, group: "academic" })),
];

/* ----------------------------------------------------------------
   Section group heading
---------------------------------------------------------------- */
const GroupHeading = ({ icon: Icon, title, description, count, color }) => (
  <div className="mb-8 flex items-center gap-4">
    <div
      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${color}`}
    >
      <Icon size={20} strokeWidth={1.8} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-bold text-base-content sm:text-xl">
          {title}
        </h3>
        <span className="badge badge-outline badge-sm font-mono text-base-content/50">
          {count} projects
        </span>
      </div>
      <p className="mt-0.5 text-sm text-base-content/55">{description}</p>
    </div>
  </div>
);

/* ----------------------------------------------------------------
   Main component
---------------------------------------------------------------- */
const TABS = [
  { id: "all", label: "All", Icon: LayoutGrid },
  { id: "freelance", label: "Personal & Freelance", Icon: Briefcase },
  { id: "academic", label: "Academic", Icon: GraduationCap },
];

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");

  const liveCount = allProjects.filter((p) => p.liveView).length;

  const showFreelance = activeTab === "all" || activeTab === "freelance";
  const showAcademic = activeTab === "all" || activeTab === "academic";

  const freelanceList =
    activeTab === "all"
      ? experienceProjects
      : allProjects.filter((p) => p.group === "freelance");

  const academicList =
    activeTab === "all"
      ? academicProjects
      : allProjects.filter((p) => p.group === "academic");

  return (
    <div className="bg-base-200 px-4 py-16">
      <div className="container mx-auto max-w-7xl">
        <SectionTitle id="projects" title="Projects" />

        {/* Filter tabs */}
        <div className="no-scrollbar -mx-4 mb-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? "bg-primary text-primary-content shadow-sm shadow-primary/20"
                    : "bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content"
                }`}
              >
                <Icon size={13} strokeWidth={2} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Personal & Freelance */}
        {showFreelance && (
          <div className="mb-14">
            <GroupHeading
              icon={Briefcase}
              title="Personal & Freelance"
              description="Independent client work, collaborations, and self-initiated builds"
              count={experienceProjects.length}
              color="bg-warning/15 text-warning"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {freelanceList.map((project, i) => (
                <ProjectCard key={i} {...project} />
              ))}
            </div>
          </div>
        )}

        {/* Academic */}
        {showAcademic && (
          <div className="mb-14">
            <GroupHeading
              icon={GraduationCap}
              title="Academic Projects"
              description="University coursework, capstone, and learning-driven builds"
              count={academicProjects.length}
              color="bg-info/15 text-info"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {academicList.map((project, i) => (
                <ProjectCard key={i} {...project} />
              ))}
            </div>
          </div>
        )}

        {/* Stats bar */}
        <div className="rounded-2xl border border-base-content/10 bg-base-100/60 p-4 sm:p-6 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            {[
              {
                value: allProjects.length,
                label: "Total Projects",
                color: "text-primary",
              },
              {
                value: experienceProjects.length,
                label: "Personal & Freelance",
                color: "text-warning",
              },
              {
                value: academicProjects.length,
                label: "Academic",
                color: "text-info",
              },
              {
                value: liveCount,
                label: "Live Demos",
                color: "text-success",
              },
            ].map(({ value, label, color }) => (
              <div key={label} className="space-y-1">
                <div className={`text-3xl font-bold ${color}`}>{value}</div>
                <div className="text-xs uppercase tracking-wider text-base-content/50">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
