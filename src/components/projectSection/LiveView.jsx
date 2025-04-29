export const LiveView = ({ isLiveView, links }) => {
  if (isLiveView) {
    return (
      <a
        href={links}
        className="badge badge-outline flex items-center justify-center gap-x-1 py-3"
      >
        Live view
      </a>
    );
  }
};
