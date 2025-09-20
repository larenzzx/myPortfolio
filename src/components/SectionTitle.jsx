import { useState, useEffect, useRef } from "react";

const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

export const SectionTitle = ({ title, id }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-50px",
  });

  return (
    <div ref={ref} id={id} className="pb-6 pt-28 text-center">
      <h1
        className={`bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-bold text-transparent transition-all duration-1000 sm:text-5xl ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {title}
      </h1>
      <div
        className={`mt-4 h-1 rounded-full bg-gradient-to-r from-primary to-secondary transition-all delay-300 duration-1000 ${
          isVisible ? "w-24 opacity-100" : "w-0 opacity-0"
        } mx-auto`}
      />
    </div>
  );
};
