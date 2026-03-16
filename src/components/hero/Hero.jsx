import { useState, useEffect, useRef } from "react";
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

      {/* ── Aurora blobs ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary — top-left */}
        <div
          className="hero-blob absolute -top-20 -left-20 h-[280px] w-[280px] sm:h-[420px] sm:w-[420px] md:h-[580px] md:w-[580px] rounded-full bg-primary/10 blur-[80px] sm:blur-[110px]"
          style={{ animation: "blob-drift 10s ease-in-out infinite" }}
        />
        {/* Secondary — bottom-right */}
        <div
          className="hero-blob absolute -bottom-20 -right-10 h-[240px] w-[240px] sm:h-[360px] sm:w-[360px] md:h-[480px] md:w-[480px] rounded-full bg-secondary/10 blur-[70px] sm:blur-[100px]"
          style={{ animation: "blob-drift 13s ease-in-out infinite 2s" }}
        />
        {/* Accent — center */}
        <div
          className="hero-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] sm:h-[280px] sm:w-[280px] md:h-[340px] md:w-[340px] rounded-full bg-accent/7 blur-[60px] sm:blur-[90px]"
          style={{ animation: "blob-drift 16s ease-in-out infinite 5s" }}
        />
        {/* Primary tint — bottom-left */}
        <div
          className="hero-blob absolute bottom-6 left-6 h-[160px] w-[160px] sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] rounded-full bg-primary/7 blur-[50px] sm:blur-[80px]"
          style={{ animation: "blob-drift 11s ease-in-out infinite 3.5s" }}
        />
      </div>

      {/* ── Grid background with parallax ────────────────────────── */}
      <div
        className="absolute inset-0 hero-grid-bg opacity-25"
        style={{
          transform: prefersReduced.current
            ? "none"
            : `translate(${transform.x}px, ${transform.y}px)`,
          willChange: "transform",
        }}
      />

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto w-full">

        {/* Role badges */}
        <div
          className="flex gap-2 sm:gap-3 justify-center flex-wrap mb-6 sm:mb-8"
          style={{ animation: "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both" }}
        >
          <span
            className="badge badge-primary badge-md sm:badge-lg font-mono shadow-md shadow-primary/25 motion-safe:animate-pulse"
            style={{ animationDuration: "3s" }}
          >
            &lt; Web Developer /&gt;
          </span>
          <span
            className="badge badge-secondary badge-md sm:badge-lg font-mono shadow-md shadow-secondary/25 motion-safe:animate-pulse"
            style={{ animationDuration: "3s", animationDelay: "1.5s" }}
          >
            [ SOC Analyst ]
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-base-content leading-tight mb-4"
          style={{ animation: "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both" }}
        >
          I build for the web.
          <br />
          <span className="text-primary">I defend it too.</span>
        </h1>

        {/* Typewriter row */}
        <div
          className="flex items-center justify-center gap-x-2 text-xl sm:text-2xl md:text-3xl font-bold mb-4"
          style={{ animation: "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both" }}
        >
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            I&apos;m
          </span>
          <TypingAnimation />
        </div>

        <p
          className="text-base sm:text-lg md:text-xl text-base-content/60 mb-8 sm:mb-10 max-w-xl mx-auto"
          style={{ animation: "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both" }}
        >
          Full-Stack Developer &amp; SOC Analyst L1 — crafting and securing
          digital experiences.
        </p>

        {/* CTA buttons */}
        <div
          className="flex gap-4 justify-center flex-wrap"
          style={{ animation: "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both" }}
        >
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
    </div>
  );
}

export default Hero;
