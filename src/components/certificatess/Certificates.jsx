import { useState } from "react";
import { Code2, Shield, Monitor, Cpu, Award, LayoutGrid } from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import { CertificateCard } from "./CertificateCard";

/* ── Existing certificates (images) ──────────────────────── */
import htmlCert from "../../assets/htmlCert.png";
import frontCert from "../../assets/frontCert.png";
import jsCert from "../../assets/jsCert.png";
import reactCert from "../../assets/reactCert.png";
import webCert from "../../assets/webCert.png";
import dataStruc from "../../assets/dataStruc.png";
import tesda from "../../assets/tesda.png";

/* ── Microsoft Learn (images) ────────────────────────────── */
import msLearn1 from "../../assets/MircrosoftLearn-1.png";
import msLearn2 from "../../assets/MicrosoftLearn-2.png";
import msLearn3 from "../../assets/MircrosoftLearn-3.png";
import msLearn4 from "../../assets/MicrosoftLearn-4.png";
import msLearn5 from "../../assets/MicrosoftLearn-5.png";
import msLearn6 from "../../assets/MicrosoftLearn-6.png";
import msLearn7 from "../../assets/MicrosoftLearn-7.png";
import msLearn8 from "../../assets/MicrosoftLearn-8.png";
import msLearn9 from "../../assets/MicrosoftLearn-9.png";
import msLearn10 from "../../assets/MicrosoftLearn-10.png";
import msLearn11 from "../../assets/MicrosoftLearn-11.png";

/* ── PDF certificates ────────────────────────────────────── */
import ccFinal from "../../assets/CC Course Conclusion & Final Assessment.pdf";
import courseCompletion from "../../assets/CourseCompletionCertificate.pdf";
import cyberCourseCompletion from "../../assets/Course_Completion_Certificate_Cybersecurity.pdf";
import domain1 from "../../assets/Domain-1_Security Principles Certificate.pdf";
import domain2 from "../../assets/Domain-2_Incident Response, Business Continuity and Disater Recovery Concepts Certificate.pdf";
import domain3 from "../../assets/Domain-3_Access Control Concepts Certificate.pdf";
import domain4 from "../../assets/Domain-4_Network Security.pdf";
import domain5 from "../../assets/Domain-5_Security Operations.pdf";
import fortinet from "../../assets/Fortinet Certified Fundamentals in Cybersecurity.pdf";
import threatCompletion from "../../assets/Threat_Completion_Certificate.pdf";
import vulnMgmt from "../../assets/VulnerabilityManagement.pdf";
import claudeCode from "../../assets/claude-code-in-action.pdf";
import datacom from "../../assets/datacomJobSimulation.pdf";
import mastercard from "../../assets/mastercardCybersecurityJobSimulation.pdf";

/* ----------------------------------------------------------------
   Category config
---------------------------------------------------------------- */
export const CATEGORY_CONFIG = {
  "web-dev": {
    label: "Web Dev",
    Icon: Code2,
    colorClass: "text-warning",
    badgeClass: "border-warning/40 bg-warning/10 text-warning",
  },
  cybersecurity: {
    label: "Cybersecurity",
    Icon: Shield,
    colorClass: "text-error",
    badgeClass: "border-error/40 bg-error/10 text-error",
  },
  "it-admin": {
    label: "IT & Systems",
    Icon: Monitor,
    colorClass: "text-info",
    badgeClass: "border-info/40 bg-info/10 text-info",
  },
  ai: {
    label: "AI",
    Icon: Cpu,
    colorClass: "text-success",
    badgeClass: "border-success/40 bg-success/10 text-success",
  },
  general: {
    label: "General",
    Icon: Award,
    colorClass: "text-primary",
    badgeClass: "border-primary/40 bg-primary/10 text-primary",
  },
};

