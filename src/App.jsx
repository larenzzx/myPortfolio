import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Blog1 } from "./pages/Blog1";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog1" element={<Blog1 />} />
      </Routes>
    </>
  );
}

export default App;
