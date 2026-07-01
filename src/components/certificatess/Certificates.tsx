import { useState, useEffect } from "react";
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
import googleio from "../../assets/googleio.jpg";

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
import claude101 from "../../assets/claude101.pdf";
import aifluency from "../../assets/AI-fluency.pdf";
import datacom from "../../assets/datacomJobSimulation.pdf";
import mastercard from "../../assets/mastercardCybersecurityJobSimulation.pdf";

import { supabase } from "../../lib/supabaseClient";

// Registry of local file resources (images & PDFs)
export const LOCAL_ASSETS = {
  htmlCert,
  frontCert,
  jsCert,
  reactCert,
  webCert,
  dataStruc,
  tesda,
  googleio,
  msLearn1,
  msLearn2,
  msLearn3,
  msLearn4,
  msLearn5,
  msLearn6,
  msLearn7,
  msLearn8,
  msLearn9,
  msLearn10,
  msLearn11,
  ccFinal,
  courseCompletion,
  cyberCourseCompletion,
  domain1,
  domain2,
  domain3,
  domain4,
  domain5,
  fortinet,
  threatCompletion,
  vulnMgmt,
  claudeCode,
  claude101,
  aifluency,
  datacom,
  mastercard
};

/* ----------------------------------------------------------------
   Category config
---------------------------------------------------------------- */
const CATEGORY_CONFIG = {
  "web-dev": {
    label: "Web Dev",
    Icon: Code2,
    colorClass: "text-build",
    badgeClass: "border-build/15 bg-build/5 text-build",
  },
  cybersecurity: {
    label: "Cybersecurity",
    Icon: Shield,
    colorClass: "text-defend",
    badgeClass: "border-defend/15 bg-defend/5 text-defend",
  },
  "it-admin": {
    label: "IT & Systems",
    Icon: Monitor,
    colorClass: "text-support",
    badgeClass: "border-support/15 bg-support/5 text-support",
  },
  ai: {
    label: "AI",
    Icon: Cpu,
    colorClass: "text-support",
    badgeClass: "border-support/15 bg-support/5 text-support",
  },
  general: {
    label: "General",
    Icon: Award,
    colorClass: "text-ink",
    badgeClass: "border-gray-200 dark:border-gray-800 bg-bg text-ink",
  },
};

/* ----------------------------------------------------------------
   Certificate data
---------------------------------------------------------------- */
const STATIC_CERTIFICATES = [
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
    title: "CC: Certified in Cybersecurity - Final Assessment",
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
    title: "Google I/O Extended",
    issuer: "Google",
    year: "2025",
    category: "ai",
    image: googleio,
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    year: "2026",
    category: "ai",
    image: claudeCode,
    isPdf: true,
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    year: "2026",
    category: "ai",
    image: claude101,
    isPdf: true,
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    year: "2026",
    category: "ai",
    image: aifluency,
    isPdf: true,
  },
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
    <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/10 dark:bg-gray-950/5 p-5">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-ink">{certs.length}</div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
            Total
          </div>
        </div>
        <div className="hidden h-8 w-px bg-gray-200 dark:bg-gray-800 sm:block" />
        {byCategory.map(({ label, colorClass, count, Icon }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon size={14} className={colorClass} strokeWidth={2} />
            <div>
              <span className={`text-sm font-bold ${colorClass}`}>{count}</span>
              <span className="ml-1 text-xs text-gray-500">{label}</span>
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
  const [certsList, setCertsList] = useState(STATIC_CERTIFICATES);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .order("year", { ascending: false });

        if (error) throw error;

        if (data) {
          let mergedCerts = [...STATIC_CERTIFICATES];

          data.forEach((c) => {
            const cleanImageUrl = c.image_url ? c.image_url.trim().replace(/^"|"$/g, "").replace(/\s+/g, "") : "";
            const certObj = {
              title: c.title ? c.title.trim().replace(/\s+/g, " ") : "",
              issuer: c.issuer ? c.issuer.trim().replace(/\s+/g, " ") : "",
              year: c.year ? c.year.trim().replace(/\s+/g, "") : "",
              category: c.category ? c.category.trim().replace(/\s+/g, "") : "",
              image: LOCAL_ASSETS[cleanImageUrl] || cleanImageUrl,
              isPdf: !!c.is_pdf,
            };

            if (c.is_deleted) {
              mergedCerts = mergedCerts.filter((item) => item.title !== c.title);
            } else {
              const existingIndex = mergedCerts.findIndex((item) => item.title === c.title);
              if (existingIndex > -1) {
                mergedCerts[existingIndex] = certObj;
              } else {
                mergedCerts.push(certObj);
              }
            }
          });

          setCertsList(mergedCerts);
        }
      } catch (err) {
        console.warn("Failed to fetch certificates from Supabase, using local fallback:", err.message);
      }
    };

    fetchCerts();
  }, []);

  const visible =
    activeTab === "all"
      ? certsList
      : certsList.filter((c) => c.category === activeTab);

  const activeTabs = [
    { id: "all", label: "All", Icon: LayoutGrid },
    ...Object.entries(CATEGORY_CONFIG).map(([id, cfg]) => ({
      id,
      label: cfg.label,
      Icon: cfg.Icon,
    })),
  ].filter(
    (t) => t.id === "all" || certsList.some((c) => c.category === t.id)
  );

  return (
    <section className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg px-5 py-10 shadow-sm sm:px-8 lg:px-10">
      <div>
        <SectionTitle id="certs" title="Certificates" />

        {/* Filter tabs */}
        <div className="no-scrollbar -mx-4 mb-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
            {activeTabs.map(({ id, label, Icon }) => {
              const active = activeTab === id;
              let activeStyle = "";
              if (active) {
                if (id === "all" || id === "web-dev") activeStyle = "bg-build text-bg font-semibold";
                else if (id === "cybersecurity") activeStyle = "bg-defend text-bg font-semibold";
                else activeStyle = "bg-support text-bg font-semibold";
              }
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 border ${
                    active
                      ? activeStyle
                      : "border-gray-200 dark:border-gray-800 bg-bg text-gray-500 hover:bg-gray-100/70 hover:text-ink"
                  }`}
                >
                  <Icon size={13} strokeWidth={2} />
                  {label}
                </button>
              );
            })}
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
        <StatsBar certs={certsList} />
      </div>
    </section>
  );
};
