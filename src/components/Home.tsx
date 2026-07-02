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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TypingAnimation from "./hero/TypingAnimation";
import { ProjectCard } from "./projectSection/ProjectCard";
import { featuredProject, fetchProjectsFromSupabase } from "./projectSection/projectData";

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
  const [featured, setFeatured] = useState<any>(featuredProject);

  useEffect(() => {
    fetchProjectsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        const found = data.find((p: any) => p.featured) || data[0];
        if (found) {
          setFeatured(found);
        }
      }
    });
  }, []);

  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-gray-50/10 dark:bg-gray-950/5">
        <div className="absolute inset-0 hero-grid-bg opacity-[0.06]" />

        <div className="relative grid gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_24rem] xl:p-8 2xl:p-10">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-xl border border-build/20 bg-build/5 px-3 py-2 font-mono text-xs font-semibold text-build hover:bg-build/10 transition-colors">
                <Code2 size={14} />
                &lt; Web Developer /&gt;
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-defend/20 bg-defend/5 px-3 py-2 font-mono text-xs font-semibold text-defend hover:bg-defend/10 transition-colors">
                <ShieldCheck size={14} />
                [ SOC Analyst ]
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-support/20 bg-support/5 px-3 py-2 font-mono text-xs font-semibold text-support hover:bg-support/10 transition-colors">
                <Cpu size={14} />
                [ AI Enthusiast ]
              </span>
            </div>

            <h1 className="max-w-4xl text-2xl font-black leading-[1.25] tracking-tight text-ink sm:text-3xl md:text-5xl xl:text-6xl">
              I build <span className="text-build font-extrabold">web applications</span>.
              <br />
              I automate <span className="text-defend font-extrabold">workflows</span>.
            </h1>

            <div className="mt-5 flex min-h-10 items-center gap-x-2 text-lg font-bold sm:text-xl xl:text-xl 2xl:text-2xl">
              <span className="text-gray-400">I&apos;m</span>
              <TypingAnimation />
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
              Developer and SOC Analyst L1 with a growing passion for AI infrastructure, automation, and building smarter systems.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-11 px-5">
                <Link to="/projects">
                  View Projects
                  <ArrowRight size={16} className="ml-1.5" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-11 px-5">
                <Link to="/contact">
                  Contact
                  <Mail size={16} className="ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-200/50 dark:border-gray-800/40 bg-gray-50/30 dark:bg-gray-950/15 p-4 sm:p-5">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
              Profile Summary
            </p>
            <h2 className="mt-3 text-2xl font-bold text-ink font-serif">
              Mark Larenz Tabotabo
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Freelance Web Developer & Cybersecurity Analyst
            </p>

            <div className="mt-6 grid gap-3">
              {overviewCards.map(({ label, value, detail, Icon, tone }) => {
                let customTone = "text-gray-500 bg-gray-50/50 border-gray-200/50 dark:bg-gray-900/50 dark:border-gray-800/50";
                if (tone.includes("success")) {
                  customTone = "text-defend bg-defend/5 border-defend/20";
                } else if (tone.includes("primary")) {
                  customTone = "text-build bg-build/5 border-build/20";
                } else if (tone.includes("info")) {
                  customTone = "text-support bg-support/5 border-support/20";
                }
                return (
                  <div
                    key={label}
                    className="rounded-xl border border-gray-200/40 dark:border-gray-800/40 bg-bg p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`rounded-xl border p-2 ${customTone}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-gray-400">{label}</p>
                        <p className="mt-1 text-sm font-semibold text-ink">
                          {value}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">{detail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
              What I Know
            </p>
            <h2 className="mt-2 text-2xl font-bold text-ink font-serif">
              Skills across development, security, and IT
            </h2>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {valueCards.map(({ title, label, description, Icon }) => {
              let customTone = "bg-support/5 text-support border-support/10";
              if (title.toLowerCase() === "build") customTone = "bg-build/5 text-build border-build/20";
              else if (title.toLowerCase() === "defend") customTone = "bg-defend/5 text-defend border-defend/20";
              return (
                <article
                  key={title}
                  className="rounded-2xl border border-gray-200/40 dark:border-gray-800/40 bg-gray-50/15 dark:bg-gray-950/5 p-4 hover:shadow-sm transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`grid h-10 w-10 place-items-center rounded-xl border ${customTone}`}>
                      <Icon size={18} />
                    </div>
                    <span className="rounded-lg border border-gray-200 dark:border-gray-800 bg-bg px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-gray-400 capitalize">
                      {title}
                    </span>
                  </div>
                  <h3 className="font-bold text-ink">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg p-4 sm:p-5 shadow-sm lg:p-6">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
            Focus Stack
          </p>
          <div className="mt-5 grid gap-3">
            {focusItems.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="flex gap-3 rounded-2xl bg-gray-50/30 dark:bg-gray-950/15 border border-gray-200/40 dark:border-gray-800/40 p-4"
              >
                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-bg text-ink">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-wider text-gray-400">{label}</p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-ink">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
              Featured Project
            </p>
            <h2 className="mt-2 text-2xl font-bold text-ink font-serif">
              {featured.projectTitle}
            </h2>
          </div>
          <Button variant="outline" size="sm" asChild className="px-3.5">
            <Link to="/projects">
              View Projects
              <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(16rem,20rem)_1fr] 2xl:grid-cols-[minmax(18rem,24rem)_1fr]">
          <ProjectCard {...featured} />
          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/15 dark:bg-gray-950/5 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-build/20 bg-build/5 text-build">
                <Layers3 size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">
                  {featured.category} Project
                </p>
              </div>
            </div>

            {featured.caseStudy && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Focus</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {featured.caseStudy.problem}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Built</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {featured.caseStudy.outcome}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {featured.techNames?.map((name) => (
                <span key={name} className="border border-gray-200 dark:border-gray-800 bg-bg px-2 py-0.5 rounded text-[10px] font-mono text-gray-400">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                Workspace
              </p>
              <h2 className="mt-2 text-2xl font-bold text-ink font-serif">
                Portfolio Areas
              </h2>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
            {workspaceLinks.map(({ label, description, path, Icon }) => (
              <Link
                key={label}
                to={path}
                className="group rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/15 dark:bg-gray-950/5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-bg hover:shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-bg text-ink group-hover:border-ink/20 transition-colors">
                    <Icon size={18} />
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-ink"
                  />
                </div>
                <h3 className="font-bold text-ink">{label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg p-4 sm:p-5 shadow-sm lg:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                Quick Contact
              </p>
              <h3 className="mt-2 text-xl font-bold text-ink font-serif">
                Start a conversation
              </h3>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-bg text-ink">
              <Mail size={18} />
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <a
              href="mailto:marklarenztabotabo@gmail.com"
              className="rounded-xl border border-gray-200/40 dark:border-gray-800/40 bg-gray-50/15 dark:bg-gray-950/5 p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <p className="text-[9px] font-mono uppercase tracking-wider text-gray-400">Email</p>
              <p className="mt-1 break-all text-sm font-semibold text-ink">
                marklarenztabotabo@gmail.com
              </p>
            </a>
            <div className="rounded-xl border border-gray-200/40 dark:border-gray-800/40 bg-gray-50/15 dark:bg-gray-950/5 p-4">
              <p className="text-[9px] font-mono uppercase tracking-wider text-gray-400">Location</p>
              <p className="mt-1 text-sm font-semibold text-ink">
                Zamboanga City, Philippines
              </p>
            </div>
            <div className="rounded-xl border border-gray-200/40 dark:border-gray-800/40 bg-gray-50/15 dark:bg-gray-950/5 p-4">
              <p className="text-[9px] font-mono uppercase tracking-wider text-gray-400">Response Time</p>
              <p className="mt-1 text-sm font-semibold text-ink">
                Usually within 24 hours
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              <Button asChild className="h-10">
                <Link to="/contact">
                  Send a Message
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-10">
                <a href="mailto:marklarenztabotabo@gmail.com">
                  Email Directly
                </a>
              </Button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
