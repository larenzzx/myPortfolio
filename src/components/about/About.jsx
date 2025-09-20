import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCode,
  faRocket,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import myImg from "../../assets/profilePic.jpg";
import myLogo from "../../assets/logoLarenz.png";

const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

const SectionTitle = ({ id, title }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-50px",
  });

  return (
    <div ref={ref} className="mb-16 text-center">
      <h2
        className={`bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-bold text-transparent transition-all duration-1000 sm:text-5xl ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        id={id}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-1 rounded-full bg-gradient-to-r from-primary to-secondary transition-all delay-300 duration-1000 ${
          isVisible ? "w-24 opacity-100" : "w-0 opacity-0"
        } mx-auto`}
      />
    </div>
  );
};

const FloatingIcon = ({ icon, delay = 0 }) => (
  <div
    className="absolute animate-pulse text-primary/20"
    style={{
      animationDelay: `${delay}ms`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 10}px`,
    }}
  >
    <FontAwesomeIcon icon={icon} />
  </div>
);


const About = () => {
  const [mainRef, mainVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-100px",
  });

  const [imageRef, imageVisible] = useIntersectionObserver({
    threshold: 0.3,
  });

  const [contentRef, contentVisible] = useIntersectionObserver({
    threshold: 0.2,
  });

  const socialLinks = [
    {
      icon: faGithub,
      url: "https://github.com/larenzzx",
      name: "GitHub",
    },
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
      <div className="absolute inset-0 opacity-30">
        <FloatingIcon icon={faCode} delay={0} />
        <FloatingIcon icon={faRocket} delay={2000} />
        <FloatingIcon icon={faHeart} delay={4000} />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

      <div className="container relative mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <SectionTitle id="about" title="About Me" />

        <div ref={mainRef} className="mx-auto max-w-6xl">
          <div
            className={`mb-12 text-center transition-all duration-1000 sm:mb-16 lg:mb-20 ${
              mainVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <div
              ref={imageRef}
              className="mb-8 flex justify-center sm:mb-10 lg:mb-12"
            >
              <div className="group relative">
                {/* glowing */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-xl transition-opacity duration-700 group-hover:opacity-30 sm:-inset-6 lg:-inset-8 lg:blur-2xl" />

                {/* rotate */}
                <div className="animate-spin-slow absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-60 sm:-inset-3" />

                <div className="relative">
                  <img
                    src={myImg}
                    alt="Mark Larenz Tabotabo"
                    className={`h-48 w-48 rounded-full object-cover shadow-2xl transition-all duration-700 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 ${
                      imageVisible
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0"
                    } group-hover:scale-105`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "block";
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNGY0NmU1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+WW91ciBQaG90bzwvdGV4dD4KPHN2Zz4=";
                    }}
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-base-300/20 via-transparent to-transparent" />

                  {/* floating elements around image */}
                  <div className="absolute -right-4 -top-2 h-4 w-4 animate-bounce rounded-full bg-primary opacity-80 sm:-right-6 sm:-top-4 sm:h-5 sm:w-5 lg:-right-8 lg:h-6 lg:w-6" />
                  <div
                    className="absolute -bottom-2 -left-4 h-3 w-3 animate-bounce rounded-full bg-secondary opacity-80 sm:-bottom-4 sm:-left-6 sm:h-3.5 sm:w-3.5 lg:-left-8 lg:h-4 lg:w-4"
                    style={{ animationDelay: "1s" }}
                  />
                  <div
                    className="absolute -left-6 top-4 h-2.5 w-2.5 animate-bounce rounded-full bg-accent opacity-80 sm:-left-8 sm:top-6 sm:h-3 sm:w-3 lg:-left-12 lg:top-8"
                    style={{ animationDelay: "2s" }}
                  />
                </div>
              </div>
            </div>

            <div
              className={`mb-6 transition-all delay-300 duration-700 sm:mb-8 ${
                imageVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="mb-3 flex flex-col items-center justify-center gap-3 sm:mb-4 sm:flex-row sm:gap-4">
                <img
                  src={myLogo}
                  alt="Mark Larenz brand logo"
                  className="h-10 w-10 rounded-lg object-cover shadow-lg ring-2 ring-primary/30 sm:h-12 sm:w-12"
                  onError={(e) => {
                    e.target.style.display = "block";
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMDZiNmQ0Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzMiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1MPC90ZXh0Pgo8L3N2Zz4=";
                  }}
                />
                <h1 className="text-center text-3xl font-bold leading-tight text-base-content sm:text-left sm:text-4xl md:text-5xl lg:text-6xl">
                  Mark Larenz Tabotabo
                </h1>
              </div>
              <p className="text-lg font-medium tracking-wide text-primary sm:text-xl lg:text-2xl">
                Frontend Developer → Full-Stack Journey
              </p>
            </div>

            <div
              className={`mb-8 flex justify-center gap-3 transition-all delay-500 duration-700 sm:mb-10 sm:gap-4 lg:mb-12 ${
                imageVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-base-content/10 bg-base-200/50 text-lg text-base-content/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-primary hover:text-primary-content hover:shadow-lg sm:h-14 sm:w-14 sm:text-xl"
                  aria-label={`Visit my ${social.name} profile`}
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    className="transition-all duration-300 group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>

          <div
            ref={contentRef}
            className={`mx-auto max-w-4xl transition-all delay-700 duration-1000 ${
              contentVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <div className="mb-10 grid grid-cols-1 gap-6 sm:mb-12 sm:gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-base-content/10 bg-base-200/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-base-200/70 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 sm:h-10 sm:w-10">
                    <FontAwesomeIcon
                      icon={faCode}
                      className="text-sm text-primary sm:text-base"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-base-content sm:text-xl">
                    Frontend Passion
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-base-content/80 sm:text-base">
                  I'm a passionate{" "}
                  <span className="font-bold text-primary">
                    Frontend Web Developer
                  </span>{" "}
                  who enjoy creating responsive, clean, and user-friendly web interfaces while continuously learning and improving my skills to build modern digital experiences.
                </p>
              </div>

              <div className="rounded-2xl border border-base-content/10 bg-base-200/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-base-200/70 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/20 sm:h-10 sm:w-10">
                    <FontAwesomeIcon
                      icon={faRocket}
                      className="text-sm text-secondary sm:text-base"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-base-content sm:text-xl">
                    Full-Stack Journey
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-base-content/80 sm:text-base">
                  Currently expanding into{" "}
                  <span className="font-bold text-secondary">
                    backend development
                  </span>{" "}
                  to become a versatile{" "}
                  <span className="font-bold text-accent">
                    Full-Stack Developer
                  </span>
                  . Building end-to-end solutions that create real impact for
                  users and businesses.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="mx-auto mb-6 max-w-2xl px-4 text-base text-base-content/80 sm:mb-8 sm:text-lg">
                Ready to bring your ideas to life? Let's collaborate and create
                something amazing together!
              </p>
              <Button link="#contact" btn="Let's Work Together" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
