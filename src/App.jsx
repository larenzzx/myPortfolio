import Header from "./components/Header";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";

import { Skills } from "./components/skills/Skills";
import { Projects } from "./components/projectSection/Projects";
import { Contact } from "./components/contact/Contact";
import { Blogs } from "./components/blogs/Blogs";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Blogs />
    </>
  );
}

export default App;
