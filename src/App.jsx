import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Blog1 } from "./pages/Blog1";
import { Blog2 } from "./pages/Blog2"
import { Blog3 } from "./pages/Blog3";
import { Blog4 } from "./pages/blog4";
import { Blog5 } from "./pages/blog5";
import { Blog6 } from "./pages/Blog6";
import { Blog7 } from "./pages/Blog7";
import { Blog8 } from "./pages/Blog8";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/blog3" element={<Blog3 />} />
        <Route path="/blog4" element={<Blog4 />} />
        <Route path="/blog5" element={<Blog5 />} />
        <Route path="/blog6" element={<Blog6 />} />
        <Route path="/blog7" element={<Blog7 />} />
        <Route path="/blog8" element={<Blog8 />} />
      </Routes>
    </>
  );
}

export default App;
