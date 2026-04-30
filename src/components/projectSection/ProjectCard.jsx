import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ExternalLink } from "lucide-react";

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
  index = 0,
}) => {
  return (
    <div
      className="intersect-once h-full intersect:motion-translate-y-in-[18px] intersect:motion-duration-[0.55s] intersect:motion-ease-spring-smooth"
      style={{ animationDelay: `${Math.min(index * 60, 300)}ms` }}
    >
      <div className="group relative flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-out will-change-transform hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
        <div className="relative aspect-[16/10] overflow-hidden bg-base-200">
          <img
            src={projectImg}
            alt={projectTitle}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-300/70 via-base-300/10 to-transparent" />
          <div className="absolute inset-0 bg-primary/0 transition-colors duration-200 ease-out group-hover:bg-primary/[0.04]" />

          <span
            className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${
              isExperience
                ? "bg-warning/85 text-warning-content"
                : "bg-info/85 text-info-content"
            }`}
          >
            {category}
          </span>

          {year && (
            <span className="absolute right-3 top-3 rounded-lg bg-base-300/70 px-2 py-1 text-xs font-mono text-base-content/80 backdrop-blur-sm">
              {year}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="line-clamp-2 text-base font-bold leading-snug text-base-content transition-colors duration-200 group-hover:text-primary">
              {projectTitle}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-base-content/50">
              <FontAwesomeIcon icon={faUser} className="text-[10px]" />
              <span>{projectRole}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {techStack?.map((tech, i) => (
              <div
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-base-content/10 bg-base-200 p-1 transition-colors duration-150 hover:border-primary/30 hover:bg-primary/5"
              >
                <img
                  src={tech}
                  className="h-full w-full object-contain"
                  alt="tech"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2 border-t border-base-content/8 pt-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm flex-1 gap-1.5 transition-colors duration-150"
            >
              <FontAwesomeIcon icon={faGithub} />
              Code
            </a>

            {liveView ? (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm flex-1 gap-1.5 transition-colors duration-150"
              >
                <ExternalLink size={13} strokeWidth={2} />
                Live Demo
              </a>
            ) : (
              <span className="btn btn-sm pointer-events-none flex-1 cursor-default opacity-40 btn-ghost">
                No Demo
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
