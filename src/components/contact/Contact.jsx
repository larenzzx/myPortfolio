import { SectionTitle } from "../SectionTitle";
import { ContactMe } from "./ContactCTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const contactInfo = [
  {
    icon: (
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "marklarenztabotabo@gmail.com",
    href: "mailto:marklarenztabotabo@gmail.com",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Zamboanga City, Philippines",
    href: null,
  },
  {
    icon: (
      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Response Time",
    value: "Usually within 24 hours",
    href: null,
  },
];

const socialLinks = [
  {
    icon: faGithub,
    label: "GitHub",
    href: "https://github.com/larenzzx",
  },
  {
    icon: faLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mark-larenz-tabotabo-681216346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    icon: faFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/marklarenz.tabotabo?mibextid=wwXIfr&rdid=41mPboavCJj7LpdE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AMy9Kz15z%2F%3Fmibextid%3DwwXIfr",
  },
  {
    icon: faInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/larenzzzx?igsh=MW1uMXNwdW9hZGowYw%3D%3D&utm_source=qr",
  },
];

export const Contact = () => {
  return (
    <div className="bg-base-200 px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle id="contact" title="Contact Me" />

        <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-2">
          {/* ── Left: Info + Social ── */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-base-content sm:text-2xl">
                Let&apos;s Work Together
              </h3>
              <p className="text-sm leading-relaxed text-base-content/70 sm:text-base">
                I&apos;m always open to new opportunities and interesting
                projects. Whether you have something in mind or just want to
                connect — I&apos;d love to hear from you.
              </p>
            </div>

            {/* Contact detail rows */}
            <div className="space-y-3">
              {contactInfo.map((item, i) => {
                const Inner = (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl bg-base-100 p-4 transition-colors duration-200 hover:bg-base-300"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-base-content/50">{item.label}</p>
                      <p className="break-all text-sm font-medium text-base-content sm:break-normal sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={i} href={item.href} target="_blank" rel="noopener noreferrer">
                    {Inner}
                  </a>
                ) : (
                  <div key={i}>{Inner}</div>
                );
              })}
            </div>

            {/* Social links as card rows */}
            <div>
              <p className="mb-3 text-sm text-base-content/50">Connect with me</p>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-base-100 p-3 transition-colors duration-200 hover:bg-base-300 hover:text-primary"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-base-200">
                      <FontAwesomeIcon icon={link.icon} className="text-base" />
                    </div>
                    <span className="text-sm font-medium text-base-content transition-colors duration-200 group-hover:text-primary">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="w-full">
            <ContactMe />
          </div>
        </div>
      </div>
    </div>
  );
};
