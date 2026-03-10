import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import TypingAnimation from "./TypingAnimation";

function Hero() {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const prefersReduced = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    if (prefersReduced.current) return;

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let ticking = false;

    const update = () => {
      setTransform({
        x: mouseX * 0.25,
        y: scrollY * 0.15 + mouseY * 0.25,
      });
      ticking = false;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      if (!ticking) {
        rafRef.current = requestAnimationFrame(update);
        ticking = true;
      }
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
      if (!ticking) {
        rafRef.current = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-100 flex items-center justify-center">
      {/* Animated grid background with parallax */}
      <div
        className="absolute inset-0 hero-grid-bg opacity-40"
        style={{
          transform: prefersReduced.current
            ? "none"
            : `translate(${transform.x}px, ${transform.y}px)`,
          willChange: "transform",
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      {/* Floating circuit nodes — motion-safe so reduced-motion users see static dots */}
      <div className="absolute top-[15%] left-[8%] w-2 h-2 rounded-full bg-primary/40 motion-safe:animate-pulse" />
      <div
        className="absolute top-[30%] right-[20%] w-1.5 h-1.5 rounded-full bg-accent/30 motion-safe:animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-[55%] left-[15%] w-1.5 h-1.5 rounded-full bg-secondary/40 motion-safe:animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-[20%] right-[35%] w-1.5 h-1.5 rounded-full bg-primary/30 motion-safe:animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute top-[45%] right-[5%] w-2 h-2 rounded-full bg-accent/40 motion-safe:animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-[70%] right-[12%] w-2 h-2 rounded-full bg-secondary/30 motion-safe:animate-pulse"
        style={{ animationDelay: "0.8s" }}
      />
      <div
        className="absolute top-[65%] left-[42%] w-1 h-1 rounded-full bg-primary/50 motion-safe:animate-pulse"
        style={{ animationDelay: "3s" }}
      />

      {/* Connecting SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      >
        <line
          x1="8%" y1="15%" x2="20%" y2="30%"
          stroke="hsl(var(--p))" strokeWidth="0.5" strokeDasharray="4 4"
        />
        <line
          x1="80%" y1="70%" x2="65%" y2="45%"
          stroke="hsl(var(--p))" strokeWidth="0.5" strokeDasharray="4 4"
        />
        <line
          x1="35%" y1="20%" x2="50%" y2="35%"
          stroke="hsl(var(--s))" strokeWidth="0.5" strokeDasharray="4 4"
        />
        <line
          x1="15%" y1="55%" x2="30%" y2="80%"
          stroke="hsl(var(--a))" strokeWidth="0.5" strokeDasharray="4 4"
        />
      </svg>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto w-full">
        {/* Role badges with subtle glow */}
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <span
            className="badge badge-primary badge-lg font-mono shadow-md shadow-primary/25 motion-safe:animate-pulse"
            style={{ animationDuration: "3s" }}
          >
            &lt; Web Developer /&gt;
          </span>
          <span
            className="badge badge-secondary badge-lg font-mono shadow-md shadow-secondary/25 motion-safe:animate-pulse"
            style={{ animationDuration: "3s", animationDelay: "1.5s" }}
          >
            [ SOC Analyst ]
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-base-content leading-tight mb-4">
          I build for the web.
          <br />
          <span className="text-primary">I defend it too.</span>
        </h1>

        {/* Typewriter row — "I'm" and TypingAnimation are siblings, not nested */}
        <div className="flex items-center justify-center gap-x-2 text-2xl sm:text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            I&apos;m
          </span>
          <TypingAnimation />
        </div>

        <p className="text-lg sm:text-xl text-base-content/60 mb-10 max-w-xl mx-auto">
          Full-Stack Developer &amp; SOC Analyst L1 — crafting and securing
          digital experiences.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="btn btn-primary transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="btn btn-outline transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-base-content/10"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-base-content/40 motion-safe:animate-bounce">
        <span className="text-xs uppercase tracking-widest">scroll</span>
        <ChevronDown size={16} />
      </div> */}
    </div>
  );
}

export default Hero;
