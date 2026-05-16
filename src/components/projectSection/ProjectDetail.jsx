import { ExternalLink, Github, Layers3, MoveLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { SectionTitle } from "../SectionTitle";
import { getProjectBySlug } from "./projectData";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <section className="rounded-3xl border border-base-content/10 bg-base-100 px-5 py-10 shadow-sm sm:px-8 lg:px-10">
        <SectionTitle title="Project Not Found" eyebrow="projects" />
        <Link to="/projects" className="btn btn-primary rounded-xl">
          <MoveLeft size={16} />
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-base-content/10 bg-base-100 px-5 py-10 shadow-sm sm:px-8 lg:px-10">
      <SectionTitle title={project.projectTitle} eyebrow="project-detail" />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-200/60">
          <img
            src={project.projectImg}
            alt={project.projectTitle}
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-primary badge-sm">{project.category}</span>
              {project.year && (
                <span className="badge badge-outline badge-sm">{project.year}</span>
              )}
              <span className="badge badge-outline badge-sm">
                {project.projectRole}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-base-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
                  Role
                </p>
                <p className="mt-2 text-sm font-semibold text-base-content">
                  {project.projectRole}
                </p>
              </div>
              <div className="rounded-2xl bg-base-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
                  Type
                </p>
                <p className="mt-2 text-sm font-semibold text-base-content">
                  {project.category}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
                Stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techNames?.map((name) => (
                  <span key={name} className="badge badge-outline">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-base-content/10 bg-base-200/60 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Layers3 size={18} />
              </div>
              <div>
                <p className="text-xs text-base-content/45">Project</p>
                <p className="text-sm font-bold text-base-content">
                  {project.projectTitle}
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm w-full rounded-xl"
                >
                  <Github size={15} />
                  View Code
                </a>
              )}
              {project.liveView && project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm w-full rounded-xl"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
              <Link to="/projects" className="btn btn-ghost btn-sm w-full rounded-xl">
                <MoveLeft size={15} />
                All Projects
              </Link>
            </div>
          </div>

          {project.caseStudy && (
            <div className="rounded-2xl border border-base-content/10 bg-base-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
                Case Study Notes
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-bold text-base-content">Problem</p>
                  <p className="mt-1 text-sm leading-relaxed text-base-content/65">
                    {project.caseStudy.problem}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-base-content">Outcome</p>
                  <p className="mt-1 text-sm leading-relaxed text-base-content/65">
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
