import { useState, useEffect } from "react";
import { Briefcase, GraduationCap, LayoutGrid, LucideIcon } from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import { ProjectCard } from "./ProjectCard";
import {
  allProjects,
  fetchProjectsFromSupabase
} from "./projectData";

interface GroupHeadingProps {
  icon: LucideIcon;
  title: string;
  description: string;
  count: number;
  color: string;
}

const GroupHeading = ({ icon: Icon, title, description, count, color }: GroupHeadingProps) => (
  <div className="mb-8 flex items-center gap-4">
    <div
      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${color}`}
    >
      <Icon size={18} strokeWidth={1.8} />
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-bold text-ink sm:text-lg font-serif">
          {title}
        </h3>
        <span className="border border-gray-200 dark:border-gray-800 bg-bg px-2 py-0.5 rounded text-[9px] font-mono text-gray-400">
          {count} projects
        </span>
      </div>
      <p className="mt-0.5 text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

const TABS = [
  { id: "all", label: "All", Icon: LayoutGrid },
  { id: "freelance", label: "Personal & Freelance", Icon: Briefcase },
  { id: "academic", label: "Academic", Icon: GraduationCap },
] as const;

type TabId = typeof TABS[number]["id"];

export const Projects = () => {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [projectList, setProjectList] = useState(allProjects);

  useEffect(() => {
    fetchProjectsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        setProjectList(data);
      }
    });
  }, []);

  const freelanceProjectsList = projectList.filter((project) => project.group === "freelance");
  const academicProjectsList = projectList.filter((project) => project.group === "academic");

  const liveCount = projectList.filter((project) => project.liveView).length;
  const showFreelance = activeTab === "all" || activeTab === "freelance";
  const showAcademic = activeTab === "all" || activeTab === "academic";

  const freelanceList =
    activeTab === "all"
      ? freelanceProjectsList
      : projectList.filter((project) => project.group === "freelance");

  const academicList =
    activeTab === "all"
      ? academicProjectsList
      : projectList.filter((project) => project.group === "academic");

  return (
    <section className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg px-5 py-10 shadow-sm sm:px-8 lg:px-10">
      <SectionTitle id="projects" title="Projects" />

      {/* Tabs */}
      <div className="no-scrollbar -mx-4 mb-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 border ${
                activeTab === id
                  ? "bg-build text-bg font-semibold"
                  : "border-gray-200 dark:border-gray-800 bg-bg text-gray-500 hover:bg-gray-100/70 hover:text-ink"
              }`}
            >
              <Icon size={13} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Freelance & Personal Section */}
      {showFreelance && (
        <div className="mb-14">
          <GroupHeading
            icon={Briefcase}
            title="Personal & Freelance"
            description="Independent client work, collaborations, and self-initiated builds"
            count={freelanceProjectsList.length}
            color="bg-build/5 text-build border-build/20"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {freelanceList.map((project, index) => (
              <ProjectCard key={project.slug} index={index} {...project} />
            ))}
          </div>
        </div>
      )}

      {/* Academic Section */}
      {showAcademic && (
        <div className="mb-14">
          <GroupHeading
            icon={GraduationCap}
            title="Academic Projects"
            description="University coursework, capstone, and learning-driven builds"
            count={academicProjectsList.length}
            color="bg-support/5 text-support border-support/20"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {academicList.map((project, index) => (
              <ProjectCard key={project.slug} index={index} {...project} />
            ))}
          </div>
        </div>
      )}

      {/* Metrics Footer */}
      <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/10 dark:bg-gray-950/5 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {[
            {
              value: projectList.length,
              label: "Total Projects",
              color: "text-ink",
            },
            {
              value: freelanceProjectsList.length,
              label: "Personal & Freelance",
              color: "text-build",
            },
            {
              value: academicProjectsList.length,
              label: "Academic",
              color: "text-support",
            },
            {
              value: liveCount,
              label: "Live Demos",
              color: "text-defend",
            },
          ].map(({ value, label, color }) => (
            <div key={label} className="space-y-1">
              <div className={`text-2xl font-bold font-serif ${color}`}>{value}</div>
              <div className="text-[9px] uppercase font-mono tracking-widest text-gray-400">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
