interface SectionTitleProps {
  title: string;
  id?: string;
  eyebrow?: string;
}

export const SectionTitle = ({ title, id, eyebrow }: SectionTitleProps) => {
  return (
    <div
      id={id}
      className="mb-7 scroll-mt-24 border-b border-gray-200 dark:border-gray-800 pb-5 intersect-once intersect:motion-translate-y-in-[12px] intersect:motion-fade-in"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-gray-400 block mb-1">
            {eyebrow ?? title.toLowerCase().replace(/\s+/g, "-")}
          </span>
          <h1 className="font-pixel text-3xl sm:text-4xl md:text-[3rem] font-black lowercase tracking-tight leading-none text-ink">
            {title}
          </h1>
        </div>
        <div className="hidden h-px flex-1 bg-gray-200 dark:bg-gray-800 sm:block ml-4 mb-2" />
      </div>
    </div>
  );
};
