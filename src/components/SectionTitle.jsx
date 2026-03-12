import { useState, useEffect, useRef } from "react";

export const SectionTitle = ({ title, id }) => {
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
    <div ref={ref} id={id} className="scroll-mt-16 mb-10 text-center">
      {/* Eyebrow */}
      <span
        className={`inline-block font-mono text-xs tracking-widest text-primary uppercase mb-3 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        // {title.toLowerCase().replace(/\s+/g, "-")}
      </span>

      {/* Title */}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-bold text-base-content transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {title}
      </h2>

      {/* Accent divider */}
      <div
        className={`mt-4 flex items-center justify-center gap-2 transition-all duration-700 delay-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
      </div>
    </div>
  );
};
