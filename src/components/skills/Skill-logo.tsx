export const SkillLogo = ({ logos, tooltip, delay = 0, type = "img" }) => {
  return (
    <div
      className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-bg p-4 transition-[border-color,transform,box-shadow] duration-300 ease-spring hover:-translate-y-1 hover:border-build/30 hover:shadow-md hover:shadow-build/5 intersect-once intersect:motion-translate-y-in-[8px] intersect:motion-fade-in intersect:motion-duration-[450ms] motion-reduce:motion-none"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon container — fixed size guarantees centering uniformity */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
        {type === "lucide" ? (
          <div className="flex items-center justify-center text-gray-400 transition-colors duration-300 group-hover:text-ink">
            {logos}
          </div>
        ) : (
          <img
            src={logos}
            alt={tooltip}
            width={36}
            height={36}
            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </div>

      {/* Skill name — always visible, centered, no truncation */}
      <span className="line-clamp-2 text-center text-[11px] font-mono font-medium leading-snug text-gray-500 group-hover:text-ink transition-colors">
        {tooltip}
      </span>
    </div>
  );
};
