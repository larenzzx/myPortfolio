import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Code2, Layers, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SectionTitle } from "../SectionTitle";
import myImg from "../../assets/profilePic.png";

const StatCard = ({ icon: Icon, value, label, color }) => {
  let customTone = "bg-support/5 text-support border-support/10";
  if (color === "primary") customTone = "bg-build/5 text-build border-build/20";
  else if (color === "secondary") customTone = "bg-defend/5 text-defend border-defend/20";
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-bg p-3 text-center shadow-sm sm:p-4">
      <div className={`grid h-9 w-9 place-items-center rounded-xl border ${customTone}`}>
        <Icon size={17} />
      </div>
      <span className="text-lg font-bold sm:text-xl text-ink">
        {value}
      </span>
      <span className="text-[10px] leading-snug text-gray-400 sm:text-xs font-mono">
        {label}
      </span>
    </div>
  );
};

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
    <section className="relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg">
      <div className="relative px-5 py-10 sm:px-8 lg:px-10">
        <SectionTitle id="about" title="About Me" />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div
            className="intersect-once flex flex-col items-center gap-8 intersect:motion-translate-y-in-[32px] intersect:motion-fade-in"
          >
            <div className="group relative">
              <div className="relative rounded-full border border-gray-200 dark:border-gray-800 p-2 bg-bg shadow-md">
                <img
                  src={myImg}
                  alt="Mark Larenz Tabotabo"
                  className="h-56 w-56 rounded-full object-cover transition-all duration-500 group-hover:scale-[1.02] sm:h-64 sm:w-64 md:h-72 md:w-72"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-sm font-bold text-ink font-serif text-lg tracking-tight">
                Mark Larenz Tabotabo
              </span>

              <div className="flex flex-wrap justify-center gap-2">
                <span className="border border-build/20 bg-build/5 px-2.5 py-1 rounded-md text-xs font-mono text-build">
                  &lt; Web Dev /&gt;
                </span>
                <span className="border border-defend/20 bg-defend/5 px-2.5 py-1 rounded-md text-xs font-mono text-defend">
                  [ SOC L1 ]
                </span>
                <span className="border border-support/20 bg-support/5 px-2.5 py-1 rounded-md text-xs font-mono text-support">
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-bg text-gray-400 shadow-sm transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-ink hover:text-ink"
                  aria-label={`Visit my ${social.name} profile`}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          <div
            className="intersect-once flex flex-col gap-6 intersect:motion-translate-y-in-[32px] intersect:motion-fade-in intersect:motion-delay-100"
          >
            <div>
              <h1 className="text-2xl font-bold text-ink sm:text-3xl md:text-4xl lg:text-5xl font-serif">
                Mark Larenz Tabotabo
              </h1>
              <p className="mt-2 text-lg font-medium text-build sm:text-xl font-mono">
                SOC Analyst L1 | Freelance Web Developer | AI Enthusiast
              </p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-gray-500 sm:text-base">
              <p>
                I&apos;m a{" "}
                <span className="font-semibold text-defend">
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

            <div className="mt-2">
              <Button asChild>
                <Link to="/contact">Let's Work Together</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
