import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { ObserverProvider } from "./components/ObserverProvider";
import {
  AboutPage,
  CertificatesPage,
  ContactPage,
  ExperiencePage,
  ProjectsPage,
  SkillsPage,
} from "./components/pages/SectionPages";
import { ProjectDetail } from "./components/projectSection/ProjectDetail";
import { ResumePage } from "./components/pages/ResumePage";
import { AdminPage } from "./components/admin/AdminPage";

function App() {
  return (
    <ObserverProvider>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </DashboardLayout>
    </ObserverProvider>
  );
}

export default App;