/* ----------------------------------------------------------------
   Certificate data
---------------------------------------------------------------- */
const certificates = [
  /* ── Web Development ── */
  {
    title: "HTML Fundamentals",
    issuer: "Simplilearn",
    year: "2024",
    category: "web-dev",
    image: htmlCert,
  },
  {
    title: "Introduction to Front End Development",
    issuer: "Simplilearn",
    year: "2024",
    category: "web-dev",
    image: frontCert,
  },
  {
    title: "JavaScript for Beginners",
    issuer: "Simplilearn",
    year: "2024",
    category: "web-dev",
    image: jsCert,
  },
  {
    title: "ReactJS for Beginners",
    issuer: "Simplilearn",
    year: "2024",
    category: "web-dev",
    image: reactCert,
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2024",
    category: "web-dev",
    image: webCert,
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2024",
    category: "web-dev",
    image: dataStruc,
  },

  /* ── Cybersecurity — ISC2 CC ── */
  {
    title: "CC: Security Principles (Domain 1)",
    issuer: "ISC2",
    year: "2025",
    category: "cybersecurity",
    image: domain1,
    isPdf: true,
  },
  {
    title: "CC: Incident Response, BC & DR (Domain 2)",
    issuer: "ISC2",
    year: "2025",
    category: "cybersecurity",
    image: domain2,
    isPdf: true,
  },
  {
    title: "CC: Access Control Concepts (Domain 3)",
    issuer: "ISC2",
    year: "2025",
    category: "cybersecurity",
    image: domain3,
    isPdf: true,
  },
  {
    title: "CC: Network Security (Domain 4)",
    issuer: "ISC2",
    year: "2025",
    category: "cybersecurity",
    image: domain4,
    isPdf: true,
  },
  {
    title: "CC: Security Operations (Domain 5)",
    issuer: "ISC2",
    year: "2025",
    category: "cybersecurity",
    image: domain5,
    isPdf: true,
  },
  {
    title: "CC: Certified in Cybersecurity — Final Assessment",
    issuer: "ISC2",
    year: "2025",
    category: "cybersecurity",
    image: ccFinal,
    isPdf: true,
  },

  /* ── Cybersecurity — Other ── */
  {
    title: "Fortinet Certified Fundamentals in Cybersecurity",
    issuer: "Fortinet",
    year: "2025",
    category: "cybersecurity",
    image: fortinet,
    isPdf: true,
  },
  {
    title: "Cybersecurity Course Completion",
    issuer: "Fortinet",
    year: "2025",
    category: "cybersecurity",
    image: cyberCourseCompletion,
    isPdf: true,
  },
  {
    title: "KnowBe4 Security Awareness",
    issuer: "KnowBe4",
    year: "2026",
    category: "cybersecurity",
    image: courseCompletion,
    isPdf: true,
  },
  {
    title: "Threat Intelligence Completion",
    issuer: "Fortinet",
    year: "2025",
    category: "cybersecurity",
    image: threatCompletion,
    isPdf: true,
  },
  {
    title: "Vulnerability Management",
    issuer: "Qualys",
    year: "2025",
    category: "cybersecurity",
    image: vulnMgmt,
    isPdf: true,
  },
  {
    title: "Datacom Cybersecurity Job Simulation",
    issuer: "Forage",
    year: "2025",
    category: "cybersecurity",
    image: datacom,
    isPdf: true,
  },
  {
    title: "Mastercard Cybersecurity Job Simulation",
    issuer: "Forage",
    year: "2025",
    category: "cybersecurity",
    image: mastercard,
    isPdf: true,
  },

  /* ── Microsoft Learn — Cybersecurity ── */
  {
    title: "Introduction to Security, Compliance, and Identity",
    issuer: "Microsoft",
    year: "2025",
    category: "cybersecurity",
    image: msLearn2,
  },
  {
    title: "Introduction to Microsoft Security Solutions",
    issuer: "Microsoft",
    year: "2025",
    category: "cybersecurity",
    image: msLearn4,
  },
  {
    title: "MS-900: Microsoft 365 Security and Compliance Capabilities",
    issuer: "Microsoft",
    year: "2025",
    category: "cybersecurity",
    image: msLearn5,
  },
  {
    title: "Introduction to Microsoft Priva and Purview",
    issuer: "Microsoft",
    year: "2025",
    category: "cybersecurity",
    image: msLearn6,
  },
  {
    title: "Protect Identity and Access in Azure",
    issuer: "Microsoft",
    year: "2025",
    category: "cybersecurity",
    image: msLearn7,
  },

  /* ── Microsoft Learn — IT & Systems ── */
  {
    title: "Describe Azure Management and Governance",
    issuer: "Microsoft",
    year: "2025",
    category: "it-admin",
    image: msLearn1,
  },
  {
    title: "Introduction to Microsoft Entra",
    issuer: "Microsoft",
    year: "2025",
    category: "it-admin",
    image: msLearn3,
  },
  {
    title: "MD-102: Explore Endpoint Management",
    issuer: "Microsoft",
    year: "2025",
    category: "it-admin",
    image: msLearn8,
  },
  {
    title: "Describe Cloud Concepts",
    issuer: "Microsoft",
    year: "2025",
    category: "it-admin",
    image: msLearn9,
  },
  {
    title: "Describe Azure Architecture and Services",
    issuer: "Microsoft",
    year: "2025",
    category: "it-admin",
    image: msLearn10,
  },
  {
    title: "MD-102: Execute Device Enrollment",
    issuer: "Microsoft",
    year: "2025",
    category: "it-admin",
    image: msLearn11,
  },

  /* ── IT & Systems ── */
  {
    title: "Computer Systems Servicing",
    issuer: "TESDA",
    year: "2023",
    category: "it-admin",
    image: tesda,
  },

  /* ── AI ── */
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    year: "2026",
    category: "ai",
    image: claudeCode,
    isPdf: true,
  },
];

