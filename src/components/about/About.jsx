import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import myImg from "../../assets/me.jpg";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SectionTitle } from "../SectionTitle";

const ObserverProvider = ({ children }) => <div>{children}</div>;

const Button = ({ link, btn }) => (
  <a
    href={link}
    className="group btn btn-primary btn-lg relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      <FontAwesomeIcon icon={faEnvelope} />
      {btn}
    </span>
    <div className="absolute inset-0 translate-x-full -skew-x-12 transform bg-gradient-to-r from-primary/20 to-secondary/20 transition-transform duration-700 group-hover:translate-x-0"></div>
  </a>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
      <div className="container mx-auto px-4 py-20">
        <ObserverProvider>
          <SectionTitle id="about" title="About Me" />

          <div className="intersect-once intersect:motion-translate-y-in-100 intersect:motion-duration-[1.5s] intersect:motion-ease-spring-smooth">
            {/* Main Content */}
            <div className="hero">
              <div className="hero-content max-w-6xl flex-col gap-16 lg:flex-row lg:gap-20">
                {/* Image Section */}
                <div className="group relative">
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-30"></div>
                  <div className="relative">
                    <img
                      src={myImg}
                      alt="Mark Larenz Tabotabo"
                      className="h-72 w-72 rounded-2xl border-4 border-white/10 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-8 text-center lg:text-left">
                  {/* Header */}
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                      Mark Larenz Tabotabo
                    </h1>
                  </div>

                  {/* Description */}
                  <div className="space-y-6 text-base leading-relaxed lg:text-lg">
                    <p className="opacity-90">
                      I am a passionate{" "}
                      <span className="font-semibold text-primary">
                        Frontend Web Developer
                      </span>{" "}
                      with a strong foundation in building responsive and modern
                      web interfaces using HTML, CSS, JavaScript, and React. I
                      enjoy turning ideas into clean, user-friendly digital
                      experiences that balance functionality with design.
                    </p>

                    <p className="opacity-90">
                      With a continuous drive for learning, I am expanding my
                      knowledge into{" "}
                      <span className="font-semibold text-primary">
                        backend development
                      </span>{" "}
                      to strengthen my skills and transition into a versatile{" "}
                      <span className="font-semibold text-primary">
                        Full-Stack Developer
                      </span>
                      . My goal is to deliver end-to-end solutions that create
                      meaningful impact for both users and businesses.
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-4 lg:justify-start">
                    {[
                      {
                        icon: faGithub,
                        url: "https://github.com/larenzzx",
                        color: "hover:text-gray-900",
                      },
                      {
                        icon: faFacebook,
                        url: "https://www.facebook.com/marklarenz.tabotabo?mibextid=wwXIfr&rdid=41mPboavCJj7LpdE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AMy9Kz15z%2F%3Fmibextid%3DwwXIfr",
                        color: "hover:text-blue-600",
                      },
                      {
                        icon: faLinkedin,
                        url: "https://www.linkedin.com/in/mark-larenz-tabotabo-681216346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                        color: "hover:text-blue-700",
                      },
                      {
                        icon: faTwitter,
                        url: "https://x.com/larenzz15?s=21",
                        color: "hover:text-sky-500",
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-base-200/50 text-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color} group`}
                      >
                        <FontAwesomeIcon
                          icon={social.icon}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </a>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button link="#contact" btn="Let's Work Together" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ObserverProvider>
      </div>
    </div>
  );
};

export default About;
