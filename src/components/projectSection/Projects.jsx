import { SectionTitle } from "../SectionTitle";
import { ProjectCard } from "./ProjectCard";
import capstone from "../../assets/capstone.svg";
import elective from "../../assets/elective.svg";
import se from "../../assets/SE.svg";
import ml from "../../assets/ml.svg";
import ecom from "../../assets/ecommerce.svg";
import crimson from "../../assets/crimsonquest.svg";

export const Projects = () => {
  return (
    <div className="container min-h-screen">
      <SectionTitle id="projects" title="Projects" />

      <div className="flex flex-wrap justify-center gap-6 py-6 md:gap-8">
        <ProjectCard
          projectImg={capstone}
          projectDetail={"Capstone Project"}
          projectTitle={"One Zamboanga: Evacuation Center Management System"}
          projectRole={"Role: Full-stack Developer"}
          link={"https://github.com/larenzzx/oneZamboanga_capstone"}
          liveView={false}
        />

        <ProjectCard
          projectImg={elective}
          projectDetail={"IT ELECTIVE 4 PROJECT"}
          projectTitle={"Portfolio Website"}
          projectRole={"Individual Project"}
          link={"https://github.com/larenzzx/tabotabo_portfolioWebsite"}
          liveView={true}
          liveLink={"https://larenzzx.github.io/tabotabo_portfolioWebsite/"}
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
        />

        <ProjectCard
          projectImg={ml}
          projectDetail={"IT ELECTIVE 3 PROJECT"}
          projectTitle={"Sleepwell Hub"}
          projectRole={"Role: Back-end Developer"}
          link={"https://github.com/larenzzx/Sleepwell-Hub"}
          liveView={false}
        />

        <ProjectCard
          projectImg={ecom}
          projectDetail={"IT ELECTIVE 2 PROJECT"}
          projectTitle={"ECOVARIETY"}
          projectRole={"Role: Front-end Developer"}
          link={"https://github.com/larenzzx/Ecovariety"}
          liveView={false}
        />

        <ProjectCard
          projectImg={crimson}
          projectDetail={"Advance Database Project"}
          projectTitle={"CrimsonQuest"}
          projectRole={"Role: Full-stack Developer"}
          link={"https://github.com/larenzzx/CrimsonQuest"}
          liveView={false}
        />
      </div>
    </div>
  );
};