/* ----------------------------------------------------------------
   Filter tabs
---------------------------------------------------------------- */
const TABS = [
  { id: "all", label: "All", Icon: LayoutGrid },
  ...Object.entries(CATEGORY_CONFIG).map(([id, cfg]) => ({
    id,
    label: cfg.label,
    Icon: cfg.Icon,
  })),
];

/* ----------------------------------------------------------------
   Stats bar
---------------------------------------------------------------- */
const StatsBar = ({ certs }) => {
  const byCategory = Object.keys(CATEGORY_CONFIG)
    .map((cat) => ({
      ...CATEGORY_CONFIG[cat],
      count: certs.filter((c) => c.category === cat).length,
    }))
    .filter((c) => c.count > 0);

  return (
    <div className="rounded-2xl border border-base-content/10 bg-base-100/60 p-5 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{certs.length}</div>
          <div className="text-xs uppercase tracking-wider text-base-content/50">
            Total
          </div>
        </div>
        <div className="hidden h-8 w-px bg-base-content/10 sm:block" />
        {byCategory.map(({ label, colorClass, count, Icon }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon size={14} className={colorClass} strokeWidth={2} />
            <div>
              <span className={`text-sm font-bold ${colorClass}`}>{count}</span>
              <span className="ml-1 text-xs text-base-content/50">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------
   Main component
---------------------------------------------------------------- */
export const Certificates = () => {
  const [activeTab, setActiveTab] = useState("all");

  const visible =
    activeTab === "all"
      ? certificates
      : certificates.filter((c) => c.category === activeTab);

  const activeTabs = TABS.filter(
    (t) => t.id === "all" || certificates.some((c) => c.category === t.id)
  );

  return (
    <div className="bg-base-100 px-4 py-16">
      <div className="container mx-auto max-w-7xl">
        <SectionTitle id="certs" title="Certificates" />

        {/* Filter tabs */}
        <div className="no-scrollbar -mx-4 mb-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
            {activeTabs.map(({ id, label, Icon }) => (
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

        {/* Certificate grid */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((cert, i) => (
            <CertificateCard
              key={i}
              index={i}
              cert={cert}
              config={
                CATEGORY_CONFIG[cert.category] ?? CATEGORY_CONFIG.general
              }
            />
          ))}
        </div>

        {/* Stats */}
        <StatsBar certs={certificates} />
      </div>
    </div>
  );
};
