import { FileText, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface CaseStudy {
  problem?: string;
  outcome?: string;
}

interface ProjectCardProps {
  projectImg: string;
  projectTitle: string;
  projectRole: string;
  link?: string;
  liveView: boolean;
  liveLink?: string;
  techNames?: string[];
  category: string;
  year?: string;
  isExperience?: boolean;
  slug?: string;
  index?: number;
  caseStudy?: CaseStudy;
}

export const ProjectCard = ({
  projectImg,
  projectTitle,
  projectRole,
  link,
  liveView,
  liveLink,
  techNames = [],
  category,
  year,
  isExperience = false,
  slug,
  index = 0,
  caseStudy,
}: ProjectCardProps) => {
  return (
    <div
      className="intersect-once h-full intersect:motion-translate-y-in-[18px] intersect:motion-duration-[0.55s] intersect:motion-ease-spring-smooth"
      style={{ animationDelay: `${Math.min(index * 60, 300)}ms` }}
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-bg transition-all duration-300 hover:border-build/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(var(--accent-build),0.02)]">
        {/* Minimal Thumbnail Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-50/50 dark:bg-gray-950/20 border-b border-gray-200/50 dark:border-gray-800/50">
          <img
            src={projectImg}
            alt={projectTitle}
            className="h-full w-full object-cover grayscale opacity-70 transition-all duration-500 ease-spring group-hover:scale-[1.015] group-hover:grayscale-0 group-hover:opacity-100"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/15 via-transparent to-transparent opacity-60" />
        </div>

        {/* Info Block */}
        <div className="flex flex-1 flex-col p-5">
          {/* Category & Year Row */}
          <div className="flex items-center justify-between text-[9px] font-mono font-semibold uppercase tracking-widest text-gray-400">
            <span>
              {category}
              {isExperience && <span className="text-build"> / Featured</span>}
            </span>
            {year && <span>{year}</span>}
          </div>

          {/* Project Title */}
          <h3 className="mt-2 text-base font-bold tracking-tight text-ink font-serif group-hover:text-build transition-colors duration-250">
            {projectTitle}
          </h3>

          {/* Project Role Subtitle */}
          <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold">
            {projectRole}
          </p>

          {/* Project Outcome Summary */}
          {caseStudy?.outcome && (
            <p className="mt-2.5 line-clamp-2 text-xs text-gray-500/90 leading-relaxed font-sans">
              {caseStudy.outcome}
            </p>
          )}

          <div className="flex-1 min-h-[1.5rem]" />

          {/* Tech Stack Comma-List */}
          {techNames.length > 0 && (
            <div className="mb-4 text-[9px] font-mono text-gray-400 border-t border-gray-100 dark:border-gray-900/60 pt-3">
              {techNames.slice(0, 5).join("  •  ")}
            </div>
          )}

          {/* Minimal Action Controls */}
          <div className="grid gap-1.5">
            {slug && (
              <Button asChild size="sm" className="w-full gap-1.5">
                <Link to={`/projects/${slug}`}>
                  <FileText size={12} strokeWidth={2} />
                  Details
                </Link>
              </Button>
            )}

            <div className="grid grid-cols-2 gap-1.5">
              {link ? (
                <Button variant="outline" size="xs" asChild className="w-full gap-1.5 px-2">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} className="shrink-0 text-[10px]" />
                    <span className="truncate">Code</span>
                  </a>
                </Button>
              ) : (
                <span className="flex h-8 items-center justify-center rounded-lg bg-gray-50/50 dark:bg-gray-900/50 text-gray-400 border border-transparent text-[10px] font-mono w-full pointer-events-none opacity-40 select-none">
                  No Code
                </span>
              )}

              {liveView && liveLink ? (
                <Button variant="build" size="xs" asChild className="w-full gap-1.5 px-2">
                  <a href={liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={12} strokeWidth={2} className="shrink-0" />
                    <span className="truncate">Live Demo</span>
                  </a>
                </Button>
              ) : (
                <span className="flex h-8 items-center justify-center rounded-lg bg-gray-50/50 dark:bg-gray-900/50 text-gray-400 border border-transparent text-[10px] font-mono w-full pointer-events-none opacity-40 select-none">
                  No Demo
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
