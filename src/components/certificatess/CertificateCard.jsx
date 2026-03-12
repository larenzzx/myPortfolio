import { useState } from "react";
import { ZoomIn, X, ExternalLink, Download } from "lucide-react";
import { ObserverProvider } from "../ObserverProvider";

export const CertificateCard = ({ cert, config }) => {
  const [open, setOpen] = useState(false);

  /* ── Keyboard / scroll lock ─────────────────────────────── */
  const openModal = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  const handleKey = (e) => {
    if (e.key === "Escape") closeModal();
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(cert.image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cert.title}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      console.error("Download failed");
    }
  };

  const { Icon, colorClass, badgeClass } = config;

  return (
    <>
      <ObserverProvider>
        <div className="intersect-once intersect:motion-translate-y-in-100 intersect:motion-duration-[1s] intersect:motion-ease-spring-smooth">
          <div className="group flex h-full flex-col gap-3 rounded-2xl border border-base-content/10 bg-base-100 p-5 transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5">

            {/* Header row: category badge + year */}
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${badgeClass}`}>
                <Icon size={10} strokeWidth={2} />
                {config.label}
              </span>
              {cert.year && (
                <span className="font-mono text-[10px] text-base-content/40">
                  {cert.year}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold leading-snug text-base-content transition-colors duration-200 group-hover:text-primary">
              {cert.title}
            </h3>

            {/* Issuer */}
            {cert.issuer && (
              <p className={`text-xs font-medium ${colorClass}`}>
                {cert.issuer}
              </p>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* View button */}
            {cert.image && (
              <button
                onClick={openModal}
                className="btn btn-ghost btn-xs mt-1 w-fit gap-1.5 px-0 text-base-content/50 hover:text-primary"
              >
                <ZoomIn size={12} strokeWidth={2} />
                View Certificate
              </button>
            )}
          </div>
        </div>
      </ObserverProvider>

      {/* ── Modal ────────────────────────────────────────────── */}
      {open && (
        <div
          className="animate-fadeInn fixed inset-0 z-50 flex items-center justify-center bg-base-content/80 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          onKeyDown={handleKey}
          role="dialog"
          aria-modal="true"
          aria-label={cert.title}
        >
          <div className="animate-scaleIn relative flex max-h-[90vh] max-w-4xl flex-col items-center gap-4">
            {/* Action bar */}
            <div className="flex w-full items-center justify-between rounded-xl bg-base-100/10 px-4 py-2 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${badgeClass}`}>
                  <Icon size={10} />
                  {config.label}
                </span>
                <span className="text-sm font-semibold text-base-100">
                  {cert.title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleDownload}
                  className="btn btn-ghost btn-sm text-base-100/80 hover:text-base-100"
                  aria-label="Download"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => window.open(cert.image, "_blank")}
                  className="btn btn-ghost btn-sm text-base-100/80 hover:text-base-100"
                  aria-label="Open in new tab"
                >
                  <ExternalLink size={16} />
                </button>
                <button
                  onClick={closeModal}
                  className="btn btn-ghost btn-sm text-base-100/80 hover:text-base-100"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Image or PDF */}
            {cert.isPdf ? (
              <iframe
                src={cert.image}
                title={cert.title}
                className="w-[90vw] max-w-4xl rounded-xl shadow-2xl"
                style={{ height: "75vh" }}
              />
            ) : (
              <img
                src={cert.image}
                alt={cert.title}
                className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl"
              />
            )}

            <p className="text-xs text-base-100/50">
              Press <kbd className="rounded bg-base-100/10 px-1.5 py-0.5">ESC</kbd> or click outside to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};
