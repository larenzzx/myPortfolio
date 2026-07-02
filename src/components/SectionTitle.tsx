interface SectionTitleProps {
  title: string;
  id?: string;
  eyebrow?: string;
}

export const SectionTitle = ({ title, id, eyebrow }: SectionTitleProps) => {
  return (
    <div
      id={id}
      className="mb-7 scroll-mt-24 border-b border-gray-200/60 dark:border-gray-800/60 pb-5 intersect-once intersect:motion-translate-y-in-[12px] intersect:motion-fade-in"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex rounded border border-gray-200 dark:border-gray-800 bg-bg px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gray-400">
            {eyebrow ?? title.toLowerCase().replace(/\s+/g, "-")}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-normal text-ink sm:text-3xl font-serif">
            {title}
          </h2>
        </div>
        <div className="hidden h-px flex-1 bg-gray-200/50 dark:bg-gray-800/50 sm:block" />
      </div>
    </div>
  );
};
