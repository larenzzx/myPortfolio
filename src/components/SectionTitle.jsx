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
    <div ref={ref} id={id} className="mb-10 scroll-mt-24 text-center">
      <span
        className={`mb-3 inline-block font-mono text-xs uppercase tracking-widest text-primary transition-all duration-500 ease-spring ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {"// "}
        {eyebrow ?? title.toLowerCase().replace(/\s+/g, "-")}
      </span>

      <h2
        className={`text-3xl font-bold text-base-content transition-all delay-100 duration-700 ease-spring sm:text-4xl md:text-5xl ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {title}
      </h2>

      <div
        className={`mt-4 flex items-center justify-center gap-2 transition-all duration-700 ease-spring delay-200 ${
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
