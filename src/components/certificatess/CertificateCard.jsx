import React, { useState } from "react";
import { X, ZoomIn, Download, ExternalLink } from "lucide-react";
import { ObserverProvider } from "../ObserverProvider";

export const CertificateCard = ({ certificate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(certificate.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificate.title || "certificate"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // click outside modal to close
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <ObserverProvider>
        <div className="intersect-once group glass relative cursor-pointer rounded-lg shadow-md duration-300 ease-in-out hover:scale-105 intersect:motion-translate-x-in-[-57%] intersect:motion-translate-y-in-[2%]">
          {/* Main Certificate Image */}
          <div
            className="relative overflow-hidden rounded-xl"
            onClick={openModal}
          >
            <img
              src={certificate.image}
              alt={certificate.title}
              className="h-full w-full rounded-xl border border-gray-200 object-cover transition-all duration-300 group-hover:brightness-75"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black bg-opacity-0 opacity-0 transition-all duration-300 group-hover:bg-opacity-30 group-hover:opacity-100">
              <div className="scale-75 transform text-center text-white transition-transform duration-300 group-hover:scale-100">
                <ZoomIn size={32} className="mx-auto mb-2" />
                <p className="text-sm font-medium">Click to view full size</p>
              </div>
            </div>
          </div>

          {/* Certificate Title (if provided) */}
          {certificate.title && (
            <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-gradient-to-t from-black via-black/70 to-transparent p-4">
              <h3 className="truncate text-sm font-semibold text-white">
                {certificate.title}
              </h3>
            </div>
          )}
        </div>
      </ObserverProvider>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="animate-fadeInn fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm"
          onClick={handleModalClick}
        >
          <div className="relative flex h-full max-h-full w-full max-w-7xl items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all duration-300 hover:scale-110 hover:bg-opacity-70"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Action Buttons */}
            <div className="absolute left-4 top-4 z-10 flex gap-2">
              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="rounded-full bg-black bg-opacity-50 p-2 text-white transition-all duration-300 hover:scale-110 hover:bg-opacity-70"
                aria-label="Download certificate"
                title="Download"
              >
                <Download size={20} />
              </button>

              {/* Open in New Tab Button */}
              <button
                onClick={() => window.open(certificate.image, "_blank")}
                className="rounded-full bg-black bg-opacity-50 p-2 text-white transition-all duration-300 hover:scale-110 hover:bg-opacity-70"
                aria-label="Open in new tab"
                title="Open in new tab"
              >
                <ExternalLink size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="animate-scaleIn relative max-h-full max-w-full">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              />

              {/* Certificate Info */}
              {certificate.title && (
                <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <h2 className="mb-2 text-xl font-bold text-white">
                    {certificate.title}
                  </h2>
                  {certificate.description && (
                    <p className="text-sm text-gray-200">
                      {certificate.description}
                    </p>
                  )}
                  {certificate.issuer && (
                    <p className="mt-1 text-xs text-gray-300">
                      Issued by: {certificate.issuer}
                    </p>
                  )}
                  {certificate.date && (
                    <p className="text-xs text-gray-300">
                      Date: {certificate.date}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform text-center text-white">
              <p className="text-sm opacity-75">
                Press{" "}
                <kbd className="rounded bg-white bg-opacity-20 px-2 py-1 text-xs">
                  ESC
                </kbd>{" "}
                or click outside to close
              </p>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
