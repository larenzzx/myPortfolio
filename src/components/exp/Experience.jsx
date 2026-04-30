import { useRef, useState, useEffect } from "react";
import { Shield, Code2, Monitor, MapPin, Calendar } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

/* ------------------------------------------------------------------
   Scroll-reveal — fires once, animates only opacity + transform
------------------------------------------------------------------ */
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
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
        transitionDuration: "480ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------
   Experience data
------------------------------------------------------------------ */
const experiences = [
  {
    id: 1,
    title: "Cybersecurity Analyst",
    subtitle: "SOC Analyst L1",
    company: "Aetas Security",
    location: "Remote",
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
    tags: ["React", "Tailwind CSS", "JavaScript", "PHP", "MySQL", "Deployment"],
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
      "Performed reprogramming, bug fixes, and hardware maintenance for PCs and cafe systems",
      "Set up and managed LAN environments",
    ],
    tags: ["OS Installation", "Hardware", "LAN Setup", "Networking"],
  },
];

/* ------------------------------------------------------------------
   Accent config — 100% DaisyUI tokens
------------------------------------------------------------------ */
const accentCfg = {
  primary: {
    dot: "bg-primary shadow-lg shadow-primary/30",
    dotRing: "ring-4 ring-primary/20",
    iconColor: "text-primary-content",
    border: "border-l-4 border-primary",
    cardBg: "bg-base-100",
    glow: "shadow-primary/10",
    headerIcon: "bg-primary/10 text-primary",
    tagClass: "badge-primary",
    bullet: "bg-primary",
    periodBg: "bg-primary/10 text-primary",
  },
  secondary: {
    dot: "bg-base-300",
    dotRing: "",
    iconColor: "text-base-content/60",
    border: "border-l-4 border-secondary/50",
    cardBg: "bg-base-100",
    glow: "shadow-base-content/5",
    headerIcon: "bg-secondary/10 text-secondary",
    tagClass: "badge-secondary",
    bullet: "bg-secondary",
    periodBg: "bg-secondary/10 text-secondary",
  },
  accent: {
    dot: "bg-base-300",
    dotRing: "",
    iconColor: "text-base-content/60",
    border: "border-l-4 border-accent/50",
    cardBg: "bg-base-100",
    glow: "shadow-base-content/5",
    headerIcon: "bg-accent/10 text-accent",
    tagClass: "badge-accent",
    bullet: "bg-accent",
    periodBg: "bg-accent/10 text-accent",
  },
};

/* ------------------------------------------------------------------
   Main component
------------------------------------------------------------------ */
export const Experience = () => {
  return (
    <section className="bg-base-200 px-4 py-16 lg:py-24">
      <div className="container mx-auto max-w-3xl">
        <SectionTitle id="exp" title="Experience" />

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-primary via-base-content/20 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const cfg = accentCfg[exp.accent];

              return (
                <RevealItem key={exp.id} delay={i * 80}>
                  <div className="flex gap-3 sm:gap-5">
                    {/* ── Dot ── */}
                    <div className="relative flex-shrink-0 pt-5">
                      <div
                        className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${cfg.dot} ${cfg.dotRing} z-10`}
                      >
                        <exp.Icon
                          size={16}
                          className={cfg.iconColor}
                          strokeWidth={2}
                        />
                      </div>
                    </div>

                    {/* ── Card ── */}
                    <div
                      className={`flex-1 rounded-2xl ${cfg.border} ${cfg.cardBg} shadow-md ${cfg.glow} transition-all duration-300 ease-spring hover:shadow-xl hover:-translate-y-0.5 overflow-hidden`}
                    >
                      {/* Card header */}
                      <div className="flex items-start justify-between gap-2 px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4">
                        <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                          {/* Role icon badge */}
                          <div
                            className={`hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${cfg.headerIcon}`}
                          >
                            <exp.Icon size={18} strokeWidth={1.8} />
                          </div>

                          <div className="min-w-0">
                            {/* Title + subtitle */}
                            <h3 className="text-base font-bold leading-tight text-base-content sm:text-lg">
                              {exp.title}
                            </h3>
                            <p className="text-sm font-medium text-base-content/55">
                              {exp.subtitle}
                            </p>

                            {/* Company + location row */}
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span className="flex items-center gap-1 text-xs text-base-content/50">
                                <MapPin size={11} strokeWidth={2} />
                                {exp.company}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-base-content/50">
                                <Calendar size={11} strokeWidth={2} />
                                {exp.period}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Present badge — top-right */}
                        {exp.current && (
                          <span className="badge badge-primary badge-sm flex-shrink-0 mt-0.5 font-medium">
                            Present
                          </span>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="mx-4 sm:mx-5 h-px bg-base-content/8" />

                      {/* Bullets */}
                      <ul className="space-y-2 px-4 sm:px-5 py-3 sm:py-4">
                        {exp.bullets.map((bullet, bi) => (
                          <li
                            key={bi}
                            className="flex items-start gap-2.5 text-sm text-base-content/70"
                          >
                            <span
                              className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${cfg.bullet} opacity-70`}
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 px-4 sm:px-5 pb-4 sm:pb-5">
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
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
