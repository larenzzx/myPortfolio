import { SectionTitle } from "../SectionTitle";
import { ProjectCard } from "./ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

import capstone from "../../assets/capstone.svg";
import elective from "../../assets/elective.svg";
import se from "../../assets/SE.svg";
import ml from "../../assets/ml.svg";
import ecom from "../../assets/ecommerce.svg";
import crimson from "../../assets/crimsonquest.svg";
import todo from "../../assets/todolist.svg";
import pokemon from "../../assets/pokemon.svg";
import html from "../../assets/html5.svg";
import css from "../../assets/css.svg";
import js from "../../assets/javascript.svg";
import php from "../../assets/php.svg";
import mysql from "../../assets/mysql.svg";
import django from "../../assets/django.svg";
import tailwind from "../../assets/tailwindcss.svg";
import react from "../../assets/react_dark.svg";

export const Projects = () => {
  const experienceProjects = [
    {
      projectImg: todo, 
      projectTitle: "Client Portfolio Websites & Web Apps",
      projectRole: "Freelance Frontend Developer",
      category: "Professional",
      year: "2025",
      link: "https://github.com/larenzzx/react-Todolist.git",
      liveView: true,
      liveLink: "https://larenzzx-react-todolist.netlify.app/",
      techStack: [react, tailwind],
      isExperience: true,
    },
    {
      projectImg: pokemon, 
      projectTitle: "Responsive Email Templates",
      projectRole: "Email Template Developer",
      category: "Self-Learning",
      year: "2025",
      link: "https://github.com/larenzzx/email-templates", 
      liveView: false,
      techStack: [html, css],
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
      projectTitle: "MiniPokedex with Battle Simulation",
      projectRole: "Individual Project",
      category: "IT142 Weekly Project",
      year: "2025",
      link: "https://github.com/larenzzx/reactPokedex.git",
      liveView: false,
      techStack: [react, tailwind],
      isExperience: false,
    },
    {
      projectImg: todo,
      projectTitle: "ReactJS Todo-list",
      projectRole: "Individual Project",
      category: "IT142 Weekly Project",
      year: "2025",
      link: "https://github.com/larenzzx/react-Todolist.git",
      liveView: true,
      liveLink: "https://larenzzx-react-todolist.netlify.app/",
      techStack: [react, tailwind],
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
      projectImg: ml,
      projectTitle: "Sleepwell Hub",
      projectRole: "Backend Developer",
      category: "IT Elective 3",
      year: "2024",
      link: "https://github.com/larenzzx/Sleepwell-Hub",
      liveView: false,
      techStack: [html, css, js, django],
      isExperience: false,
    },
    {
      projectImg: ecom,
      projectTitle: "ECOVARIETY E-commerce Plant Store",
      projectRole: "Frontend Developer",
      category: "IT Elective 2",
      year: "2023",
      link: "https://github.com/larenzzx/Ecovariety",
      liveView: false,
      techStack: [html, css, js],
      isExperience: false,
    },
    {
      projectImg: crimson,
      projectTitle: "CrimsonQuest - Campus Directory",
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
              <h3 className="text-2xl font-bold">
                Personal & Freelance Projects
              </h3>
              <p className="text-base-content">
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
              <h3 className="text-2xl font-bold">
                Academic Projects
              </h3>
              <p className="text-base-content">
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
        {/* <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {experienceProjects.length + academicProjects.length}
              </div>
              <div className="text-sm uppercase tracking-wider text-white/70">
                Total Projects
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-400">
                {experienceProjects.length}
              </div>
              <div className="text-sm uppercase tracking-wider text-white/70">
                Professional
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">
                {academicProjects.length}
              </div>
              <div className="text-sm uppercase tracking-wider text-white/70">
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
              <div className="text-sm uppercase tracking-wider text-white/70">
                Live Demos
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
