import { useRef, useState, useEffect } from "react";
import { Shield, Code2, Monitor } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

/* ------------------------------------------------------------------
   Single scroll-reveal wrapper — fires once on viewport entry.
   Animates only opacity + transform (no layout properties).
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
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
        transitionDuration: "450ms",
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
    title: "Cybersecurity Analyst (SOC Analyst L1)",
    company: "Aetas Security",
    period: "November 2025 – Present",
    current: true,
    icon: Shield,
    bullets: [
      "Monitor and triage security alerts across client environments",
      "Perform incident response and escalate threats as needed",
      "Use tools: Wazuh, Microsoft Defender for Endpoint, Qualys VMDR, OSINT tools",
      "Support helpdesk/IT with user provisioning, device management, VM setup via Microsoft Entra ID, Intune, Exchange, SharePoint, Datto RMM",
    ],
    tags: ["Wazuh", "MS Defender", "Qualys VMDR", "Incident Response", "Entra ID"],
    tagStyle: "badge-primary",
    cardStyle: "bg-base-100 border-primary/20",
    bulletColor: "bg-primary/60",
  },
  {
    id: 2,
    title: "Freelance Frontend Developer",
    company: "Self-employed",
    period: "Prior to 2025",
    current: false,
    icon: Code2,
    bullets: [
      "Designed and developed modern, responsive web interfaces for clients",
      "Built projects using HTML, CSS, JavaScript, React, and Tailwind CSS",
      "Delivered portfolio websites and landing pages for multiple clients",
    ],
    tags: ["React", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
    tagStyle: "badge-secondary",
    cardStyle: "bg-base-100 border-base-content/10",
    bulletColor: "bg-secondary/60",
  },
  {
    id: 3,
    title: "IT Technician",
    company: "Prior Experience",
    period: "Prior",
    current: false,
    icon: Monitor,
    bullets: [
      "Installed and configured operating systems, applications, and games",
      "Performed reprogramming, bug fixes, and hardware maintenance for PC and internet café systems",
      "Provided LAN and network setup support",
    ],
    tags: ["OS Installation", "Hardware", "LAN Setup", "Networking"],
    tagStyle: "badge-accent",
    cardStyle: "bg-base-100 border-base-content/10",
    bulletColor: "bg-accent/60",
  },
];

export const Experience = () => {
  return (
    <div className="bg-base-200 px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <SectionTitle id="exp" title="Experience" />

        {/* DaisyUI vertical timeline */}
        <ul className="timeline timeline-vertical">
          {experiences.map((exp, i) => {
            const IconComponent = exp.icon;
            const isLast = i === experiences.length - 1;

            return (
              <li key={exp.id}>
                {/* HR above first item and between items */}
                {i > 0 && (
                  <hr
                    className={
                      experiences[i - 1].current ? "bg-primary" : "bg-base-content/20"
                    }
                  />
                )}

                {/* Period — left side */}
                <div className="timeline-start mb-10 text-end pr-4">
                  <RevealItem delay={i * 60}>
                    <span className="badge badge-outline badge-sm font-mono whitespace-nowrap text-base-content/60">
                      {exp.period}
                    </span>
                  </RevealItem>
                </div>

                {/* Dot — middle */}
                <div className="timeline-middle">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      exp.current
                        ? "bg-primary shadow-md shadow-primary/40"
                        : "bg-base-content/20"
                    }`}
                  >
                    <IconComponent
                      size={14}
                      className={
                        exp.current
                          ? "text-primary-content"
                          : "text-base-content/50"
                      }
                    />
                  </div>
                </div>

                {/* Card — right side */}
                <div className={`timeline-end mb-10 w-full max-w-lg pl-4`}>
                  <RevealItem delay={i * 60 + 30}>
                    <div
                      className={`rounded-2xl border p-5 transition-all duration-300 ease-spring hover:shadow-lg ${exp.cardStyle}`}
                    >
                      {/* Header row */}
                      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold text-base-content sm:text-lg">
                              {exp.title}
                            </h3>
                            {exp.current && (
                              <span className="badge badge-primary badge-sm">
                                Present
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm text-base-content/55">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Bullets */}
                      <ul className="mb-4 space-y-1.5">
                        {exp.bullets.map((bullet, bi) => (
                          <li
                            key={bi}
                            className="flex gap-2 text-sm text-base-content/70"
                          >
                            <span
                              className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${exp.bulletColor}`}
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`badge badge-outline badge-sm ${exp.tagStyle}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </RevealItem>
                </div>

                {/* HR after last item omitted */}
                {!isLast && (
                  <hr
                    className={
                      exp.current ? "bg-primary" : "bg-base-content/20"
                    }
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
