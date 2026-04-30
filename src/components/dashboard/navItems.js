import {
  Award,
  BriefcaseBusiness,
  Code2,
  Home,
  Layers3,
  Mail,
  UserRound,
} from "lucide-react";

export const navItems = [
  { label: "Overview", path: "/", id: "overview", Icon: Home },
  { label: "About", path: "/about", id: "about", Icon: UserRound },
  { label: "Experience", path: "/experience", id: "experience", Icon: BriefcaseBusiness },
  { label: "Skills", path: "/skills", id: "skills", Icon: Code2 },
  { label: "Projects", path: "/projects", id: "projects", Icon: Layers3 },
  { label: "Certificates", path: "/certificates", id: "certificates", Icon: Award },
  { label: "Contact", path: "/contact", id: "contact", Icon: Mail },
];

export const themes = [
  "night",
  "corporate",
  "business",
  "winter",
  "dracula",
];
