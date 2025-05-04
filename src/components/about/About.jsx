import { ObserverProvider } from "../ObserverProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import myImg from "../../assets/me.jpg";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import Button from "../Button";

// lahi nga way pag call sa component if walay export default. if 'export const arrow function ra'
import { SectionTitle } from "../SectionTitle";

const About = () => {
  return (
    <>
      <div className="container min-h-screen">
        <ObserverProvider>
          <SectionTitle id="about" title="About Me" />

          <div className="intersect-once intersect:motion-translate-y-in-100 intersect:motion-duration-[2s] intersect:motion-ease-spring-smooth hero">
            <div className="hero-content flex-col gap-12 lg:flex-row">
              <img
                src={myImg}
                className="max-w-60 rounded-lg shadow-2xl sm:max-w-xs"
              />
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-semibold sm:text-4xl">
                  Mark Larenz Tabotabo
                </h1>
                <p className="py-6 text-sm sm:text-base">
                  I am a passionate web developer with a strong focus on{" "}
                  <span className="text-primary">frontend development</span>,
                  crafting intuitive and user-friendly interfaces. While
                  frontend is my primary expertise, I am continuously honing my
                  backend skills to become a well-rounded{" "}
                  <span className="text-primary">full-stack developer</span>. My
                  ultimate goal is to grow into a skilled and reliable{" "}
                  <span className="text-primary">software engineer</span>,
                  capable of building efficient and scalable solutions. I am
                  always eager to learn, adapt, and improve my craft to keep up
                  with the ever-changing world of technology.
                </p>
                <div className="mb-8 animate-bounce space-x-4 text-2xl text-primary">
                  <a href="https://github.com/larenzzx">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a href="https://www.facebook.com/marklarenz.tabotabo?mibextid=wwXIfr&rdid=41mPboavCJj7LpdE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AMy9Kz15z%2F%3Fmibextid%3DwwXIfr">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="https://www.linkedin.com/in/mark-larenz-tabotabo-681216346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href="https://x.com/larenzz15?s=21">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
                <Button link={'#contact'} btn="Contact Me" />
              </div>
            </div>
          </div>
        </ObserverProvider>
      </div>
    </>
  );
};

export default About;
