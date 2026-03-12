import { useRef, useState, useEffect, useMemo } from "react";

export const SkillLogo = ({ logos, tooltip, delay = 0, type = "img" }) => {
  const ref = useRef(null);

  // Respect prefers-reduced-motion — start visible immediately if reduced
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    []
  );

  const [visible, setVisible] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced]);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-base-content/10 bg-base-200 p-4 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/20"
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: "opacity, transform",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
      }}
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
