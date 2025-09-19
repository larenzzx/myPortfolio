import { SectionTitle } from "../SectionTitle";
import { ProjectCard } from "./ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

import emailTemp from "../../assets/htmlEmail.svg";
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

export const Projects = () => {
  const experienceProjects = [
    {
      projectImg: emailTemp, 
      projectTitle: "Email Templates",
      projectRole: "Email Template",
      category: "Self-Learning",
      year: "2025",
      link: "https://github.com/larenzzx/htmlEmailSample", 
      liveView: true,
      liveLink: "https://htmlemaplesample.netlify.app/",
      techStack: [html, css],
      isExperience: true,
    },
    {
      projectImg: ziara, 
      projectTitle: "Client Portfolio",
      projectRole: "Frontend Developer",
      category: "Freelance Project",
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
      category: "Freelance Project",
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
      category: "Freelance Project",
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
      category: "Freelance Project",
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
      category: "Freelance Project",
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
      category: "Freelance Project",
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
      category: "Personal Project",
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
      category: "Personal Project",
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
      projectRole: "Frontend Developer",
      category: "Capstone Project",
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
      category: "IT142 Project",
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
      category: "IT142 Project",
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
      projectRole: "Frontend Developer",
      category: "Software Engineering",
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
      projectRole: "Frontend Developer",
      category: "Database Project",
      year: "2023",
      link: "https://github.com/larenzzx/CrimsonQuest",
      liveView: false,
      techStack: [html, css, js, php, mysql],
      isExperience: false,
    },
  ];

  return (
    <div className="container min-h-screen bg-gradient-to-br from-base-100 via-base-200/20 to-base-100">
      <div className="container mx-auto px-4 py-20">
        <SectionTitle id="projects" title="Experience & Projects" />

        {/* Personal & Freelance Section */}
        <div className="mb-16 mt-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="text-lg text-white"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-xl md:text-2xl font-bold">
                Personal & Freelance Projects
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-base-content">
                Independent projects, client work, and freelance collaborations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {experienceProjects.map((project, index) => (
              <ProjectCard
                key={index}
                projectImg={project.projectImg}
                projectTitle={project.projectTitle}
                projectRole={project.projectRole}
                link={project.link}
                liveView={project.liveView}
                liveLink={project.liveLink}
                techStack={project.techStack}
                category={project.category}
                year={project.year}
                isExperience={project.isExperience}
              />
            ))}
          </div>
        </div>

        {/* Academic Projects Section */}
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-content">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-lg text-white"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-xl md:text-2xl font-bold">
                Academic Projects
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-base-content">
                University coursework and learning projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {academicProjects.map((project, index) => (
              <ProjectCard
                key={index}
                projectImg={project.projectImg}
                projectTitle={project.projectTitle}
                projectRole={project.projectRole}
                link={project.link}
                liveView={project.liveView}
                liveLink={project.liveLink}
                techStack={project.techStack}
                category={project.category}
                year={project.year}
                isExperience={project.isExperience}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 rounded-2xl border border-base-content/10 bg-base-content/5 p-8 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {experienceProjects.length + academicProjects.length}
              </div>
              <div className="text-sm uppercase tracking-wider">
                Total Projects
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-400">
                {experienceProjects.length}
              </div>
              <div className="text-sm uppercase tracking-wider">
                Personal & Freelance
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">
                {academicProjects.length}
              </div>
              <div className="text-sm uppercase tracking-wider">
                Academic
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">
                {
                  [...experienceProjects, ...academicProjects].filter(
                    (project) => project.liveView,
                  ).length
                }
              </div>
              <div className="text-sm uppercase tracking-wider">
                Live Demos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
