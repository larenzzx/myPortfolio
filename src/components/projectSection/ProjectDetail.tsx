import { useState, useEffect } from "react";
import { ExternalLink, Github, Layers3, MoveLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { SectionTitle } from "../SectionTitle";
import { getProjectBySlug, fetchProjectsFromSupabase } from "./projectData";
import { Button } from "@/components/ui/button";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(() => getProjectBySlug(slug));
  const [loading, setLoading] = useState(!project);

  useEffect(() => {
    fetchProjectsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        const found = data.find((p) => p.slug === slug);
        if (found) {
          setProject(found);
        }
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <section className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg px-5 py-20 shadow-sm flex justify-center items-center">
        <span className="h-8 w-8 border-2 border-build border-t-transparent rounded-full animate-spin"></span>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg px-5 py-10 shadow-sm sm:px-8 lg:px-10">
        <SectionTitle title="Project Not Found" eyebrow="projects" />
        <Button variant="outline" size="sm" asChild className="w-fit">
          <Link to="/projects">
            <MoveLeft size={14} className="mr-1.5" />
            Back to Projects
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg px-5 py-10 shadow-sm sm:px-8 lg:px-10">
      <SectionTitle title={project.projectTitle} eyebrow="project-detail" />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/15 dark:bg-gray-950/5">
          <img
            src={project.projectImg}
            alt={project.projectTitle}
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              <span className="border border-build/20 bg-build/5 text-build px-2.5 py-1 rounded-md text-xs font-mono">{project.category}</span>
              {project.year && (
                <span className="border border-gray-200 dark:border-gray-800 bg-bg text-gray-500 px-2.5 py-1 rounded-md text-xs font-mono">{project.year}</span>
              )}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200/40 dark:border-gray-800/40 bg-bg p-4">
                <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                  Type
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {project.category}
                </p>
              </div>
              {project.year && (
                <div className="rounded-2xl border border-gray-200/40 dark:border-gray-800/40 bg-bg p-4">
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                    Year
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {project.year}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                Stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techNames?.map((name) => (
                  <span key={name} className="border border-gray-200 dark:border-gray-800 bg-bg px-2 py-0.5 rounded text-[10px] font-mono text-gray-400">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/15 dark:bg-gray-950/5 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-build/15 bg-build/5 text-build">
                <Layers3 size={18} />
              </div>
              <div>
                <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">Project</p>
                <p className="text-sm font-bold text-ink font-serif">
                  {project.projectTitle}
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              {project.link && (
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={14} className="mr-1.5" />
                    View Code
                  </a>
                </Button>
              )}
              {project.liveView && project.liveLink && (
                <Button variant="build" size="sm" asChild className="w-full">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} className="mr-1.5" />
                    Live Demo
                  </a>
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link to="/projects">
                  <MoveLeft size={14} className="mr-1.5" />
                  All Projects
                </Link>
              </Button>
            </div>
          </div>

          {project.caseStudy && (
            <div className="rounded-2xl border border-gray-200/40 dark:border-gray-800/40 bg-bg p-5">
              <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                Case Study Notes
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-bold text-ink font-serif">Problem</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {project.caseStudy.problem}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-ink font-serif">Outcome</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {project.caseStudy.outcome}
                  </p>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};
