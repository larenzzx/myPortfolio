import { useState } from "react";
import { Code2, Shield, Monitor, Cpu, Award, LayoutGrid } from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import { CertificateCard } from "./CertificateCard";

import htmlCert from "../../assets/htmlCert.png";
import frontCert from "../../assets/frontCert.png";
import jsCert from "../../assets/jsCert.png";
import reactCert from "../../assets/reactCert.png";
import webCert from "../../assets/webCert.png";
import dataStruc from "../../assets/dataStruc.png";
import tesda from "../../assets/tesda.png";

/* ----------------------------------------------------------------
   Category config — icon, colours (DaisyUI tokens only)
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
   Fields: title, issuer, year, category, image (optional)
   Add future certs here — category determines the tab it appears in.
---------------------------------------------------------------- */
const certificates = [
  {
    title: "HTML Fundamentals",
    issuer: "Sololearn",
    year: "2024",
    category: "web-dev",
    image: htmlCert,
  },
  {
    title: "Introduction to Front End Development",
    issuer: "Sololearn",
    year: "2024",
    category: "web-dev",
    image: frontCert,
  },
  {
    title: "JavaScript for Beginners",
    issuer: "Sololearn",
    year: "2024",
    category: "web-dev",
    image: jsCert,
  },
  {
    title: "ReactJS for Beginners",
    issuer: "Sololearn",
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
  {
    title: "Computer Systems Servicing",
    issuer: "TESDA",
    year: "2023",
    category: "it-admin",
    image: tesda,
  },
];

/* ----------------------------------------------------------------
   Filter tabs
---------------------------------------------------------------- */
const TABS = [{ id: "all", label: "All", Icon: LayoutGrid }, ...Object.entries(
  CATEGORY_CONFIG
).map(([id, cfg]) => ({ id, label: cfg.label, Icon: cfg.Icon }))];

/* ----------------------------------------------------------------
   Stats bar
---------------------------------------------------------------- */
const StatsBar = ({ certs }) => {
  const byCategory = Object.keys(CATEGORY_CONFIG).map((cat) => ({
    ...CATEGORY_CONFIG[cat],
    count: certs.filter((c) => c.category === cat).length,
  })).filter((c) => c.count > 0);

  return (
    <div className="rounded-2xl border border-base-content/10 bg-base-100/60 p-5 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{certs.length}</div>
          <div className="text-xs uppercase tracking-wider text-base-content/50">Total</div>
        </div>
        <div className="h-8 w-px bg-base-content/10 hidden sm:block" />
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
        <div
          role="tablist"
          className="tabs tabs-boxed mb-10 flex-wrap gap-1 justify-center"
        >
          {activeTabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              className={`tab gap-2 transition-all duration-200 ${
                activeTab === id ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>

        {/* Certificate grid */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((cert, i) => (
            <CertificateCard
              key={i}
              cert={cert}
              config={CATEGORY_CONFIG[cert.category] ?? CATEGORY_CONFIG.general}
            />
          ))}
        </div>

        {/* Stats */}
        <StatsBar certs={certificates} />
      </div>
    </div>
  );
};
