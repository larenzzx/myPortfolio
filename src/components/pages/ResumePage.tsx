import { useEffect, useState } from "react";
import { FileDown, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export const ResumePage = () => {
  const [resumeUrl, setResumeUrl] = useState("/Tabotabo_resume.pdf");

  useEffect(() => {
    supabase
      .from("projects")
      .select("live_link")
      .eq("slug", "resume-file")
      .maybeSingle()
      .then(({ data }) => {
        if (data && data.live_link) {
          setResumeUrl(data.live_link);
        }
      });
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-bg p-5 shadow-sm sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="pl-2 mb-2">
            <Link to="/">
              <ArrowLeft size={15} className="mr-1.5" />
              Back to Home
            </Link>
          </Button>
          <h2 className="text-2xl font-bold text-ink sm:text-3xl font-serif">Resume</h2>
          <p className="mt-1 text-sm text-gray-500">
            View or download Mark Larenz Tabotabo's professional resume.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} className="mr-1.5" />
              Open in New Tab
            </a>
          </Button>
          <Button size="sm" asChild>
            <a
              href={resumeUrl}
              download="Tabotabo_resume.pdf"
            >
              <FileDown size={14} className="mr-1.5" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>

      {/* PDF Viewer / Fallback Banner */}
      <div className="flex flex-col gap-4">
        {/* Mobile helper notice */}
        <div className="block lg:hidden rounded-xl border border-support/20 bg-support/5 p-4 text-xs text-support leading-relaxed">
          <strong>Mobile Viewing Note:</strong> If the PDF does not display below, tap the 
          <strong> Download PDF</strong> or <strong>Open in New Tab</strong> buttons above to view the resume.
        </div>

        {/* PDF Embedded Iframe */}
        <div className="relative h-[80vh] w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/10 dark:bg-gray-950/5">
          <iframe
            src={`${resumeUrl}#toolbar=1`}
            className="h-full w-full border-0"
            title="Mark Larenz Tabotabo Resume"
          />
        </div>
      </div>
    </div>
  );
};
