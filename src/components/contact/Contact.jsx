import { SectionTitle } from "../SectionTitle";
import { ContactMe } from "./ContactCTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const Contact = () => {
  return (
    <div className="container grid min-h-screen">
      <SectionTitle id="contact" title="Contact Me" />
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Contact Info Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-base-content">
                Let's Work Together
              </h3>
              <p className="text-lg leading-relaxed text-base-content/80">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a project in mind or just want to
                connect, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="group flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Email</p>
                  <p className="font-medium text-base-content">
                    marklarenztabotabo@gmail.com
                  </p>
                </div>
              </div>

              <div className="group flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Location</p>
                  <p className="font-medium text-base-content">
                    Zamboanga City, Philippines
                  </p>
                </div>
              </div>

              <div className="group flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Response Time</p>
                  <p className="font-medium text-base-content">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-base-300 pt-6">
              <p className="mb-4 text-sm text-base-content/60">
                Connect with me on
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/marklarenz.tabotabo?mibextid=wwXIfr&rdid=41mPboavCJj7LpdE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AMy9Kz15z%2F%3Fmibextid%3DwwXIfr"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-base-200 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-content"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="motion-preset-seesaw size-6 motion-delay-100"
                  />
                </a>
                <a
                  href="https://x.com/larenzz15?s=21"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-base-200 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-content"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="motion-preset-seesaw size-6 motion-delay-100"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/mark-larenz-tabotabo-681216346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-base-200 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-content"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="motion-preset-seesaw size-6 motion-delay-150"
                  />
                </a>
                <a
                  href="https://github.com/larenzzx"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-base-200 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-content"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="motion-preset-seesaw size-6 motion-delay-75"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="w-full">
            <ContactMe />
          </div>
        </div>
      </div>
    </div>
  );
};
