import { useEffect, useRef, useState } from "react";
import { Calendar, Code2, MapPin, Monitor, Shield } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

const RevealItem = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: "opacity, transform",
        transitionDuration: "420ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      {children}
    </div>
  );
};

const experiences = [
  {
    id: 1,
    title: "Cybersecurity Analyst",
    subtitle: "SOC Analyst L1",
    company: "Aetas Security",
    location: "On-site",
    period: "Nov 2025 - Present",
    current: true,
    Icon: Shield,
    accent: "primary",
    bullets: [
      "Monitor and triage security alerts across client environments",
      "Perform incident response and escalate threats as needed",
      "Work with Wazuh, Microsoft Defender for Endpoint, Qualys VMDR, and OSINT tools",
      "Support enterprise IT: user provisioning, Intune device management, VM setup via Entra ID, Exchange, SharePoint, and Datto RMM",
    ],
    tags: ["Wazuh", "MS Defender", "Qualys VMDR", "Incident Response", "Entra ID"],
  },
  {
    id: 2,
    title: "Freelance Web Developer",
    subtitle: "Full-stack, frontend, maintenance, and deployment",
    company: "Independent",
    location: "Remote",
    period: "2024 - Present",
    current: true,
    Icon: Code2,
    accent: "secondary",
    bullets: [
      "Build full-stack web applications, frontend apps, portfolios, dashboards, and landing pages for client commissions",
      "Improve existing projects by fixing bugs, resolving errors, refining UI, and adding requested features",
      "Develop responsive interfaces using React, Tailwind CSS, JavaScript, PHP, and database-backed workflows when needed",
      "Prepare projects for production by testing, configuring hosting, and deploying sites online",
    ],
    tags: ["React", "Tailwind CSS", "JavaScript", "PHP", "MySQL", "Python", "Django", "Deployment"],
  },
  {
    id: 3,
    title: "IT Technician",
    subtitle: "Hardware & Systems",
    company: "Prior Experience",
    location: "On-site",
    period: "Prior",
    current: false,
    Icon: Monitor,
    accent: "accent",
    bullets: [
      "Installed and configured operating systems, software, and games",
      "Performed reprogramming, bug fixes, and hardware maintenance for PCs/Laptops",
      "Set up and managed LAN environments",
    ],
    tags: ["OS Installation", "Hardware", "LAN Setup", "Networking"],
  },
];

const accentCfg = {
  primary: {
    icon: "bg-primary/10 text-primary",
    dot: "bg-primary text-primary-content shadow-primary/25",
    tagClass: "badge-primary",
    meta: "bg-primary/10 text-primary",
  },
  secondary: {
    icon: "bg-secondary/10 text-secondary",
    dot: "bg-secondary text-secondary-content shadow-secondary/25",
    tagClass: "badge-secondary",
    meta: "bg-secondary/10 text-secondary",
  },
  accent: {
    icon: "bg-accent/10 text-accent",
    dot: "bg-accent text-accent-content shadow-accent/25",
    tagClass: "badge-accent",
    meta: "bg-accent/10 text-accent",
  },
};

export const Experience = () => {
  return (
    <section className="rounded-3xl border border-base-content/10 bg-base-100 px-5 py-10 shadow-sm sm:px-8 lg:px-10">
      <SectionTitle id="exp" title="Experience" />

      <div className="relative">
        <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-base-content/10 md:block" />

        <div className="grid gap-5">
          {experiences.map((exp, index) => {
            const cfg = accentCfg[exp.accent];

            return (
              <RevealItem key={exp.id} delay={index * 80}>
                <article className="grid gap-4 md:grid-cols-[2rem_minmax(0,1fr)]">
                  <div className="relative hidden md:block">
                    <div
                      className={`absolute left-0 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-xl shadow-lg ${cfg.dot}`}
                    >
                      <exp.Icon size={16} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-sm transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md">
                    <div className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_auto]">
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${cfg.icon}`}
                        >
                          <exp.Icon size={18} strokeWidth={1.8} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-lg font-bold leading-tight text-base-content">
                            {exp.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-base-content/60">
                            {exp.subtitle}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="inline-flex items-center gap-1.5 text-xs text-base-content/50">
                              <MapPin size={11} strokeWidth={2} />
                              {exp.company}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-base-content/50">
                              <Calendar size={11} strokeWidth={2} />
                              {exp.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-start gap-2 lg:justify-end">
                        {exp.current && (
                          <span className="badge badge-primary badge-sm flex-shrink-0 font-medium">
                            Present
                          </span>
                        )}
                        <span className={`badge badge-sm ${cfg.meta}`}>
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="h-px bg-base-content/10" />

                    <ul className="grid gap-2 p-5 md:grid-cols-2">
                      {exp.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-xl bg-base-200/60 p-3 text-sm leading-relaxed text-base-content/70"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 px-5 pb-5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`badge badge-outline badge-sm ${cfg.tagClass} font-normal`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </div>
      </div>
    </section>
  );
};
