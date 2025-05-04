import { SectionTitle } from "../SectionTitle";
import { ProjectCard } from "./ProjectCard";
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
  return (
    <div className="container min-h-screen">
      <SectionTitle id="projects" title="Projects" />

      <div className="flex flex-wrap justify-center gap-6 py-6 md:gap-8">
        <ProjectCard
          projectImg={pokemon}
          projectDetail={"IT142 WEEKLY PROJECT"}
          projectTitle={"MiniPokedex with Battle Simulation"}
          projectRole={"Individual Project"}
          link={"https://github.com/larenzzx/reactPokedex.git"}
          liveView={false}
          techStack={[react, tailwind]}
        />

        <ProjectCard
          projectImg={todo}
          projectDetail={"IT142 WEEKLY PROJECT"}
          projectTitle={"ReactJS Todo-list"}
          projectRole={"Individual Project"}
          link={"https://github.com/larenzzx/react-Todolist.git"}
          liveView={true}
          liveLink={"https://larenzzx-react-todolist.netlify.app/"}
          techStack={[react, tailwind]}
        />

        <ProjectCard
          projectImg={capstone}
          projectTitle={"One Zamboanga: Evacuation Center Management System"}
          projectRole={"Role: Full-stack Developer"}
          link={"https://github.com/larenzzx/oneZamboanga_capstone"}
          liveView={false}
          techStack={[html, css, js, php, mysql]}
        />

        <ProjectCard
          projectImg={elective}
          projectDetail={"IT ELECTIVE 4 PROJECT"}
          projectTitle={"Portfolio Website"}
          projectRole={"Individual Project"}
          link={"https://github.com/larenzzx/tabotabo_portfolioWebsite"}
          liveView={true}
          liveLink={"https://larenzzx.github.io/tabotabo_portfolioWebsite/"}
          techStack={[html, css, js]}
        />

        <ProjectCard
          projectImg={se}
          projectDetail={"Software Engineering Project"}
          projectTitle={"WESMAARDEC Event Management System"}
          projectRole={"Role: Full-stack Developer"}
          link={
            "https://github.com/larenzzx/WESMAARDEC-Event-Management-System"
          }
          liveView={false}
          techStack={[html, css, js, php, mysql]}
        />

        <ProjectCard
          projectImg={ml}
          projectDetail={"IT ELECTIVE 3 PROJECT"}
          projectTitle={"Sleepwell Hub"}
          projectRole={"Role: Back-end Developer"}
          link={"https://github.com/larenzzx/Sleepwell-Hub"}
          liveView={false}
          techStack={[html, css, js, django]}
        />

        <ProjectCard
          projectImg={ecom}
          projectDetail={"IT ELECTIVE 2 PROJECT"}
          projectTitle={"ECOVARIETY"}
          projectRole={"Role: Front-end Developer"}
          link={"https://github.com/larenzzx/Ecovariety"}
          liveView={false}
          techStack={[html, css, js]}
        />

        <ProjectCard
          projectImg={crimson}
          projectDetail={"Advance Database Project"}
          projectTitle={"CrimsonQuest"}
          projectRole={"Role: Full-stack Developer"}
          link={"https://github.com/larenzzx/CrimsonQuest"}
          liveView={false}
          techStack={[html, css, js, php, mysql]}
        />
      </div>
    </div>
  );
};
