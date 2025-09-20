import { SectionTitle } from "../SectionTitle";
import { SkillInfo } from "./Skill-info";
import { SkillLogo } from "./Skill-logo";

// frontend logos
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

// git logos
import gitLogo from "../../assets/git.svg";
import github from "../../assets/github-mark.svg";

export const Skills = () => {
  // Frontend
  const frontendSkills = [
    { logo: htmlLogo, name: "HTML", delay: 100 },
    { logo: cssLogo, name: "CSS", delay: 200 },
    { logo: jsLogo, name: "JavaScript", delay: 300 },
    { logo: tailwindLogo, name: "TailwindCSS", delay: 400 },
    { logo: reactLogo, name: "ReactJS", delay: 500 },
    { logo: daisyLogo, name: "daisyUI", delay: 600 },
    { logo: headlessLogo, name: "HeadlessUI", delay: 700 },
    { logo: chartLogo, name: "ChartJS", delay: 800 },
    { logo: sweetLogo, name: "SweetAlert2", delay: 900 },
    { logo: swipeLogo, name: "SwiperJS", delay: 1000 },
    { logo: dataTable, name: "DataTablesJS", delay: 1100 },
  ];

  // Git
  const versionControlSkills = [
    { logo: gitLogo, name: "Git", delay: 200 },
    { logo: github, name: "GitHub", delay: 400 },
  ];

  return (
    <div className="container min-h-screen px-4 py-16">
      <SectionTitle id="skills" title="Skills" />

      <div className="mx-auto max-w-7xl">
        <div className="hover:shadow-3xl group relative overflow-hidden rounded-3xl border border-base-content/10 bg-gradient-to-br from-base-100/95 to-base-200/90 shadow-2xl shadow-base-content/10 backdrop-blur-xl transition-all duration-700 hover:shadow-primary/10">
          {/* animated background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_25%_25%,hsl(var(--p))_0%,transparent_45%),radial-gradient(circle_at_75%_75%,hsl(var(--s))_0%,transparent_45%)]"></div>
            <div className="absolute inset-0 animate-spin bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,hsl(var(--a))/5%_60deg,transparent_120deg)] duration-[20s]"></div>
          </div>

          {/* Floating orbs */}
          <div className="absolute -right-24 -top-24 h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"></div>
          <div className="animation-delay-1000 absolute -bottom-24 -left-24 h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-accent/20 to-info/20 blur-3xl"></div>

          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="text-center mb-20">
              <SkillInfo info="Frontend Development" />

              <div className="grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 md:grid-cols-4 md:gap-8 lg:grid-cols-6 xl:gap-10">
                {frontendSkills.map((skill, index) => (
                  <SkillLogo
                    key={skill.name}
                    logos={skill.logo}
                    tooltip={skill.name}
                    delay={skill.delay}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* divider */}
            <div className="mb-20 flex items-center justify-center">
              <div className="relative flex-1">
                <div className="h-px bg-gradient-to-r from-transparent via-base-content/30 to-base-content/10"></div>
                <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>

              <div className="relative px-8">
                <div className="flex items-center justify-center">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30"></div>
                  <div className="absolute h-6 w-6 animate-ping rounded-full border-2 border-primary/20"></div>
                </div>
              </div>

              <div className="relative flex-1">
                <div className="h-px bg-gradient-to-r from-base-content/10 via-base-content/30 to-transparent"></div>
                <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            </div>

            <div className="text-center">
              <SkillInfo info="Version Control & Collaboration" />

              <div className="flex justify-center gap-12 md:gap-16 lg:gap-20">
                {versionControlSkills.map((skill, index) => (
                  <SkillLogo
                    key={skill.name}
                    logos={skill.logo}
                    tooltip={skill.name}
                    delay={skill.delay}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* glass effect overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
        </div>

        <div className="mt-16 text-center">
          <div className="group relative inline-flex items-center gap-4 rounded-2xl border border-info/30 bg-gradient-to-r from-info/10 via-info/5 to-info/10 px-8 py-4 backdrop-blur-sm transition-all duration-500 hover:border-info/50 hover:bg-gradient-to-r hover:from-info/15 hover:via-info/10 hover:to-info/15 hover:shadow-lg hover:shadow-info/20">
            {/* dots */}
            <div className="flex gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-info"></div>
              <div className="animation-delay-100 h-2 w-2 animate-bounce rounded-full bg-info"></div>
              <div className="animation-delay-200 h-2 w-2 animate-bounce rounded-full bg-info"></div>
            </div>

            <span className="font-semibold text-base-content transition-colors duration-300 group-hover:text-info text-xs sm:text-base">
              Currently expanding into Backend Development
            </span>

            <div className="flex gap-1">
              <div className="animation-delay-300 h-2 w-2 animate-bounce rounded-full bg-info"></div>
              <div className="animation-delay-400 h-2 w-2 animate-bounce rounded-full bg-info"></div>
              <div className="animation-delay-500 h-2 w-2 animate-bounce rounded-full bg-info"></div>
            </div>

           
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 opacity-60 md:grid-cols-3">
          <div className="rounded-2xl border border-base-content/10 bg-base-content/5 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 text-2xl font-bold text-primary">
              {frontendSkills.length}+
            </div>
            <div className="text-sm text-base-content/70">
              Frontend Technologies
            </div>
          </div>

          <div className="rounded-2xl border border-base-content/10 bg-base-content/5 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 text-2xl font-bold text-secondary">
              {versionControlSkills.length}
            </div>
            <div className="text-sm text-base-content/70">
              Version Control Tools
            </div>
          </div>

          <div className="rounded-2xl border border-base-content/10 bg-base-content/5 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 text-2xl font-bold text-accent">∞</div>
            <div className="text-sm text-base-content/70">Learning Journey</div>
          </div>
        </div>
      </div>
    </div>
  );
};
