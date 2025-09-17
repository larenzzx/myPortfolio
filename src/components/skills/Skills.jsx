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
    { logo: htmlLogo, name: "HTML", delay: 0 },
    { logo: cssLogo, name: "CSS", delay: 100 },
    { logo: jsLogo, name: "JavaScript", delay: 200 },
    { logo: tailwindLogo, name: "TailwindCSS", delay: 300 },
    { logo: reactLogo, name: "ReactJS", delay: 400 },
    { logo: daisyLogo, name: "daisyUI", delay: 500 },
    { logo: headlessLogo, name: "HeadlessUI", delay: 600 },
    { logo: chartLogo, name: "ChartJS", delay: 700 },
    { logo: sweetLogo, name: "SweetAlert2", delay: 800 },
    { logo: swipeLogo, name: "SwiperJS", delay: 900 },
    { logo: dataTable, name: "DataTablesJS", delay: 1000 },
  ];

  // Git
  const versionControlSkills = [
    { logo: gitLogo, name: "Git", delay: 0 },
    { logo: github, name: "GitHub", delay: 100 },
  ];

  return (
    <div className="container min-h-screen px-4 py-16">
      <SectionTitle id="skills" title="Skills" />

      <div className="mx-auto max-w-6xl">
        {/* Main skills container */}
        <div className="relative overflow-hidden rounded-3xl border border-base-content/10 bg-gradient-to-br from-base-100/90 to-base-200/80 shadow-2xl shadow-base-content/5 backdrop-blur-lg">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--p)) 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, hsl(var(--s)) 0%, transparent 50%)`,
              }}
            ></div>
          </div>

          <div className="relative p-8 md:p-12">
            {/* Frontend  */}
            <div className="mb-16 text-center">
              <SkillInfo info="Frontend Development" />

              <div className="grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 md:grid-cols-4 md:gap-8 lg:grid-cols-6">
                {frontendSkills.map((skill, index) => (
                  <SkillLogo
                    key={skill.name}
                    logos={skill.logo}
                    tooltip={skill.name}
                    delay={skill.delay}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mb-16 flex items-center justify-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-base-content/20 to-transparent"></div>
              <div className="px-4">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-base-content/20 to-transparent"></div>
            </div>

            {/* Git */}
            <div className="text-center">
              <SkillInfo info="Version Control & Collaboration" />

              <div className="flex justify-center gap-8 md:gap-12">
                {versionControlSkills.map((skill, index) => (
                  <SkillLogo
                    key={skill.name}
                    logos={skill.logo}
                    tooltip={skill.name}
                    delay={skill.delay}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* for backend */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-info/20 bg-info/10 px-6 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-info"></div>
            <span className="font-medium ">
              Currently expanding into Backend Development
            </span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-info"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
