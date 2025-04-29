import { ObserverProvider } from "../ObserverProvider";

export const SkillLogo = ({ logos, tooltip }) => {
  return (
    <ObserverProvider>
      <div
        className="intersect-once tooltip tooltip-primary flex size-20 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.2)] bg-gray-400 bg-opacity-10 bg-clip-padding p-3 transition duration-300 ease-in intersect:motion-preset-slide-right-lg hover:scale-105 hover:border-[rgba(255,255,255,0.5)] hover:bg-opacity-20 hover:shadow-lg intersect:motion-duration-1500 intersect:motion-delay-500 intersect:motion-ease-bounce md:size-28"
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
