import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Database,
  FileCheck2,
  Layers3,
  Mail,
  MapPin,
  MonitorCog,
  ShieldCheck,
  UserRound,
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";
import TypingAnimation from "./hero/TypingAnimation";
import { ProjectCard } from "./projectSection/ProjectCard";
import { featuredProject } from "./projectSection/projectData";

const overviewCards = [
  {
    label: "Current Role",
    value: "SOC Analyst L1",
    detail: "Aetas Security",
    Icon: ShieldCheck,
    tone: "text-success bg-success/10 border-success/20",
  },
  {
    label: "Development Work",
    value: "Freelance Web Developer",
    detail: "Full-stack, frontend, maintenance, and deployment",
    Icon: Code2,
    tone: "text-primary bg-primary/10 border-primary/20",
  },
  {
    label: "Location",
    value: "Zamboanga City, Philippines",
    detail: "Remote-ready workflow",
    Icon: MapPin,
    tone: "text-info bg-info/10 border-info/20",
  },
];

const workspaceLinks = [
  {
    label: "About",
    description: "Profile, background, and social links",
    path: "/about",
    Icon: UserRound,
  },
  {
    label: "Experience",
    description: "SOC, freelance, and IT work history",
    path: "/experience",
    Icon: BriefcaseBusiness,
  },
  {
    label: "Skills",
    description: "Frontend, backend, cybersecurity, and IT tools",
    path: "/skills",
    Icon: Code2,
  },
  {
    label: "Projects",
    description: "Freelance, personal, and academic builds",
    path: "/projects",
    Icon: Layers3,
  },
  {
    label: "Certificates",
    description: "Web development, cybersecurity, IT, and AI certificates",
    path: "/certificates",
    Icon: Award,
  },
  {
    label: "Contact",
    description: "Email, socials, and message form",
    path: "/contact",
    Icon: Mail,
  },
];

const valueCards = [
  {
    title: "Build",
    label: "Web Development",
    description:
      "Full-stack web development, responsive interfaces, user-friendly designs, deployment, and bug fixes. Occasionally taking freelance projects.",
    Icon: Code2,
  },
  {
    title: "Defend",
    label: "SOC Analyst",
    description:
      "Threat monitoring, incident response, security alert triage, Wazuh, Microsoft Defender for Endpoint, Qualys VMDR, and OSINT tools.",
    Icon: ShieldCheck,
  },
  {
    title: "Support",
    label: "IT Operations",
    description:
      "User provisioning, Intune device management, VM setup via Entra ID, Exchange, SharePoint, Datto RMM, OS configuration, hardware, LAN, and networking.",
    Icon: MonitorCog,
  },
];

const focusItems = [
  { label: "Frontend", value: "React, Tailwind CSS, JavaScript", Icon: Code2 },
  { label: "Backend", value: "Python, Django, PostgreSQL, PHP, MySQL", Icon: Database },
  { label: "Credentials", value: "Web development, cybersecurity, IT, and AI certificates", Icon: FileCheck2 },
];

