import Header from "./components/Header";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";

import { Skills } from "./components/skills/Skills";
import { Projects } from "./components/projectSection/Projects";
import { Contact } from "./components/contact/Contact";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
