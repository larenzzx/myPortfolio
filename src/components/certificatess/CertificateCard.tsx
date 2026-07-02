import { useEffect, useState, useRef } from "react";
import { ZoomIn, ExternalLink, Download, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

export const CertificateCard = ({ cert, config, index = 0 }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
      a.download = `${cert.title}.${cert.isPdf ? "pdf" : "png"}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      console.error("Download failed");
    }
  };

  const { Icon, colorClass, badgeClass } = config;

  let hoverTone = "hover:border-gray-400 dark:hover:border-gray-600";
  if (colorClass === "text-build") hoverTone = "hover:border-build/40 hover:shadow-build/5";
  else if (colorClass === "text-defend") hoverTone = "hover:border-defend/40 hover:shadow-defend/5";
  else if (colorClass === "text-support") hoverTone = "hover:border-support/40 hover:shadow-support/5";

  return (
    <>
      <div
        className="intersect-once h-full intersect:motion-translate-y-in-[18px] intersect:motion-duration-[0.5s] intersect:motion-ease-spring-smooth"
        style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className={`group relative flex h-full flex-col gap-3 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-bg p-5 shadow-sm transition-all duration-300 ease-spring hover:-translate-y-0.5 spotlight-card ${hoverTone}`}
        >
          {/* Header row: category badge + year */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-mono font-medium ${badgeClass}`}>
              <Icon size={10} strokeWidth={2} />
              {config.label}
            </span>
            {cert.year && (
              <span className="font-mono text-[10px] text-gray-400">
                {cert.year}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={`text-sm font-semibold leading-snug text-ink font-serif transition-colors duration-200 ${
            colorClass === "text-build" 
              ? "group-hover:text-build" 
              : colorClass === "text-defend" 
              ? "group-hover:text-defend" 
              : "group-hover:text-support"
          }`}>
            {cert.title}
          </h3>

          {/* Issuer */}
          {cert.issuer && (
            <p className={`text-xs font-mono font-medium ${colorClass}`}>
              {cert.issuer}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* View button */}
          {cert.image && (
            <button
              onClick={openModal}
              className={`flex items-center gap-1 text-[11px] font-semibold text-gray-400 bg-transparent border-0 outline-none cursor-pointer transition-colors ${
                colorClass === "text-build"
                  ? "hover:text-build"
                  : colorClass === "text-defend"
                  ? "hover:text-defend"
                  : "hover:text-support"
              }`}
            >
              <ZoomIn size={12} strokeWidth={2} />
              View Certificate
            </button>
          )}
        </div>
      </div>

      {/* ── Modal (shadcn Dialog) ────────────────────────────── */}
      <Dialog open={open} onOpenChange={(val) => { if (!val) closeModal(); }}>
        <DialogContent hideCloseButton className="max-w-4xl bg-bg border-gray-200 dark:border-gray-800 p-0 overflow-hidden flex flex-col gap-0 select-none">
          {/* Action bar */}
          <div className="flex w-full items-center justify-between bg-gray-900/90 border-b border-gray-800 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-mono font-medium ${badgeClass}`}>
                <Icon size={10} />
                {config.label}
              </span>
              <span className="text-sm font-semibold text-gray-100 font-serif truncate max-w-[200px] sm:max-w-md">
                {cert.title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleDownload}
                className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-gray-100 transition-colors bg-transparent border-0 cursor-pointer"
                aria-label="Download"
              >
                <Download size={16} />
              </button>
              <button
                onClick={() => window.open(cert.image, "_blank")}
                className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-gray-100 transition-colors bg-transparent border-0 cursor-pointer"
                aria-label="Open in new tab"
              >
                <ExternalLink size={16} />
              </button>
              <DialogClose asChild>
                <button
                  className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-gray-100 transition-colors bg-transparent border-0 cursor-pointer"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </DialogClose>
            </div>
          </div>

          {/* Image or PDF */}
          <div className="flex justify-center items-center w-full bg-gray-950/20">
            {cert.isPdf ? (
              <iframe
                src={cert.image}
                title={cert.title}
                className="w-full h-[70vh] border-0"
              />
            ) : (
              <img
                src={cert.image}
                alt={cert.title}
                className="max-h-[75vh] max-w-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
