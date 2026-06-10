export const SkillLogo = ({ logos, tooltip, delay = 0, type = "img" }) => {
  return (
    <div
      className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-base-content/10 bg-base-200 p-4 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/20 intersect-once intersect:motion-translate-y-in-[8px] intersect:motion-fade-in intersect:motion-duration-[450ms] motion-reduce:motion-none"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon container — fixed size guarantees centering uniformity */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
        {type === "lucide" ? (
          <div className="flex items-center justify-center text-primary/70 transition-colors duration-300 group-hover:text-primary">
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
      <span className="line-clamp-2 text-center text-xs font-medium leading-snug text-base-content">
        {tooltip}
      </span>
    </div>
  );
};
