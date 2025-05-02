import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { LiveView } from "./LiveView";
import { ObserverProvider } from "../ObserverProvider";
import html from "../../assets/html5.svg";
import css from "../../assets/css_old.svg";




export const ProjectCard = ({
  projectImg,
  projectTitle,
  projectRole,
  link,
  liveView,
  liveLink,
  techStack,
}) => {


  return (
    <ObserverProvider>
      <div className="intersect-once card glass w-96 intersect:motion-translate-y-in-100 intersect:motion-duration-[2s] intersect:motion-ease-spring-smooth hover:scale-105 duration-300 ease-in-out">
        <figure>
          <img className="h-56 w-96 object-cover" src={projectImg} alt="" />
        </figure>
        <div className="card-body">
          <div className="border">
            {techStack?.map((tech, index) => (
              <img key={index} src={tech} className="badge rounded-none bg-transparent border-none" alt="Tech" />
            ))}
          </div>
          <h2 className="card-title text-sm sm:text-base md:text-xl">
            {projectTitle}
          </h2>
          <p className="text-xs sm:text-sm md:text-base">{projectRole}</p>
          <div className="card-actions justify-end">
            <a
              href={link}
              className="badge badge-outline flex items-center justify-center gap-x-1 py-3"
            >
              <FontAwesomeIcon icon={faGithub} />
              GitHub
            </a>

            <LiveView isLiveView={liveView} links={liveLink} />
          </div>
        </div>
      </div>
    </ObserverProvider>
  );
};
