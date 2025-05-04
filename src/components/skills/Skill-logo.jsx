import { ObserverProvider } from "../ObserverProvider";

export const SkillLogo = ({ logos, tooltip }) => {
  return (
    <ObserverProvider>
      <div
        className="intersect-once tooltip tooltip-primary flex size-20 md:size-28 items-center justify-center rounded-2xl border border-base-content/20 bg-base-100/10 bg-clip-padding p-3 transition duration-300 ease-in intersect:motion-preset-slide-right-lg hover:scale-105 hover:border-base-content/50 hover:bg-opacity-20 hover:shadow-lg intersect:motion-duration-[1500ms] intersect:motion-delay-[500ms] intersect:motion-ease-bounce text-base-content"
        data-tip={tooltip}
      >
        <img
          src={logos}
          className="size-20 object-contain hover:animate-pulse md:size-24"
          alt={tooltip}
        />
      </div>
    </ObserverProvider>
  );
};
