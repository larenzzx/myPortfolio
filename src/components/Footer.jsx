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
      
      <aside>
        <p>
          © {new Date().getFullYear()} Mark Larenz Tabotabo. All rights reserved.
        </p>
      </aside>
    </footer>
  );
};
