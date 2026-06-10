import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Code2, Layers, Shield } from "lucide-react";
import Button from "../Button";
import { SectionTitle } from "../SectionTitle";
import myImg from "../../assets/profilePic.png";
import myLogo from "../../assets/logoLarenz.png";

const statStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-base-content/10 bg-base-100/75 p-3 text-center shadow-sm sm:p-4">
    <div className={`grid h-9 w-9 place-items-center rounded-xl ${statStyles[color]}`}>
      <Icon size={17} />
    </div>
    <span className={`text-lg font-bold sm:text-xl ${statStyles[color].split(" ")[1]}`}>
      {value}
    </span>
    <span className="text-[10px] leading-snug text-base-content/60 sm:text-xs">
      {label}
    </span>
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
    icon: faInstagram,
    url: "https://www.instagram.com/larenzzzx?igsh=MW1uMXNwdW9hZGowYw%3D%3D&utm_source=qr",
    name: "Instagram",
  },
];

const About = () => {
  const yearsWebDev = Math.max(
    1,
    Math.floor(
      (Date.now() - new Date("2024-01-01").getTime()) /
        (365.25 * 24 * 60 * 60 * 1000)
    )
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-sm">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--bc) / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--bc) / 0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative px-5 py-10 sm:px-8 lg:px-10">
        <SectionTitle id="about" title="About Me" />

        <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-[0.85fr_1.15fr]">
          <div
            className="intersect-once flex flex-col items-center gap-8 transition-all duration-500 ease-spring intersect:motion-translate-y-in-[32px] intersect:motion-fade-in"
          >
            <div className="group relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
              <div className="motion-safe:animate-spin-slow absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-60" />
              <div className="relative rounded-full bg-base-100 p-1">
                <img
                  src={myImg}
                  alt="Mark Larenz Tabotabo"
                  className="h-56 w-56 rounded-full object-cover shadow-2xl transition-all duration-500 group-hover:scale-[1.03] sm:h-64 sm:w-64 md:h-72 md:w-72"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-3">
                <img
                  src={myLogo}
                  alt="Mark Larenz brand logo"
                  className="h-10 w-10 rounded-xl object-cover shadow-lg ring-2 ring-primary/30"
                />
                <span className="text-sm font-medium text-base-content/70">
                  marklarenztabotabo
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <span className="badge badge-primary badge-sm font-mono">
                  &lt; Web Dev /&gt;
                </span>
                <span className="badge badge-secondary badge-sm font-mono">
                  [ SOC L1 ]
                </span>
                <span className="badge badge-accent badge-sm font-mono">
                  [ AI Enthusiast ]
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-base-content/10 bg-base-100/70 text-base-content/70 shadow-sm transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary hover:text-primary-content hover:shadow-md hover:shadow-primary/20"
                  aria-label={`Visit my ${social.name} profile`}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          <div
            className="intersect-once flex flex-col gap-6 transition-all duration-500 ease-spring intersect:motion-translate-y-in-[32px] intersect:motion-fade-in intersect:motion-delay-100"
          >
            <div>
              <h1 className="text-2xl font-bold text-base-content sm:text-3xl md:text-4xl lg:text-5xl">
                Mark Larenz Tabotabo
              </h1>
              <p className="mt-2 text-lg font-medium text-primary sm:text-xl">
                SOC Analyst L1 | Freelance Web Developer | AI Enthusiast
              </p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-base-content/75 sm:text-base">
              <p>
                I&apos;m a{" "}
                <span className="font-semibold text-primary">
                  SOC Analyst L1 at Aetas Security
                </span>, working on threat monitoring, 
                incident response, and supporting enterprise security operations. 
                This role has strengthened my foundation in security, reliability, 
                and structured problem-solving.
              </p>
              <p>
                Alongside my full-time role, I occasionally do freelance web development, 
                building both full-stack applications and frontend projects like portfolio websites, 
                landing pages, and responsive UIs. I also take on tasks involving improving existing systems 
                or developing complete web solutions from scratch, including deployment.
              </p>
              <p>
                Currently, I&apos;m transitioning deeper into AI—exploring AI infrastructure, 
                automation, and intelligent systems. I’m actively building and experimenting 
                with tools and workflows that merge software development with AI-driven solutions.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <StatCard
                icon={Code2}
                value={`${yearsWebDev}+`}
                label="Years Web Dev"
                color="primary"
              />
              <StatCard
                icon={Shield}
                value="SOC L1"
                label="Aetas Security"
                color="secondary"
              />
              <StatCard icon={Layers} value="4" label="Skill Areas" color="accent" />
            </div>

            <div>
              <Button link="/contact" btn="Let's Work Together" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
