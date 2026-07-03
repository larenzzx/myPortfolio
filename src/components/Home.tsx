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

const NeuralNetAnimation = () => {
  const ROWS = 8;
  const COLS = 32;

  const generateRandomGrid = () => {
    const grid = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        row.push(Math.random() < 0.25);
      }
      grid.push(row);
    }
    return grid;
  };

  const [grid, setGrid] = useState<boolean[][]>(() => generateRandomGrid());

  useEffect(() => {
    let active = true;

    const countNeighbors = (g: boolean[][], r: number, c: number) => {
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newR = r + i;
          const newC = c + j;
          if (newR >= 0 && newR < ROWS && newC >= 0 && newC < COLS) {
            if (g[newR][newC]) neighbors++;
          }
        }
      }
      return neighbors;
    };

    const interval = setInterval(() => {
      if (!active) return;

      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        let totalLive = 0;
        let changed = false;

        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const neighbors = countNeighbors(prev, r, c);
            const isAlive = prev[r][c];

            if (isAlive) {
              if (neighbors < 2 || neighbors > 3) {
                next[r][c] = false;
                changed = true;
              } else {
                next[r][c] = true;
                totalLive++;
              }
            } else {
              if (neighbors === 3) {
                next[r][c] = true;
                totalLive++;
                changed = true;
              }
            }
          }
        }

        if (!changed || totalLive < 4) {
          return generateRandomGrid();
        }
        return next;
      });
    }, 350);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl h-24 flex items-center justify-start select-none font-mono py-2">
      <div 
        className="grid gap-[4px] p-1 select-none"
        style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="w-[6px] h-[6px] xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 rounded-[1px] flex items-center justify-center transition-all duration-300"
            >
              <div
                className={`transition-all duration-300 rounded-[1px] ${
                  cell
                    ? "w-full h-full bg-ink opacity-90 scale-100"
                    : "w-[2px] h-[2px] bg-gray-200 dark:bg-gray-800 scale-75 opacity-40"
                }`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

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
    label: "Web & AI Automation",
    description:
      "Freelance Web & AI Automation Developer. Building robust web apps, custom AI-driven solutions, and secure workflow automations.",
    Icon: Code2,
  },
  {
    title: "Defend",
    label: "SOC Analyst",
    description:
      "Full-time SOC Analyst L1. Managing threat monitoring, incident response, security alert triage, and enterprise safety.",
    Icon: ShieldCheck,
  },
  {
    title: "Support",
    label: "IT Operations",
    description:
      "IT operations, systems configuration, user provisioning, device management, and secure networking setups.",
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
            <div className="mb-6 flex flex-wrap items-center gap-1 sm:gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg border border-build/20 bg-build/5 px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-2 font-mono text-[9px] xs:text-[10px] sm:text-xs font-semibold text-build hover:bg-build/10 transition-colors">
                <Code2 size={11} className="sm:size-[14px]" />
                &lt; Web Dev /&gt;
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg border border-defend/20 bg-defend/5 px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-2 font-mono text-[9px] xs:text-[10px] sm:text-xs font-semibold text-defend hover:bg-defend/10 transition-colors">
                <ShieldCheck size={11} className="sm:size-[14px]" />
                [ SOC Analyst ]
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg border border-support/20 bg-support/5 px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-2 font-mono text-[9px] xs:text-[10px] sm:text-xs font-semibold text-support hover:bg-support/10 transition-colors">
                <Cpu size={11} className="sm:size-[14px]" />
                [ AI & Automation ]
              </span>
            </div>

            <div className="mb-6 mt-2">
              <NeuralNetAnimation />
            </div>

            <div className="mt-5 flex min-h-10 items-center gap-x-2 text-lg font-bold sm:text-xl xl:text-xl 2xl:text-2xl">
              <span className="text-gray-400">I&apos;m</span>
              <TypingAnimation />
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
              Currently employed as a SOC Analyst L1 and working as a freelance Web & AI Automation Developer. I focus on developing robust web applications, secure intelligent workflows, and custom AI-driven integrations.
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
              Skills across development, security, and AI automation
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
