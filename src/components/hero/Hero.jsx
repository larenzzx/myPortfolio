import heroImg from "../../assets/hero.jpg";

import TypingAnimation from "./TypingAnimation";

function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(" + heroImg + ")",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md md:max-w-lg">
          <h1 className="mb-5 flex items-center justify-center gap-x-2 text-2xl font-bold md:text-5xl bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            I'm<TypingAnimation />
          </h1>
          {/* <p className="mb-5 text-base font-medium md:text-lg">
            Frontend Developer expanding my skills toward <br />{" "}
            <span className="text-primary">Full-Stack Web Developer</span>.
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
