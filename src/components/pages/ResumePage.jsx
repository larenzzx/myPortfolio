import { FileDown, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export const ResumePage = () => {
  return (
    <div className="rounded-3xl border border-base-content/10 bg-base-100 p-5 shadow-sm sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/" className="btn btn-ghost btn-sm gap-1.5 rounded-xl pl-2 mb-2">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h2 className="text-2xl font-bold text-base-content sm:text-3xl">Resume</h2>
          <p className="mt-1 text-sm text-base-content/55">
            View or download Mark Larenz Tabotabo's professional resume.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <a
            href="/Tabotabo_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm sm:btn-md rounded-xl gap-2"
          >
            <ExternalLink size={16} />
            Open in New Tab
          </a>
          <a
            href="/Tabotabo_resume.pdf"
            download="Tabotabo_resume.pdf"
            className="btn btn-primary btn-sm sm:btn-md rounded-xl gap-2"
          >
            <FileDown size={16} />
            Download PDF
          </a>
        </div>
      </div>

      {/* PDF Viewer / Fallback Banner */}
      <div className="flex flex-col gap-4">
        {/* Mobile helper notice */}
        <div className="block lg:hidden rounded-xl border border-info/20 bg-info/10 p-4 text-xs text-info leading-relaxed">
          <strong>Mobile Viewing Note:</strong> If the PDF does not display below, tap the 
          <strong> Download PDF</strong> or <strong>Open in New Tab</strong> buttons above to view the resume.
        </div>

        {/* PDF Embedded Iframe */}
        <div className="relative h-[80vh] w-full overflow-hidden rounded-2xl border border-base-content/10 bg-base-200/50">
          <iframe
            src="/Tabotabo_resume.pdf#toolbar=1"
            className="h-full w-full"
            title="Mark Larenz Tabotabo Resume"
          />
        </div>
      </div>
    </div>
  );
};
