import { useEffect, useRef, useState } from "react";
import { ArrowDown, Send } from "lucide-react";
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
        x: mouseX * 0.2,
        y: scrollY * 0.12 + mouseY * 0.2,
      });
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(update);
        ticking = true;
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      requestUpdate();
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 28;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 18;
      requestUpdate();
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-100 px-4 pt-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--p)/0.10),transparent_32%,hsl(var(--s)/0.08)_68%,transparent)]" />
      <div
        className="hero-grid-bg absolute inset-0 opacity-25"
        style={{
          transform: prefersReduced.current
            ? "none"
            : `translate(${transform.x}px, ${transform.y}px)`,
          willChange: "transform",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base-100 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <div
          className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3"
          style={{
            animation:
              "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
          }}
        >
          <span className="badge badge-primary badge-md font-mono shadow-md shadow-primary/25 sm:badge-lg">
            &lt; Web Developer /&gt;
          </span>
          <span className="badge badge-secondary badge-md font-mono shadow-md shadow-secondary/25 sm:badge-lg">
            [ SOC Analyst ]
          </span>
        </div>

        <h1
          className="mx-auto mb-5 max-w-4xl text-4xl font-bold leading-tight text-base-content sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            animation:
              "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both",
          }}
        >
          I build for the web.
          <br />
          <span className="text-primary">I defend it too.</span>
        </h1>

        <div
          className="mb-5 flex min-h-10 items-center justify-center gap-x-2 text-xl font-bold sm:text-2xl md:text-3xl"
          style={{
            animation:
              "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
          }}
        >
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            I&apos;m
          </span>
          <TypingAnimation />
        </div>

        <p
          className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-base-content/65 sm:text-lg md:text-xl"
          style={{
            animation:
              "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
          }}
        >
          Full-stack developer and SOC Analyst L1 focused on clean interfaces,
          secure workflows, and dependable digital experiences.
        </p>

        <div
          className="flex flex-wrap justify-center gap-3"
          style={{
            animation:
              "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both",
          }}
        >
          <a
            href="#projects"
            className="btn btn-primary rounded-xl transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            View My Work
            <ArrowDown size={16} />
          </a>
          <a
            href="#contact"
            className="btn btn-outline rounded-xl transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-base-content/10"
          >
            Get In Touch
            <Send size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
