import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faBriefcase,
  faGraduationCap,
  faUser,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { LiveView } from "./LiveView";
import { ObserverProvider } from "../ObserverProvider";

export const ProjectCard = ({
  projectImg,
  projectTitle,
  projectRole,
  link,
  liveView,
  liveLink,
  techStack,
  category,
  year,
  isExperience = false,
}) => {
  return (
    <ObserverProvider>
      <div className="intersect-once group intersect:motion-translate-y-in-100 intersect:motion-duration-[1.5s] intersect:motion-ease-spring-smooth">
        <div className="relative h-full overflow-hidden rounded-2xl border border-base-300/50 bg-base-200/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20">
          {/* Category Badge */}
          <div className="absolute left-4 top-4 z-10">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                isExperience
                  ? "border-warning/30 bg-warning/20 text-warning-content"
                  : "border-info/30 bg-info/20 text-info-content"
              }`}
            >
              <FontAwesomeIcon
                icon={isExperience ? faBriefcase : faGraduationCap}
                className="text-xs"
              />
              {category}
            </span>
          </div>

          {/* Year Badge */}
          {year && (
            <div className="absolute right-4 top-4 z-10">
              <span className="inline-flex items-center gap-1 rounded-lg border border-base-300/50 bg-base-300/50 px-2 py-1 text-xs text-base-content/90 backdrop-blur-sm">
                <FontAwesomeIcon icon={faCalendar} className="text-xs" />
                {year}
              </span>
            </div>
          )}

          {/* Image with Overlay */}
          <div className="relative overflow-hidden">
            <img
              className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={projectImg}
              alt={projectTitle}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-300/80 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="space-y-4 p-6">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3">
              {techStack?.map((tech, index) => (
                <div key={index} className="group/tech relative">
                  <div className="h-8 w-8 rounded-lg border border-base-300/50 bg-base-200/50 p-1.5 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-primary/10">
                    <img
                      src={tech}
                      className="h-full w-full object-contain"
                      alt="Technology"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Title and Role */}
            <div className="space-y-2">
              <h3 className="line-clamp-2 text-lg font-semibold text-base-content transition-colors duration-300 group-hover:text-primary">
                {projectTitle}
              </h3>
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <FontAwesomeIcon icon={faUser} className="text-xs" />
                <span>{projectRole}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-base-300/50 pt-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/github btn btn-outline btn-neutral btn-sm gap-2 transition-all duration-300 hover:scale-105"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="transition-transform duration-300 group-hover/github:rotate-12"
                />
                GitHub
              </a>

              <LiveView isLiveView={liveView} links={liveLink} />
            </div>
          </div>
        </div>
      </div>
    </ObserverProvider>
  );
};
