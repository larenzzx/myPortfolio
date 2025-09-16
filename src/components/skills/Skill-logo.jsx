import { ObserverProvider } from "../ObserverProvider";

export const SkillLogo = ({ logos, tooltip, delay = 0 }) => {
  return (
    <ObserverProvider>
      <div
        className="group tooltip tooltip-primary"
        data-tip={tooltip}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="intersect-once intersect:animate-fade-in intersect:animate-duration-700 intersect:animate-delay-300 relative size-24 text-base-content intersect:motion-preset-slide-right-lg intersect:motion-duration-[1500ms] intersect:motion-delay-[500ms] intersect:motion-ease-bounce md:size-28 lg:size-32">
          <div className="absolute inset-0 transform rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 blur-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100"></div>

          <div className="relative flex size-full items-center justify-center rounded-3xl border border-base-content/10 bg-base-100/80 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 group-hover:bg-base-100/90">
            <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 p-4">
              <img
                src={logos}
                className="size-12 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 md:size-16 lg:size-20"
                alt={tooltip}
              />
            </div>

            <div className="animate-shine absolute inset-0 -skew-x-12 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          </div>
        </div>
      </div>
    </ObserverProvider>
  );
};
