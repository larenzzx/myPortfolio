import { useState } from "react";
import { SectionTitle } from "../SectionTitle";
import { SkillInfo } from "./Skill-info";
import { SkillLogo } from "./Skill-logo";
import {
  Shield,
  ShieldAlert,
  AlertTriangle,
  Search,
  Activity,
  Eye,
  Bug,
  Users,
  Smartphone,
  Mail,
  FileText,
  Server,
  Monitor,
  Cpu,
  Wifi,
  Box,
  Code2,
  Database,
} from "lucide-react";

// frontend + git logos
import htmlLogo from "../../assets/html5.svg";
import cssLogo from "../../assets/css.svg";
import jsLogo from "../../assets/javascript.svg";
import tailwindLogo from "../../assets/tailwindcss.svg";
import reactLogo from "../../assets/react_dark.svg";
import daisyLogo from "../../assets/daisyui.svg";
import headlessLogo from "../../assets/headlessui.svg";
import chartLogo from "../../assets/chartjs.svg";
import sweetLogo from "../../assets/SweetAlert2.png";
import swipeLogo from "../../assets/swiper-logo.svg";
import dataTable from "../../assets/datatables.svg";
import gitLogo from "../../assets/git.svg";
import github from "../../assets/github-mark.svg";

// backend logos
import pythonLogo from "../../assets/python.svg";
import phpLogo from "../../assets/php.svg";
import mysqlLogo from "../../assets/mysql.svg";

/* ----------------------------------------------------------------
   Skill data per category — stagger delay capped at 60ms per item
---------------------------------------------------------------- */
const buildSkills = (items) =>
  items.map((s, i) => ({ ...s, delay: i * 60 }));

const CATEGORIES = {
  frontend: buildSkills([
    { logo: htmlLogo, name: "HTML5", type: "img" },
    { logo: cssLogo, name: "CSS3", type: "img" },
    { logo: jsLogo, name: "JavaScript", type: "img" },
    { logo: tailwindLogo, name: "Tailwind CSS", type: "img" },
    { logo: reactLogo, name: "React", type: "img" },
    { logo: daisyLogo, name: "DaisyUI", type: "img" },
    { logo: headlessLogo, name: "HeadlessUI", type: "img" },
    { logo: chartLogo, name: "ChartJS", type: "img" },
    { logo: sweetLogo, name: "SweetAlert2", type: "img" },
    { logo: swipeLogo, name: "SwiperJS", type: "img" },
    { logo: dataTable, name: "DataTablesJS", type: "img" },
    { logo: gitLogo, name: "Git", type: "img" },
    { logo: github, name: "GitHub", type: "img" },
  ]),
  backend: buildSkills([
    { logo: pythonLogo, name: "Python", type: "img" },
    { logo: "https://svgl.app/library/django.svg", name: "Django", type: "img" },
    { logo: phpLogo, name: "PHP", type: "img" },
    { logo: mysqlLogo, name: "MySQL", type: "img" },
  ]),
  cyber: buildSkills([
    { logo: <Shield size={32} />, name: "Security Ops", type: "lucide" },
    { logo: <ShieldAlert size={32} />, name: "Alert Triage", type: "lucide" },
    { logo: <Activity size={32} />, name: "Incident Response", type: "lucide" },
    { logo: <Eye size={32} />, name: "Wazuh", type: "lucide" },
    { logo: <Shield size={32} />, name: "MS Defender", type: "lucide" },
    { logo: <Search size={32} />, name: "OSINT Tools", type: "lucide" },
    { logo: <Bug size={32} />, name: "Qualys VMDR", type: "lucide" },
    { logo: <AlertTriangle size={32} />, name: "Threat Analysis", type: "lucide" },
  ]),
  it: buildSkills([
    { logo: <Users size={32} />, name: "Entra ID", type: "lucide" },
    { logo: <Smartphone size={32} />, name: "Intune", type: "lucide" },
    { logo: <Mail size={32} />, name: "Exchange", type: "lucide" },
    { logo: <FileText size={32} />, name: "SharePoint", type: "lucide" },
    { logo: <Server size={32} />, name: "Datto RMM", type: "lucide" },
    { logo: <Monitor size={32} />, name: "OS Config", type: "lucide" },
    { logo: <Cpu size={32} />, name: "Hardware Maint.", type: "lucide" },
    { logo: <Wifi size={32} />, name: "LAN / Network", type: "lucide" },
    { logo: <Box size={32} />, name: "VM Setup", type: "lucide" },
  ]),
};

const TABS = [
  { id: "frontend", label: "Frontend", Icon: Code2 },
  { id: "backend", label: "Backend", Icon: Database },
  { id: "cyber", label: "Cybersecurity", Icon: Shield },
  { id: "it", label: "IT & Systems", Icon: Monitor },
];

export const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const activeSkills = CATEGORIES[activeTab];

  const stats = [
    {
      value: `${CATEGORIES.frontend.length + CATEGORIES.backend.length}+`,
      label: "Frontend + Backend",
      color: "text-primary",
    },
    {
      value: `${CATEGORIES.cyber.length}+`,
      label: "Cybersecurity Tools",
      color: "text-secondary",
    },
    {
      value: `${CATEGORIES.it.length}+`,
      label: "IT & Systems Tools",
      color: "text-accent",
    },
  ];

  return (
    <div className="bg-base-100 px-4 py-16">
      <div className="container mx-auto">
        <SectionTitle id="skills" title="Skills" />

        <div className="mx-auto max-w-5xl">
          {/* Outer card */}
          <div className="relative overflow-hidden rounded-3xl border border-base-content/10 bg-gradient-to-br from-base-100/95 to-base-200/90 shadow-2xl shadow-base-content/10">
            {/* Decorative orbs */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 blur-3xl motion-safe:animate-pulse" />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-accent/15 to-info/15 blur-3xl motion-safe:animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative p-4 sm:p-6 md:p-10 lg:p-14">
              <SkillInfo info="Skills & Technologies" />

              {/* Scrollable tab bar */}
              <div className="no-scrollbar -mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
                  {TABS.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        activeTab === id
                          ? "bg-primary text-primary-content shadow-sm shadow-primary/20"
                          : "bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content"
                      }`}
                    >
                      <Icon size={13} strokeWidth={2} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills grid — key forces remount on tab change so entrance animation replays */}
              <div
                key={activeTab}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              >
                {activeSkills.map((skill) => (
                  <SkillLogo
                    key={`${skill.name}-${activeTab}`}
                    logos={skill.logo}
                    tooltip={skill.name}
                    delay={skill.delay}
                    type={skill.type}
                  />
                ))}
              </div>
            </div>

            {/* Glass overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-base-content/[0.02] via-transparent to-base-content/[0.02]" />
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-1 gap-4 opacity-70 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-base-content/10 bg-base-content/5 p-5 text-center backdrop-blur-sm"
              >
                <div className={`mb-1 text-2xl font-bold ${s.color}`}>
                  {s.value}
                </div>
                <div className="text-sm text-base-content/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
