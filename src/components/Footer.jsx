import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer className="footer-horizontal footer footer-center rounded bg-base-200 p-4 text-base-content">
      <nav>
        <div className="grid grid-flow-col gap-4 text-2xl">
          <a href="https://github.com/larenzzx">
            <FontAwesomeIcon icon={faGithub} className="motion-preset-seesaw motion-delay-75" />
          </a>
          <a href="https://www.facebook.com/marklarenz.tabotabo?mibextid=wwXIfr&rdid=41mPboavCJj7LpdE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AMy9Kz15z%2F%3Fmibextid%3DwwXIfr">
            <FontAwesomeIcon icon={faFacebook} className="motion-preset-seesaw motion-delay-0" />
          </a>
          <a href="https://www.linkedin.com/in/mark-larenz-tabotabo-681216346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
            <FontAwesomeIcon icon={faLinkedin} className="motion-preset-seesaw motion-delay-150" />
          </a>
          <a href="https://x.com/larenzz15?s=21">
            <FontAwesomeIcon icon={faTwitter} className="motion-preset-seesaw motion-delay-100" />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Mark
          Larenz Tabotabo
        </p>
      </aside>
    </footer>
  );
};
