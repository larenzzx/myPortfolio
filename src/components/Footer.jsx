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
          <a>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a>
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faLinkedin} />
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
