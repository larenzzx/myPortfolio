import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Code2, Shield, Layers } from "lucide-react";

import myImg from "../../assets/profilePic.jpg";
import myLogo from "../../assets/logoLarenz.png";

/* ------------------------------------------------------------------
   Reusable scroll-reveal hook — fires once when element enters view.
   Uses threshold & rootMargin from the spec.
------------------------------------------------------------------ */
const useScrollReveal = () => {
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

  return [ref, visible];
};

/* ------------------------------------------------------------------
   Local SectionTitle — keeps the animated heading inside About.jsx
------------------------------------------------------------------ */
const SectionTitle = ({ id, title }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} id={id} className="scroll-mt-16 mb-10 text-center">
      {/* Eyebrow */}
      <span
        className={`inline-block font-mono text-xs tracking-widest text-primary uppercase mb-3 transition-all duration-500 ease-spring ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        // {title.toLowerCase().replace(/\s+/g, "-")}
      </span>

      {/* Title */}
      <h2
        className={`text-4xl sm:text-5xl font-bold text-base-content transition-all duration-700 ease-spring delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {title}
      </h2>

      {/* Accent divider */}
      <div
        className={`mt-4 flex items-center justify-center gap-2 transition-all duration-700 ease-spring delay-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   Stat card — icon + large value + descriptor
------------------------------------------------------------------ */
const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="flex flex-col items-center gap-1.5 rounded-xl bg-base-200 p-4 text-center">
    <Icon size={18} className={`text-${color}`} />
    <span className={`text-xl font-bold text-${color}`}>{value}</span>
    <span className="text-xs text-base-content/60 leading-snug">{label}</span>
  </div>
);

const socialLinks = [
  { icon: faGithub, url: "https://github.com/larenzzx", name: "GitHub" },
  {
    icon: faFacebook,
    url: "https://www.facebook.com/marklarenz.tabotabo?mibextid=wwXIfr&rdid=41mPboavCJj7LpdE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AMy9Kz15z%2F%3Fmibextid%3DwwXIfr",
    name: "Facebook",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/mark-larenz-tabotabo-681216346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    name: "LinkedIn",
  },
  {
    icon: faTwitter,
    url: "https://x.com/larenzz15?s=21",
    name: "Twitter",
  },
];

const About = () => {
  const [imageRef, imageVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
      {/* Grid background — theme-safe */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--bc) / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--bc) / 0.03) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container relative mx-auto px-4 py-16 lg:py-24">
        <SectionTitle id="about" title="About Me" />

        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* ── LEFT COLUMN: Visual ── */}
          <div
            ref={imageRef}
            className={`flex flex-col items-center gap-8 transition-all duration-500 ease-spring ${
              imageVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Profile image with spinning ring */}
            <div className="group relative">
              {/* Glow halo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
              {/* Spinning gradient ring */}
              <div className="animate-spin-slow absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-60" />

              <div className="relative">
                <img
                  src={myImg}
                  alt="Mark Larenz Tabotabo"
                  className="h-56 w-56 rounded-full object-cover shadow-2xl transition-all duration-500 group-hover:scale-105 sm:h-64 sm:w-64 md:h-72 md:w-72"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNGY0NmU1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+WW91ciBQaG90bzwvdGV4dD4KPC9zdmc+";
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-base-300/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* Name + brand logo row */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-3">
                <img
                  src={myLogo}
                  alt="Mark Larenz brand logo"
                  className="h-10 w-10 rounded-lg object-cover shadow-lg ring-2 ring-primary/30"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMDZiNmQ0Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzMiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1MPC90ZXh0Pgo8L3N2Zz4=";
                  }}
                />
                <span className="text-sm font-medium text-base-content/70">
                  marklarenztabotabo
                </span>
              </div>

              {/* Role badges */}
              <div className="flex gap-2 flex-wrap justify-center">
                <span className="badge badge-primary badge-sm font-mono">
                  &lt; Web Dev /&gt;
                </span>
                <span className="badge badge-secondary badge-sm font-mono">
                  [ SOC L1 ]
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 flex-wrap justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-base-content/10 bg-base-200/60 text-base-content/70 transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary hover:text-primary-content hover:shadow-md hover:shadow-primary/20"
                  aria-label={`Visit my ${social.name} profile`}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Text + Stats + CTA ── */}
          <div
            ref={contentRef}
            className={`flex flex-col gap-6 transition-all duration-500 ease-spring delay-100 ${
              contentVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Name + subtitle */}
            <div>
              <h1 className="text-3xl font-bold text-base-content sm:text-4xl md:text-5xl">
                Mark Larenz Tabotabo
              </h1>
              <p className="mt-2 text-lg font-medium text-primary sm:text-xl">
                Web Developer &amp; Cybersecurity Analyst
              </p>
            </div>

            {/* Three paragraphs */}
            <div className="space-y-4 text-sm leading-relaxed text-base-content/75 sm:text-base">
              <p>
                I started building for the web out of pure curiosity — writing
                HTML, styling with CSS, and eventually falling in love with
                React and Tailwind. Over time, that curiosity turned into
                real projects: client websites, full-stack apps, and everything
                in between.
              </p>
              <p>
                In November 2025, I stepped into cybersecurity as a{" "}
                <span className="font-semibold text-primary">
                  SOC Analyst L1 at Aetas Security
                </span>
                . Today I monitor and respond to security incidents, work with
                tools like Wazuh, Microsoft Defender, and Qualys VMDR, and
                help enterprise clients stay protected.
              </p>
              <p>
                Both paths reinforce each other — I build with security in
                mind, and I protect systems I understand how to build. That
                intersection is where I do my sharpest work.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                icon={Code2}
                value="2+"
                label="Years Web Dev"
                color="primary"
              />
              <StatCard
                icon={Shield}
                value="SOC L1"
                label="Aetas Security"
                color="secondary"
              />
              <StatCard
                icon={Layers}
                value="4"
                label="Skill Areas"
                color="accent"
              />
            </div>

            {/* CTA */}
            <div>
              <Button link="#contact" btn="Let's Work Together" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
