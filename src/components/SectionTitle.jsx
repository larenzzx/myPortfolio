import { useState, useEffect, useRef } from "react";

export const SectionTitle = ({ title, id, eyebrow }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`mb-7 scroll-mt-24 border-b border-base-content/10 pb-5 transition-all duration-500 ease-spring ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-primary">
            {eyebrow ?? title.toLowerCase().replace(/\s+/g, "-")}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-normal text-base-content sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="hidden h-px flex-1 bg-base-content/10 sm:block" />
      </div>
    </div>
  );
};
