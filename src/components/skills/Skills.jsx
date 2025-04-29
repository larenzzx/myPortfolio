import { SectionTitle } from "../SectionTitle";
// import { ObserverProvider } from "../ObserverProvider";

// frontend logos
import htmlLogo from "../../assets/html5.svg";
import cssLogo from "../../assets/css_old.svg";
import jsLogo from "../../assets/javascript.svg";
import tailwindLogo from "../../assets/tailwindcss.svg";
import reactLogo from "../../assets/react_dark.svg";
import daisyLogo from "../../assets/daisyui.svg";
import headlessLogo from "../../assets/headlessui.svg";
import chartLogo from "../../assets/chartjs.svg";
import sweetLogo from "../../assets/SweetAlert2.png";
import swipeLogo from "../../assets/swiper-logo.svg";
import dataTable from "../../assets/datatables.svg";

// backend logos
import phpLogo from "../../assets/php_dark.svg";
import pythonLogo from "../../assets/python.svg";
import sqlLogo from "../../assets/mysql.svg";
import djangoLogo from "../../assets/django.svg";

// git logos
import gitLogo from "../../assets/git.svg";
import githubLogo from "../../assets/github-dark.svg";

import { SkillInfo } from "./Skill-info";
import { SkillLogo } from "./Skill-logo";

export const Skills = () => {
  return (
    <div className="container min-h-screen">
      <SectionTitle id="skills" title="Skills" />

      <div className="mt-4 rounded-2xl bg-gray-800 bg-opacity-10 p-4 text-center shadow-lg shadow-[rgba(255,255,255,0.1)] backdrop-blur-md">
        <div className="mb-8 text-center">
          <SkillInfo info="Frontend Development" />
          <div className="md:gap flex flex-wrap justify-center gap-4 py-6">
            <SkillLogo logos={htmlLogo} tooltip="HTML" />
            <SkillLogo logos={cssLogo} tooltip="CSS" />
            <SkillLogo logos={jsLogo} tooltip="JavaScript" />
            <SkillLogo logos={chartLogo} tooltip="chartJS" />
            <SkillLogo logos={sweetLogo} tooltip="sweetalert2" />
            <SkillLogo logos={swipeLogo} tooltip="SwiperJS" />
            <SkillLogo logos={dataTable} tooltip="DataTablesJS" />
            <SkillLogo logos={tailwindLogo} tooltip="TailwindCSS" />
            <SkillLogo logos={reactLogo} tooltip="ReactJS" />
            <SkillLogo logos={headlessLogo} tooltip="HeadlessUI" />
            <SkillLogo logos={daisyLogo} tooltip="daisyUI" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <SkillInfo info="Backend Development" />
          <div className="md:gap flex flex-wrap justify-center gap-4 py-6">
            <SkillLogo logos={phpLogo} tooltip="PHP" />
            <SkillLogo logos={pythonLogo} tooltip="python" />
            <SkillLogo logos={sqlLogo} tooltip="MySQL" />
            <SkillLogo logos={djangoLogo} tooltip="django" />
          </div>
        </div>

        <div className="text-center">
          <SkillInfo info="Version Control & Collaboration" />
          <div className="md:gap flex flex-wrap justify-center gap-4 py-6">
            <SkillLogo logos={gitLogo} tooltip="Git" />
            <SkillLogo logos={githubLogo} tooltip="GitHub" />
          </div>
        </div>
      </div>
    </div>
  );
};
