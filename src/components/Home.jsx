import Header from "./Header";
import Hero from "./hero/Hero";
import About from "./about/About";
import { Experience } from "./exp/Experience";
import { Skills } from "./skills/Skills";
import { Projects } from "./projectSection/Projects";
import { Contact } from "./contact/Contact";
import { Blogs } from "./blogs/Blogs";
import { Certificates } from "./certificatess/Certificates";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Blogs />
      <Certificates />
      <Footer />
    </>
  );
};
