import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Swal from "sweetalert2";
import { PROJECT_IMGS } from "../projectSection/projectData";
import {
  Lock,
  Mail,
  Plus,
  Edit,
  Trash2,
  LogOut,
  FolderKanban,
  FileBadge,
  Sparkles,
  Search,
  ExternalLink,
  ArrowLeft,
  X,
  Code,
  Shield,
  Briefcase,
  RotateCcw,
  History,
  Trash,
  Upload,
  Clock,
  MapPin,
  Cpu,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  slug: string;
  project_title: string;
  category: string;
  is_experience: boolean;
  year: string;
  link: string;
  live_link: string;
  live_view: boolean;
  featured: boolean;
  case_study_problem?: string;
  case_study_outcome?: string;
  image_url: string;
  stack: string[];
  is_deleted?: boolean;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  logo_url: string;
  type: string;
  is_deleted?: boolean;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  image_url: string;
  is_pdf: boolean;
  is_deleted?: boolean;
}

interface Experience {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  accent: string;
  icon_name: string;
  bullets: string[];
  tags: string[];
  is_deleted?: boolean;
}

const themeSwal = (options: any) => {
  const { customClass, ...rest } = options;
  return Swal.fire({
    background: "#0c0c0f", 
    color: "#f4f4f6",      
    customClass: {
      popup: "rounded-2xl border border-gray-200/20 dark:border-gray-800/30 bg-gray-950 p-6 shadow-2xl font-sans backdrop-blur-md",
      title: "text-lg font-bold font-serif text-ink",
      htmlContainer: "text-xs text-gray-400 mt-2",
      actions: "flex gap-2 justify-center mt-6 w-full",
      confirmButton: "inline-flex h-9 items-center justify-center rounded-xl bg-ink px-4 text-xs font-semibold text-bg hover:opacity-90 transition-opacity border border-gray-200/10 cursor-pointer active:scale-95",
      cancelButton: "inline-flex h-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-4 text-xs font-semibold text-ink hover:bg-gray-100/70 transition-colors cursor-pointer active:scale-95",
      ...customClass
    },
    buttonsStyling: false,
    ...rest
  });
};

const themeToast = (options: any) => {
  const { customClass, ...rest } = options;
  return Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: options.timer || 2000,
    background: "#0c0c0f", 
    color: "#f4f4f6",      
    customClass: {
      popup: "rounded-xl border border-gray-200/20 dark:border-gray-800/30 bg-gray-950 shadow-xl font-sans py-2.5 px-4 backdrop-blur-md",
      title: "text-xs font-semibold text-ink",
      ...customClass
    },
    ...rest
  });
};

const CATEGORY_OPTIONS = [
  "Personal",
  "Freelance",
  "Capstone",
  "Individual Project",
  "Software Eng.",
  "Database Project",
  "IT Elective 2",
  "IT Elective 4",
  "IT142"
];

const COMMON_TECHS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Vite",
  "Tailwind CSS",
  "DaisyUI",
  "shadcn/ui",
  "PHP",
  "MySQL",
  "PostgreSQL",
  "Python",
  "Django",
  "Git",
  "GitHub",
  "Wazuh",
  "Linux"
];

