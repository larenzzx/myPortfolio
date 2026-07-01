import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Clock, Mail, MapPin } from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import { ContactMe } from "./ContactCTA";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "marklarenztabotabo@gmail.com",
    href: "mailto:marklarenztabotabo@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Zamboanga City, Philippines",
    href: null,
  },
  {
    icon: Clock,
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
    <section className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg px-5 py-10 shadow-sm sm:px-8 lg:px-10">
      <SectionTitle id="contact" title="Contact Me" />

      <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/15 dark:bg-gray-950/5 p-5 sm:p-6">
          <div>
            <h3 className="text-2xl font-bold text-ink font-serif">
              Let&apos;s Work Together
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              I&apos;m always open to new opportunities and interesting projects.
              Whether you have something in mind or just want to connect. I&apos;d
              love to hear from you.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const Inner = (
                <div className="flex items-center gap-4 rounded-xl border border-gray-200/40 dark:border-gray-800/40 bg-bg p-4 transition-colors duration-200 hover:border-build/30">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-build/15 bg-build/5 text-build">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-gray-400">{item.label}</p>
                    <p className="break-all text-sm font-semibold text-ink sm:break-normal">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Inner}
                </a>
              ) : (
                <div key={item.label}>{Inner}</div>
              );
            })}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
              Connect with me
            </p>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-bg p-3 transition-colors duration-200 hover:border-build/30 hover:text-build"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200/50 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-950 text-gray-500">
                    <FontAwesomeIcon icon={link.icon} className="text-base" />
                  </div>
                  <span className="text-sm font-medium text-ink">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <ContactMe />
      </div>
    </section>
  );
};
