import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export const LiveView = ({ isLiveView, links }) => {
  if (isLiveView) {
    return (
      <a
        href={links}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-success gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        <FontAwesomeIcon
          icon={faExternalLinkAlt}
          className="text-xs transition-transform duration-300 group-hover:rotate-12"
        />
        Live View
      </a>
    );
  }
  return null;
};