export const AdminPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auth States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Content States
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "certificates" | "experiences" | "resume">("projects");
  const [showDeleted, setShowDeleted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("/Tabotabo_resume.pdf");
  const [resumeSaving, setResumeSaving] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form Fields State
  const [projectForm, setProjectForm] = useState({
    slug: "",
    project_title: "",
    category: "Personal",
    group_type: "freelance",
    year: new Date().getFullYear().toString(),
    link: "",
    live_link: "",
    live_view: false,
    featured: false,
    case_study_problem: "",
    case_study_outcome: "",
    image_url: "",
    stack: ""
  });

  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "frontend",
    logo_url: "",
    type: "img"
  });

  const [certForm, setCertForm] = useState({
    title: "",
    issuer: "",
    year: new Date().getFullYear().toString(),
    category: "web-dev",
    image_url: "",
    is_pdf: false
  });

  const [expForm, setExpForm] = useState({
    title: "",
    subtitle: "",
    company: "",
    location: "On-site",
    period: "",
    current: false,
    accent: "primary",
    icon_name: "Briefcase",
    bullets: "",
    tags: ""
  });

  // Track Auth Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch resume URL when authenticated
  useEffect(() => {
    if (session) {
      supabase
        .from("projects")
        .select("live_link")
        .eq("slug", "resume-file")
        .maybeSingle()
        .then(({ data }) => {
          if (data && data.live_link) {
            setResumeUrl(data.live_link);
          }
        });
    }
  }, [session]);

  // Fetch Data when session is active or tab changes
  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, activeTab]);

  const fetchData = async () => {
    setFetchingData(true);
    try {
      if (activeTab === "projects") {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("year", { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } else if (activeTab === "skills") {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("category", { ascending: true });
        if (error) throw error;
        setSkills(data || []);
      } else if (activeTab === "certificates") {
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .order("year", { ascending: false });
        if (error) throw error;
        setCertificates(data || []);
      } else if (activeTab === "experiences") {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;
        setExperiences(data || []);
      }
    } catch (err: any) {
      themeToast({ icon: "error", title: "Error fetching: " + err.message });
    } finally {
      setFetchingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      themeToast({ icon: "success", title: "Logged in successfully" });
    } catch (err: any) {
      themeSwal({
        icon: "error",
        title: "Login Failed",
        text: err.message
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    const result = await themeSwal({
      title: "Sign Out?",
      text: "Are you sure you want to sign out of the Admin panel?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sign Out",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      await supabase.auth.signOut();
      themeToast({ icon: "success", title: "Signed out successfully" });
      navigate("/");
    }
  };

  // Upload File Helper
  const uploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    bucket: string,
    onSuccess: (url: string) => void
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);

    try {
      // Create a unique filepath
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `${bucket}/${fileName}`;

      // Upload file to Supabase bucket
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      if (data && data.publicUrl) {
        onSuccess(data.publicUrl);
        themeToast({
          icon: "success",
          title: "File uploaded successfully"
        });
      }
    } catch (err: any) {
      themeSwal({
        icon: "error",
        title: "Upload Failed",
        text: "Make sure you created a public bucket named 'portfolio' in Supabase Storage. Detail: " + err.message
      });
    } finally {
      setUploading(false);
    }
  };

  // Open Add/Edit Modals
  const openModal = (item: any = null) => {
    setEditingItem(item);
    if (activeTab === "projects") {
      if (item) {
        setProjectForm({
          slug: item.slug || "",
          project_title: item.project_title || "",
          category: item.category || "Personal",
          group_type: item.is_experience ? "freelance" : "academic",
          year: item.year || "",
          link: item.link || "",
          live_link: item.live_link || "",
          live_view: !!item.live_view,
          featured: !!item.featured,
          case_study_problem: item.case_study_problem || "",
          case_study_outcome: item.case_study_outcome || "",
          image_url: item.image_url || "",
          stack: Array.isArray(item.stack) ? item.stack.join(", ") : ""
        });
      } else {
        setProjectForm({
          slug: "",
          project_title: "",
          category: "Personal",
          group_type: "freelance",
          year: new Date().getFullYear().toString(),
          link: "",
          live_link: "",
          live_view: false,
          featured: false,
          case_study_problem: "",
          case_study_outcome: "",
          image_url: "",
          stack: ""
        });
      }
    } else if (activeTab === "skills") {
      if (item) {
        setSkillForm({
          name: item.name || "",
          category: item.category || "frontend",
          logo_url: item.logo_url || "",
          type: item.type || "img"
        });
      } else {
        setSkillForm({
          name: "",
          category: "frontend",
          logo_url: "",
          type: "img"
        });
      }
    } else if (activeTab === "certificates") {
      if (item) {
        setCertForm({
          title: item.title || "",
          issuer: item.issuer || "",
          year: item.year || "",
          category: item.category || "web-dev",
          image_url: item.image_url || "",
          is_pdf: !!item.is_pdf
        });
      } else {
        setCertForm({
          title: "",
          issuer: "",
          year: new Date().getFullYear().toString(),
          category: "web-dev",
          image_url: "",
          is_pdf: false
        });
      }
    } else if (activeTab === "experiences") {
      if (item) {
        setExpForm({
          title: item.title || "",
          subtitle: item.subtitle || "",
          company: item.company || "",
          location: item.location || "On-site",
          period: item.period || "",
          current: !!item.current,
          accent: item.accent || "primary",
          icon_name: item.icon_name || "Briefcase",
          bullets: Array.isArray(item.bullets) ? item.bullets.join("\n") : "",
          tags: Array.isArray(item.tags) ? item.tags.join(", ") : ""
        });
      } else {
        setExpForm({
          title: "",
          subtitle: "",
          company: "",
          location: "On-site",
          period: "",
          current: false,
          accent: "primary",
          icon_name: "Briefcase",
          bullets: "",
          tags: ""
        });
      }
    }
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    themeSwal({
      title: "Saving...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      if (activeTab === "projects") {
        const isExp = projectForm.group_type === "freelance";
        const payload = {
          slug: projectForm.slug,
          project_title: projectForm.project_title,
          category: projectForm.category,
          is_experience: isExp,
          year: projectForm.year,
          link: projectForm.link,
          live_link: projectForm.live_link,
          live_view: projectForm.live_view,
          featured: projectForm.featured,
          case_study_problem: projectForm.case_study_problem,
          case_study_outcome: projectForm.case_study_outcome,
          image_url: projectForm.image_url,
          stack: projectForm.stack
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        };

        if (editingItem) {
          const { error } = await supabase
            .from("projects")
            .update(payload)
            .eq("id", editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("projects").insert([payload]);
          if (error) throw error;
        }
      } else if (activeTab === "skills") {
        if (editingItem) {
          const { error } = await supabase
            .from("skills")
            .update(skillForm)
            .eq("id", editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("skills").insert([skillForm]);
          if (error) throw error;
        }
      } else if (activeTab === "certificates") {
        if (editingItem) {
          const { error } = await supabase
            .from("certificates")
            .update(certForm)
            .eq("id", editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("certificates").insert([certForm]);
          if (error) throw error;
        }
      } else if (activeTab === "experiences") {
        const payload = {
          ...expForm,
          bullets: expForm.bullets
            .split("\n")
            .map((b) => b.trim())
            .filter((b) => b.length > 0),
          tags: expForm.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0)
        };

        if (editingItem) {
          const { error } = await supabase
            .from("experiences")
            .update(payload)
            .eq("id", editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("experiences").insert([payload]);
          if (error) throw error;
        }
      }

      themeToast({
        icon: "success",
        title: "Successfully Saved"
      });
      setModalOpen(false);
      fetchData();
    } catch (err: any) {
      themeSwal({
        icon: "error",
        title: "Save Error",
        text: err.message
      });
    }
  };

  const handleDelete = async (item: any) => {
    const itemName =
      activeTab === "projects"
        ? item.project_title
        : activeTab === "skills"
        ? item.name
        : activeTab === "certificates"
        ? item.title
        : item.title;

    const isSoftDelete = !item.is_deleted;

    const result = await themeSwal({
      title: isSoftDelete ? `Delete "${itemName}"?` : `Permanently delete "${itemName}"?`,
      text: isSoftDelete
        ? "This item will be moved to the Recycle Bin. You can restore it later."
        : "This action is permanent and cannot be undone.",
      icon: isSoftDelete ? "warning" : "error",
      showCancelButton: true,
      confirmButtonText: isSoftDelete ? "Yes, delete it" : "Permanently delete",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      themeSwal({
        title: isSoftDelete ? "Moving to Trash..." : "Deleting permanently...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        if (isSoftDelete) {
          const { error } = await supabase
            .from(activeTab)
            .update({ is_deleted: true })
            .eq("id", item.id);
          if (error) throw error;

          themeToast({
            icon: "success",
            title: "Moved to Recycle Bin",
            timer: 3000
          });
        } else {
          const { error } = await supabase
            .from(activeTab)
            .delete()
            .eq("id", item.id);
          if (error) throw error;

          themeToast({
            icon: "success",
            title: "Permanently Deleted",
            timer: 2000
          });
        }
        fetchData();
      } catch (err: any) {
        themeSwal({
          icon: "error",
          title: "Operation Failed",
          text: err.message
        });
      }
    }
  };

  const handleRestore = async (item: any) => {
    const itemName =
      activeTab === "projects"
        ? item.project_title
        : activeTab === "skills"
        ? item.name
        : activeTab === "certificates"
        ? item.title
        : item.title;

    themeSwal({
      title: "Restoring...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const { error } = await supabase
        .from(activeTab)
        .update({ is_deleted: false })
        .eq("id", item.id);
      if (error) throw error;

      themeToast({
        icon: "success",
        title: `"${itemName}" Restored`,
        timer: 2000
      });
      fetchData();
    } catch (err: any) {
      themeSwal({
        icon: "error",
        title: "Restore Failed",
        text: err.message
      });
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-ink">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent"></span>
      </div>
    );
  }

  // LOGIN INTERFACE
  if (!session) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg text-ink px-4 py-12">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 select-none">
          <div className="halftone halftone-wide mask-tr absolute right-0 top-0 h-[70vh] w-[65vw]"></div>
          <div className="halftone mask-bl absolute bottom-0 left-0 h-[60vh] w-[55vw]"></div>
        </div>

        <div className="relative w-full max-w-md z-10">
          <div className="rounded-3xl border border-gray-200/50 dark:border-gray-800/40 bg-gray-50/10 dark:bg-gray-950/5 p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 hero-grid-bg opacity-[0.04]" />
            <div className="relative mb-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-bg text-ink">
                <Lock size={20} />
              </div>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-ink font-serif">
                Portfolio Admin Panel
              </h2>
              <p className="mt-2 text-xs text-gray-500">
                Log in with your Supabase credentials
              </p>
            </div>

            <form onSubmit={handleLogin} className="relative space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-400">Email Address</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg pl-10 pr-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-400">Password</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg pl-10 pr-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                  />
                </div>
              </div>

              <Button type="submit" disabled={authLoading} className="w-full mt-2 justify-center gap-2">
                {authLoading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border border-bg border-t-transparent"></span>
                ) : (
                  <>
                    Sign In
                    <Sparkles size={14} />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-ink transition-colors"
              >
                <ArrowLeft size={12} />
                Return to portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter list
  const getActiveList = (list: any[]) => {
    return list.filter((item) => (showDeleted ? !!item.is_deleted : !item.is_deleted));
  };

  const filteredProjects = getActiveList(projects).filter((p) =>
    p.project_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSkills = getActiveList(skills).filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCerts = getActiveList(certificates).filter(
    (c) =>
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.issuer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExps = getActiveList(experiences).filter(
    (e) =>
      e.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg text-ink pb-20 font-sans relative overflow-x-hidden">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 select-none">
        <div className="halftone halftone-wide mask-tr absolute right-0 top-0 h-[70vh] w-[65vw] opacity-80"></div>
        <div className="halftone mask-bl absolute bottom-0 left-0 h-[60vh] w-[55vw] opacity-80"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-gray-200/50 dark:border-gray-800/40 bg-bg/90 backdrop-blur-md px-6 py-4 shadow-sm relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-bg text-ink">
              <Shield size={18} />
            </span>
            <div>
              <h1 className="text-sm font-bold text-ink font-serif">
                Admin Dashboard
              </h1>
              <p className="text-[10px] text-gray-500 font-mono">
                Connected to Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft size={14} className="mr-1.5" />
                View Site
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-defend border-defend/20 bg-defend/5 hover:bg-defend/10">
              <LogOut size={14} className="mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 relative z-10">
        {/* Info summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/10 dark:bg-gray-950/5 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold font-mono uppercase tracking-wider text-gray-400">
                  Projects
                </p>
                <h3 className="mt-2 text-2xl font-black text-build">
                  {projects.filter((p) => !p.is_deleted).length}
                </h3>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-build/20 bg-build/5 text-build">
                <FolderKanban size={18} />
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/10 dark:bg-gray-950/5 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold font-mono uppercase tracking-wider text-gray-400">
                  Skills
                </p>
                <h3 className="mt-2 text-2xl font-black text-support">
                  {skills.filter((s) => !s.is_deleted).length}
                </h3>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-support/20 bg-support/5 text-support">
                <Code size={18} />
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/10 dark:bg-gray-950/5 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold font-mono uppercase tracking-wider text-gray-400">
                  Certificates
                </p>
                <h3 className="mt-2 text-2xl font-black text-defend">
                  {certificates.filter((c) => !c.is_deleted).length}
                </h3>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-defend/20 bg-defend/5 text-defend">
                <FileBadge size={18} />
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-gray-50/10 dark:bg-gray-950/5 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold font-mono uppercase tracking-wider text-gray-400">
                  Experiences
                </p>
                <h3 className="mt-2 text-2xl font-black text-ink">
                  {experiences.filter((e) => !e.is_deleted).length}
                </h3>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-bg text-ink">
                <Briefcase size={18} />
              </span>
            </div>
          </div>
        </div>

        {/* Tab Controls & Search Row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-gray-50/30 dark:bg-gray-950/15 p-1.5 w-fit flex flex-wrap gap-1">
            {(["projects", "skills", "certificates", "experiences", "resume"] as const).map((tab) => {
              const isActive = activeTab === tab;
              const Icon =
                tab === "projects"
                  ? FolderKanban
                  : tab === "skills"
                  ? Code
                  : tab === "certificates"
                  ? FileBadge
                  : tab === "experiences"
                  ? Briefcase
                  : FileText;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSearchTerm("");
                  }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono capitalize transition-all duration-150 border border-transparent ${
                    isActive
                      ? "bg-ink text-bg font-semibold"
                      : "text-gray-500 hover:text-ink hover:bg-bg"
                  }`}
                >
                  <Icon size={14} />
                  {tab}
                </button>
              );
            })}
          </div>

          {activeTab !== "resume" && (
            <div className="flex gap-2 items-center w-full sm:w-auto flex-wrap">
              <div className="relative flex-1 sm:w-60 min-w-[150px]">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg pl-10 pr-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleted(!showDeleted)}
                className={showDeleted ? "border-defend text-defend bg-defend/5" : ""}
              >
                {showDeleted ? <History size={14} className="mr-1.5" /> : <Trash size={14} className="mr-1.5" />}
                {showDeleted ? "Active Items" : "Recycle Bin"}
              </Button>

              {!showDeleted && (
                <Button size="sm" onClick={() => openModal()} className="gap-1 bg-ink text-bg">
                  <Plus size={16} />
                  Add New
                </Button>
              )}
            </div>
          )}
        </div>

        {showDeleted && (
          <div className="mb-4 rounded-xl border border-defend/20 bg-defend/5 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-defend font-medium">
              <Trash size={14} />
              <span>Recycle Bin View: Showing deleted items only. You can restore or permanently delete them.</span>
            </div>
            <button onClick={() => setShowDeleted(false)} className="text-xs font-mono text-defend underline cursor-pointer">
              Close
            </button>
          </div>
        )}

        {/* Dynamic Lists */}
        {fetchingData ? (
          <div className="flex justify-center py-20 rounded-2xl border border-gray-200/50 dark:border-gray-800/40 bg-gray-50/10 dark:bg-gray-950/5">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink border-t-transparent"></span>
          </div>
        ) : (
          activeTab !== "resume" ? (
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/40 bg-bg shadow-sm overflow-hidden relative overflow-x-auto">
            
            {/* 1. PROJECTS LIST */}
            {activeTab === "projects" && (
              <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-950/15">
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Project Title / Slug</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Section & Custom Badge</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Year</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Links</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Featured</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-xs font-mono text-gray-400">
                        {showDeleted ? "No deleted projects in Recycle Bin." : "No projects found."}
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-100/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="font-bold text-ink font-serif">{p.project_title}</div>
                          <div className="text-[10px] text-gray-400 font-mono mt-0.5">/{p.slug}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex rounded-lg border border-build/20 bg-build/5 px-2 py-0.5 text-[10px] font-mono text-build font-bold mb-1">
                            {p.is_experience ? "Personal & Freelance" : "Academic"}
                          </span>
                          <div className="text-[10px] font-mono text-gray-400">Badge: {p.category}</div>
                        </td>
                        <td className="px-5 py-3.5 text-xs font-mono">{p.year}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex flex-col gap-1 text-[11px] font-mono">
                            {p.link && (
                              <a href={p.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-build transition-colors">
                                Code <ExternalLink size={10} />
                              </a>
                            )}
                            {p.live_link && (
                              <a href={p.live_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-build transition-colors">
                                Demo <ExternalLink size={10} />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          {p.featured ? (
                            <span className="inline-flex rounded-md border border-defend/20 bg-defend/5 px-2 py-0.5 text-[9px] font-mono text-defend font-bold">Yes</span>
                          ) : (
                            <span className="text-[10px] font-mono text-gray-400">No</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex gap-1 justify-end">
                            {showDeleted ? (
                              <>
                                <button onClick={() => handleRestore(p)} className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100/70 transition-colors" title="Restore">
                                  <RotateCcw size={15} />
                                </button>
                                <button onClick={() => handleDelete(p)} className="p-1 rounded-lg text-gray-400 hover:text-defend hover:bg-defend/10 transition-colors" title="Delete permanently">
                                  <Trash2 size={15} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => openModal(p)} className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100/70 transition-colors" title="Edit">
                                  <Edit size={15} />
                                </button>
                                <button onClick={() => handleDelete(p)} className="p-1 rounded-lg text-gray-400 hover:text-defend hover:bg-defend/10 transition-colors" title="Move to Trash">
                                  <Trash2 size={15} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* 2. SKILLS LIST */}
            {activeTab === "skills" && (
              <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-950/15">
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Name</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Category</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Type</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Logo / Icon Reference</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredSkills.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-xs font-mono text-gray-400">
                        {showDeleted ? "No deleted skills in Recycle Bin." : "No skills found."}
                      </td>
                    </tr>
                  ) : (
                    filteredSkills.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-100/30 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-ink">{s.name}</td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex rounded-lg border border-support/20 bg-support/5 px-2 py-0.5 text-[10px] font-mono text-support font-semibold">
                            {s.category}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-[10px] font-mono text-gray-400 uppercase">{s.type}</span>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-xs max-w-xs truncate text-gray-500">{s.logo_url}</td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex gap-1 justify-end">
                            {showDeleted ? (
                              <>
                                <button onClick={() => handleRestore(s)} className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100/70 transition-colors">
                                  <RotateCcw size={15} />
                                </button>
                                <button onClick={() => handleDelete(s)} className="p-1 rounded-lg text-gray-400 hover:text-defend hover:bg-defend/10 transition-colors">
                                  <Trash2 size={15} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => openModal(s)} className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100/70 transition-colors">
                                  <Edit size={15} />
                                </button>
                                <button onClick={() => handleDelete(s)} className="p-1 rounded-lg text-gray-400 hover:text-defend hover:bg-defend/10 transition-colors">
                                  <Trash2 size={15} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* 3. CERTIFICATES LIST */}
            {activeTab === "certificates" && (
              <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-950/15">
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Title</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Issuer</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Year / Type</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Category</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredCerts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-xs font-mono text-gray-400">
                        {showDeleted ? "No deleted certificates in Recycle Bin." : "No certificates found."}
                      </td>
                    </tr>
                  ) : (
                    filteredCerts.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-100/30 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-ink font-serif">{c.title}</td>
                        <td className="px-5 py-3.5 text-gray-500 font-medium">{c.issuer}</td>
                        <td className="px-5 py-3.5">
                          <div className="text-xs font-mono">{c.year}</div>
                          <div className="text-[10px] font-mono text-gray-400">{c.is_pdf ? "PDF Doc" : "Image Link"}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-bg px-2 py-0.5 text-[10px] font-mono text-gray-500 capitalize">
                            {c.category}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex gap-1 justify-end">
                            {showDeleted ? (
                              <>
                                <button onClick={() => handleRestore(c)} className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100/70 transition-colors">
                                  <RotateCcw size={15} />
                                </button>
                                <button onClick={() => handleDelete(c)} className="p-1 rounded-lg text-gray-400 hover:text-defend hover:bg-defend/10 transition-colors">
                                  <Trash2 size={15} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => openModal(c)} className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100/70 transition-colors">
                                  <Edit size={15} />
                                </button>
                                <button onClick={() => handleDelete(c)} className="p-1 rounded-lg text-gray-400 hover:text-defend hover:bg-defend/10 transition-colors">
                                  <Trash2 size={15} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* 4. EXPERIENCES LIST */}
            {activeTab === "experiences" && (
              <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-950/15">
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Role / Company</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Period / Location</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Identity Accent</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase">Stats</th>
                    <th className="px-5 py-3 text-xs font-bold font-mono text-gray-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredExps.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-xs font-mono text-gray-400">
                        {showDeleted ? "No deleted experiences in Recycle Bin." : "No experiences found."}
                      </td>
                    </tr>
                  ) : (
                    filteredExps.map((e) => (
                      <tr key={e.id} className="hover:bg-gray-100/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="font-bold text-ink font-serif">{e.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{e.company} <span className="text-gray-400">({e.subtitle})</span></div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="text-xs font-mono text-ink">{e.period}</div>
                          <div className="text-[10px] font-mono text-gray-400 mt-0.5">{e.location}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[9px] font-mono font-bold capitalize ${
                            e.accent === "primary"
                              ? "border-build/20 bg-build/5 text-build"
                              : e.accent === "secondary"
                              ? "border-defend/20 bg-defend/5 text-defend"
                              : "border-support/20 bg-support/5 text-support"
                          }`}>
                            {e.accent === "primary" ? "Build (Dev)" : e.accent === "secondary" ? "Defend (Security)" : "Support (IT)"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="text-[10px] font-mono text-gray-400">
                            Bullets: {e.bullets?.length || 0}
                          </div>
                          <div className="text-[10px] font-mono text-gray-400">
                            Tags: {e.tags?.length || 0}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex gap-1 justify-end">
                            {showDeleted ? (
                              <>
                                <button onClick={() => handleRestore(e)} className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100/70 transition-colors">
                                  <RotateCcw size={15} />
                                </button>
                                <button onClick={() => handleDelete(e)} className="p-1 rounded-lg text-gray-400 hover:text-defend hover:bg-defend/10 transition-colors">
                                  <Trash2 size={15} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => openModal(e)} className="p-1 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100/70 transition-colors">
                                  <Edit size={15} />
                                </button>
                                <button onClick={() => handleDelete(e)} className="p-1 rounded-lg text-gray-400 hover:text-defend hover:bg-defend/10 transition-colors">
                                  <Trash2 size={15} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        ) : (
            <div className="rounded-2xl border border-gray-200/50 dark:border-gray-800/40 bg-bg shadow-sm p-6 max-w-2xl mx-auto flex flex-col gap-6">
              <div className="rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-gray-50/20 dark:bg-gray-950/10 p-5">
                <h4 className="text-sm font-bold text-ink font-serif mb-2">Resume Configuration</h4>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed font-mono">
                  Upload your latest resume PDF here. The portfolio will automatically direct users to download or view this dynamic document instead of the fallback PDF.
                </p>
                
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Current Resume Document Link
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={resumeUrl}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/50 px-3.5 py-2 text-xs text-gray-505 font-mono focus:outline-none text-gray-400"
                      />
                      {resumeUrl.startsWith("http") && (
                        <Button size="sm" variant="outline" asChild className="h-9 px-3">
                          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Upload New Resume PDF
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="relative flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-bg px-4 text-xs font-mono font-semibold text-gray-500 hover:border-gray-400 hover:text-ink transition-colors w-full">
                        <Upload size={14} />
                        <span>{resumeSaving ? "Uploading PDF..." : "Choose Resume PDF"}</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          disabled={resumeSaving}
                          onChange={async (e) => {
                            if (!e.target.files || e.target.files.length === 0) return;
                            setResumeSaving(true);
                            themeSwal({
                              title: "Uploading resume...",
                              allowOutsideClick: false,
                              showConfirmButton: false,
                              didOpen: () => {
                                Swal.showLoading();
                              }
                            });
                            
                            await uploadFile(e, "resume", async (url) => {
                              try {
                                const { data: existing } = await supabase
                                  .from("projects")
                                  .select("id")
                                  .eq("slug", "resume-file")
                                  .maybeSingle();

                                const payload = {
                                  slug: "resume-file",
                                  project_title: "My Resume",
                                  live_link: url,
                                  category: "resume",
                                  is_experience: false,
                                  year: new Date().getFullYear().toString(),
                                  live_view: true,
                                  is_deleted: false,
                                  image_url: "",
                                  stack: []
                                };

                                if (existing) {
                                  await supabase
                                    .from("projects")
                                    .update(payload)
                                    .eq("slug", "resume-file");
                                } else {
                                  await supabase
                                    .from("projects")
                                    .insert([payload]);
                                }

                                setResumeUrl(url);
                                themeToast({
                                  icon: "success",
                                  title: "Resume updated successfully"
                                });
                              } catch (err: any) {
                                themeSwal({
                                  icon: "error",
                                  title: "Failed to save resume",
                                  text: err.message
                                });
                              }
                            });
                            setResumeSaving(false);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Viewer preview */}
              <div className="rounded-xl border border-gray-200/50 dark:border-gray-800/40 overflow-hidden bg-gray-50/10 dark:bg-gray-950/5">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-950/15 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">PDF Preview</span>
                  <span className="text-[10px] font-mono text-gray-400">{resumeUrl.startsWith("http") ? "Supabase Storage" : "Local Fallback"}</span>
                </div>
                <div className="relative h-[50vh] w-full bg-bg">
                  <iframe
                    src={`${resumeUrl}#toolbar=0`}
                    className="h-full w-full border-0"
                    title="Resume Preview"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 p-4 backdrop-blur-sm select-none">
          <div className="relative w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-bg p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-ink font-serif">
                {editingItem ? "Edit Entry" : "Create New Entry"} -{" "}
                <span className="capitalize text-build font-mono text-sm">{activeTab}</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-ink hover:bg-gray-100/70 cursor-pointer transition-colors border-0 bg-transparent">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* PROJECTS */}
              {activeTab === "projects" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Project Title</label>
                    <input
                      type="text"
                      required
                      value={projectForm.project_title}
                      onChange={(e) => setProjectForm({ ...projectForm, project_title: e.target.value })}
                      placeholder="e.g. CyberGuide AI"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Slug (Unique URL path)</label>
                    <input
                      type="text"
                      required
                      value={projectForm.slug}
                      onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                      placeholder="e.g. cyberguide-ai"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Project Category</label>
                    <select
                      value={projectForm.group_type}
                      onChange={(e) => setProjectForm({ ...projectForm, group_type: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    >
                      <option value="freelance">Freelance / Personal Project</option>
                      <option value="academic">Academic Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Category Badge Label</label>
                    <select
                      value={CATEGORY_OPTIONS.includes(projectForm.category) ? projectForm.category : (projectForm.category === "" ? "" : "Other")}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "Other") {
                          setProjectForm({ ...projectForm, category: "" });
                        } else {
                          setProjectForm({ ...projectForm, category: val });
                        }
                      }}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    >
                      <option value="" disabled>-- Select a Category --</option>
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                      <option value="Other">Other (Type custom value)</option>
                    </select>

                    {(projectForm.category === "" || !CATEGORY_OPTIONS.includes(projectForm.category)) && (
                      <div className="mt-2">
                        <input
                          type="text"
                          required
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          placeholder="Type custom category (e.g. Mobile App)"
                          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3 py-1.5 text-xs text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Year</label>
                    <input
                      type="text"
                      required
                      value={projectForm.year}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      placeholder="e.g. 2026"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  {/* Project Image Upload */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Upload Project Preview Image</label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={(e) => uploadFile(e, "projects", (url) => setProjectForm({ ...projectForm, image_url: url }))}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-ink hover:file:bg-gray-200 dark:file:bg-gray-900 dark:file:text-ink cursor-pointer"
                      />
                    </div>
                    {projectForm.image_url && (
                      <div className="mt-3 flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/5 p-3">
                        <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-bg">
                          <img src={PROJECT_IMGS[projectForm.image_url] || projectForm.image_url} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1 text-[10px] font-mono">
                          <span className="font-semibold text-build block mb-0.5">✓ Uploaded & Active Preview:</span>
                          <a href={projectForm.image_url} target="_blank" rel="noreferrer" className="text-gray-400 truncate block hover:underline">{projectForm.image_url}</a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">GitHub Link</label>
                    <input
                      type="url"
                      value={projectForm.link}
                      onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Live Demo Link</label>
                    <input
                      type="url"
                      value={projectForm.live_link}
                      onChange={(e) => setProjectForm({ ...projectForm, live_link: e.target.value })}
                      placeholder="https://my-app.vercel.app"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Tech Stack</label>
                    
                    {/* Dynamic Tech Badges from Skills */}
                    <div className="mb-2 flex flex-wrap gap-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/5 p-3">
                      {((skills && skills.length > 0) ? skills.map(s => s.name) : COMMON_TECHS).map((techName) => {
                        const currentTechs = projectForm.stack
                          ? projectForm.stack.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
                          : [];
                        const isActive = currentTechs.includes(techName);
                        
                        return (
                          <button
                            type="button"
                            key={techName}
                            onClick={() => {
                              let newTechs;
                              if (isActive) {
                                newTechs = currentTechs.filter((t) => t !== techName);
                              } else {
                                newTechs = [...currentTechs, techName];
                              }
                              setProjectForm({
                                ...projectForm,
                                stack: newTechs.join(", ")
                              });
                            }}
                            className={`rounded-lg border px-2.5 py-1 text-[10px] font-mono font-medium cursor-pointer transition-all duration-150 select-none ${
                              isActive
                                ? "border-build bg-build/10 text-build"
                                : "border-gray-200 dark:border-gray-800 bg-bg text-gray-500 hover:text-ink hover:border-gray-400"
                            }`}
                          >
                            {techName}
                          </button>
                        );
                      })}
                    </div>

                    <label className="block text-[10px] font-mono text-gray-500 mb-1">Or manually type/modify (comma-separated):</label>
                    <input
                      type="text"
                      value={projectForm.stack}
                      onChange={(e) => setProjectForm({ ...projectForm, stack: e.target.value })}
                      placeholder="React, Vite, Tailwind CSS, Django"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4 py-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={projectForm.live_view}
                        onChange={(e) => setProjectForm({ ...projectForm, live_view: e.target.checked })}
                        className="rounded border-gray-300 text-ink focus:ring-0"
                      />
                      <span className="text-xs font-semibold text-gray-500 hover:text-ink">Show Live Demo button</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        className="rounded border-gray-300 text-ink focus:ring-0"
                      />
                      <span className="text-xs font-semibold text-gray-500 hover:text-ink">Featured Project</span>
                    </label>
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Case Study: The Problem</label>
                    <textarea
                      value={projectForm.case_study_problem}
                      onChange={(e) => setProjectForm({ ...projectForm, case_study_problem: e.target.value })}
                      placeholder="What was the problem this project solved? (Optional)"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500 h-20"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Case Study: The Outcome</label>
                    <textarea
                      value={projectForm.case_study_outcome}
                      onChange={(e) => setProjectForm({ ...projectForm, case_study_outcome: e.target.value })}
                      placeholder="What was the outcome or impact? (Optional)"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500 h-20"
                    />
                  </div>
                </div>
              )}

              {/* SKILLS */}
              {activeTab === "skills" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      placeholder="e.g. Django, Wazuh, MySQL"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Category</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="cyber">Cybersecurity</option>
                      <option value="it">IT & Systems</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Logo Rendering Type</label>
                    <select
                      value={skillForm.type}
                      onChange={(e) => setSkillForm({ ...skillForm, type: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    >
                      <option value="img">Image File or Local SVG import</option>
                      <option value="lucide">Lucide Icon Component name</option>
                    </select>
                  </div>

                  {skillForm.type === "lucide" ? (
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-gray-400">Lucide Icon Name</label>
                      <input
                        type="text"
                        required
                        value={skillForm.logo_url}
                        onChange={(e) => setSkillForm({ ...skillForm, logo_url: e.target.value })}
                        placeholder="e.g. Shield, Activity, Users, Monitor"
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                      />
                    </div>
                  ) : (
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-gray-400">Upload Logo Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={(e) => uploadFile(e, "logos", (url) => setSkillForm({ ...skillForm, logo_url: url }))}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-ink hover:file:bg-gray-200 dark:file:bg-gray-900 dark:file:text-ink cursor-pointer"
                      />
                      {skillForm.logo_url && (
                        <div className="mt-3 flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/5 p-3">
                          <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-bg">
                            <img src={skillForm.logo_url} alt="Logo" className="h-6 w-6 object-contain" />
                          </div>
                          <div className="min-w-0 flex-1 text-[10px] font-mono">
                            <span className="font-semibold text-build block mb-0.5">✓ Skill Logo URL:</span>
                            <span className="text-gray-400 truncate block">{skillForm.logo_url}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* CERTIFICATES */}
              {activeTab === "certificates" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Certificate Title</label>
                    <input
                      type="text"
                      required
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      placeholder="e.g. React Certified Developer"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Issuer</label>
                    <input
                      type="text"
                      required
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      placeholder="e.g. FreeCodeCamp, Coursera"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Year</label>
                    <input
                      type="text"
                      required
                      value={certForm.year}
                      onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                      placeholder="e.g. 2026"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Category Tag</label>
                    <select
                      value={certForm.category}
                      onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    >
                      <option value="web-dev">Web Development</option>
                      <option value="cyber">Cybersecurity</option>
                      <option value="it">IT & Networking</option>
                      <option value="ai">Artificial Intelligence</option>
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Upload Certificate File (Image or PDF)</label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={uploading}
                      onChange={(e) => uploadFile(e, "certificates", (url) => {
                        const isPdf = url.toLowerCase().endsWith(".pdf");
                        setCertForm({ ...certForm, image_url: url, is_pdf: isPdf });
                      })}
                      className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-ink hover:file:bg-gray-200 dark:file:bg-gray-900 dark:file:text-ink cursor-pointer"
                    />
                    {certForm.image_url && (
                      <div className="mt-3 flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/5 p-3">
                        <div className="h-12 w-20 flex-shrink-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-bg text-gray-400 font-mono text-[9px]">
                          {certForm.is_pdf ? "PDF FILE" : "IMAGE"}
                        </div>
                        <div className="min-w-0 flex-1 text-[10px] font-mono">
                          <span className="font-semibold text-build block mb-0.5">✓ Uploaded File Path:</span>
                          <a href={certForm.image_url} target="_blank" rel="noreferrer" className="text-gray-400 truncate block hover:underline">{certForm.image_url}</a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* EXPERIENCES */}
              {activeTab === "experiences" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Job Title</label>
                    <input
                      type="text"
                      required
                      value={expForm.title}
                      onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                      placeholder="e.g. SOC Analyst L1"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Company Name</label>
                    <input
                      type="text"
                      required
                      value={expForm.company}
                      onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                      placeholder="e.g. Aetas Security"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Subtitle / Team</label>
                    <input
                      type="text"
                      value={expForm.subtitle}
                      onChange={(e) => setExpForm({ ...expForm, subtitle: e.target.value })}
                      placeholder="e.g. Security Operations Center"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Location</label>
                    <input
                      type="text"
                      value={expForm.location}
                      onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                      placeholder="e.g. Zamboanga City (Remote)"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Timeline / Period</label>
                    <input
                      type="text"
                      required
                      value={expForm.period}
                      onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                      placeholder="e.g. Dec 2025 - Present"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Identity Accent (Build/Defend Color)</label>
                    <select
                      value={expForm.accent}
                      onChange={(e) => setExpForm({ ...expForm, accent: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    >
                      <option value="primary">Build Accent (Blue - Web Dev)</option>
                      <option value="secondary">Defend Accent (Red - SOC/Cyber)</option>
                      <option value="support">Support Accent (Indigo - IT/Admin)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Lucide Icon Name</label>
                    <input
                      type="text"
                      value={expForm.icon_name}
                      onChange={(e) => setExpForm({ ...expForm, icon_name: e.target.value })}
                      placeholder="e.g. ShieldCheck, Code2, Monitor"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 cursor-pointer select-none mt-5">
                    <input
                      type="checkbox"
                      checked={expForm.current}
                      onChange={(e) => setExpForm({ ...expForm, current: e.target.checked })}
                      className="rounded border-gray-300 text-ink focus:ring-0"
                    />
                    <span className="text-xs font-semibold text-gray-500 hover:text-ink">Current Role</span>
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Description Bullets (One per line)</label>
                    <textarea
                      value={expForm.bullets}
                      onChange={(e) => setExpForm({ ...expForm, bullets: e.target.value })}
                      placeholder="Conducted real-time threat monitoring using Wazuh.&#10;Triaged security alerts and orchestrated response."
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500 h-28"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold mb-1 text-gray-400">Tags / Tech Stack (comma-separated)</label>
                    <input
                      type="text"
                      value={expForm.tags}
                      onChange={(e) => setExpForm({ ...expForm, tags: e.target.value })}
                      placeholder="Wazuh, Qualys VMDR, Entra ID, Linux"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3.5 py-2 text-sm text-ink placeholder-gray-400 focus:border-gray-400 focus:outline-none dark:focus:border-gray-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