export const Home = () => {
  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-sm">
        <div className="absolute inset-0 hero-grid-bg opacity-20" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="relative grid gap-6 p-5 sm:p-8 2xl:grid-cols-[minmax(0,1fr)_24rem] xl:p-8 2xl:p-10">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 font-mono text-xs font-semibold text-primary">
                <Code2 size={14} />
                &lt; Web Developer /&gt;
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-secondary/20 bg-secondary/10 px-3 py-2 font-mono text-xs font-semibold text-secondary">
                <ShieldCheck size={14} />
                [ SOC Analyst ]
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-3 py-2 font-mono text-xs font-semibold text-accent">
                <Cpu size={14} />
                [ AI Enthusiast ]
              </span>
            </div>

            <h1 className="max-w-4xl text-2xl font-black leading-[1.25] tracking-tight text-base-content sm:text-3xl md:text-5xl xl:text-6xl">
              I build <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">web applications</span>.
              <br />
              I automate <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">workflows</span>.
            </h1>

            <div className="mt-5 flex min-h-10 items-center gap-x-2 text-lg font-bold sm:text-xl xl:text-xl 2xl:text-2xl">
              <span className="text-base-content/55">I&apos;m</span>
              <TypingAnimation />
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-base-content/65 sm:text-lg">
              Developer and SOC Analyst L1 with a growing passion for AI infrastructure, automation, and building smarter systems.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="btn btn-primary rounded-xl">
                View Projects
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline rounded-xl">
                Contact
                <Mail size={16} />
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-base-content/10 bg-base-200/70 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
              Profile Summary
            </p>
            <h2 className="mt-3 text-2xl font-bold text-base-content">
              Mark Larenz Tabotabo
            </h2>
            <p className="mt-2 text-sm text-base-content/60">
              Freelance Web Developer & Cybersecurity Analyst
            </p>

            <div className="mt-6 grid gap-3">
              {overviewCards.map(({ label, value, detail, Icon, tone }) => (
                <div
                  key={label}
                  className="rounded-xl border border-base-content/10 bg-base-100 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-xl border p-2 ${tone}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/45">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-base-content">
                        {value}
                      </p>
                      <p className="mt-1 text-xs text-base-content/50">{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-3xl border border-base-content/10 bg-base-100 p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
              What I Know
            </p>
            <h2 className="mt-2 text-2xl font-bold text-base-content">
              Skills across development, security, and IT
            </h2>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {valueCards.map(({ title, label, description, Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-base-content/10 bg-base-200/50 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <span className="rounded-lg bg-base-100 px-2 py-1 text-xs font-semibold text-base-content/50">
                    {title}
                  </span>
                </div>
                <h3 className="font-bold text-base-content">{label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-base-content/10 bg-base-100 p-4 sm:p-5 shadow-sm lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
            Focus Stack
          </p>
          <div className="mt-5 grid gap-3">
            {focusItems.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="flex gap-3 rounded-2xl bg-base-200/60 p-4"
              >
                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-base-100 text-primary">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-xs text-base-content/45">{label}</p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-base-content">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-base-content/10 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
              Featured Project
            </p>
            <h2 className="mt-2 text-2xl font-bold text-base-content">
              {featuredProject.projectTitle}
            </h2>
          </div>
          <Link to="/projects" className="btn btn-outline btn-sm rounded-xl">
            View Projects
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(16rem,20rem)_1fr] 2xl:grid-cols-[minmax(18rem,24rem)_1fr]">
          <ProjectCard {...featuredProject} />
          <div className="rounded-2xl border border-base-content/10 bg-base-200/50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Layers3 size={18} />
              </div>
              <div>
                <p className="text-xs text-base-content/45">
                  {featuredProject.category} Project
                </p>
                <p className="text-sm font-bold text-base-content">
                  {featuredProject.projectRole}
                </p>
              </div>
            </div>

            {featuredProject.caseStudy && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-base-content">Focus</p>
                  <p className="mt-1 text-sm leading-relaxed text-base-content/65">
                    {featuredProject.caseStudy.problem}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-base-content">Built</p>
                  <p className="mt-1 text-sm leading-relaxed text-base-content/65">
                    {featuredProject.caseStudy.outcome}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {featuredProject.techNames?.map((name) => (
                <span key={name} className="badge badge-outline">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] 2xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-3xl border border-base-content/10 bg-base-100 p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
                Workspace
              </p>
              <h2 className="mt-2 text-2xl font-bold text-base-content">
                Portfolio Areas
              </h2>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
            {workspaceLinks.map(({ label, description, path, Icon }) => (
              <Link
                key={label}
                to={path}
                className="group rounded-2xl border border-base-content/10 bg-base-200/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-base-100 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-base-content/35 transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  />
                </div>
                <h3 className="font-bold text-base-content">{label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-base-content/60">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-base-content/10 bg-base-100 p-4 sm:p-5 shadow-sm lg:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-base-content/45">
                Quick Contact
              </p>
              <h3 className="mt-2 text-xl font-bold text-base-content">
                Start a conversation
              </h3>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Mail size={18} />
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <a
              href="mailto:marklarenztabotabo@gmail.com"
              className="rounded-2xl border border-base-content/10 bg-base-200/60 p-4 transition-colors hover:border-primary/25"
            >
              <p className="text-xs text-base-content/45">Email</p>
              <p className="mt-1 break-all text-sm font-semibold text-base-content">
                marklarenztabotabo@gmail.com
              </p>
            </a>
            <div className="rounded-2xl border border-base-content/10 bg-base-200/60 p-4">
              <p className="text-xs text-base-content/45">Location</p>
              <p className="mt-1 text-sm font-semibold text-base-content">
                Zamboanga City, Philippines
              </p>
            </div>
            <div className="rounded-2xl border border-base-content/10 bg-base-200/60 p-4">
              <p className="text-xs text-base-content/45">Response Time</p>
              <p className="mt-1 text-sm font-semibold text-base-content">
                Usually within 24 hours
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              <Link to="/contact" className="btn btn-primary rounded-xl">
                Send a Message
              </Link>
              <a
                href="mailto:marklarenztabotabo@gmail.com"
                className="btn btn-outline rounded-xl"
              >
                Email Directly
              </a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
