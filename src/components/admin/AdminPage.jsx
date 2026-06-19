import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Swal from "sweetalert2";
import { PROJECT_IMGS } from "../projectSection/projectData";
import { LOCAL_LOGOS } from "../skills/Skills";
import { LOCAL_ASSETS } from "../certificatess/Certificates";
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
  Monitor,
  Cpu,
  Briefcase,
  RotateCcw,
  History,
  Trash,
  Upload
} from "lucide-react";

const themeSwal = (options) => {
  const { confirmButtonClass, cancelButtonClass, customClass, ...rest } = options;
  return Swal.fire({
    background: "#0f172a", // Night theme background
    color: "#f8fafc",      // Night theme text color
    customClass: {
      popup: "rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl font-Inter backdrop-blur-md",
      title: "text-xl font-bold text-slate-100",
      htmlContainer: "text-sm text-slate-300 mt-2",
      actions: "flex gap-3 justify-center mt-6 w-full",
      confirmButton: confirmButtonClass || "btn btn-primary rounded-xl px-6 py-2.5 font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95",
      cancelButton: cancelButtonClass || "btn btn-neutral rounded-xl px-6 py-2.5 font-semibold text-slate-300 transition-all duration-200 hover:scale-105 active:scale-95",
      ...customClass
    },
    buttonsStyling: false,
    ...rest
  });
};

const themeToast = (options) => {
  const { customClass, ...rest } = options;
  return Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: options.timer || 2000,
    background: "#0f172a", // Night theme background
    color: "#f8fafc",      // Night theme text color
    customClass: {
      popup: "rounded-2xl border border-slate-800 bg-slate-900/95 shadow-xl font-Inter py-2.5 px-4 backdrop-blur-md",
      title: "text-sm font-semibold text-slate-100",
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

const COMMON_EXP_TAGS = [
  "Wazuh",
  "MS Defender",
  "Qualys VMDR",
  "Incident Response",
  "Entra ID",
  "Intune",
  "Exchange",
  "SharePoint",
  "Datto RMM",
  "VM Setup",
  "OS Config",
  "Hardware",
  "LAN / Network",
  "React",
  "Tailwind CSS",
  "JavaScript",
  "PHP",
  "MySQL",
  "Python",
  "Django",
  "Deployment"
];

export const AdminPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Content States
  const [activeTab, setActiveTab] = useState("projects");
  const [showDeleted, setShowDeleted] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form Fields State
  const [projectForm, setProjectForm] = useState({
    slug: "",
    project_title: "",
    category: "Personal", // Custom Badge (e.g. Freelance, Capstone)
    group_type: "freelance", // "freelance" (Personal & Freelance) or "academic" (Academic)
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

  // Fetch data
  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, activeTab]);

  // Fetch all active skills on session load so they are available as options in project/experience tags
  useEffect(() => {
    if (session) {
      const loadAllSkills = async () => {
        try {
          const { data, error } = await supabase
            .from("skills")
            .select("*")
            .eq("is_deleted", false)
            .order("name", { ascending: true });
          if (error) throw error;
          
          const cleaned = (data || []).map(s => ({
            ...s,
            name: s.name ? s.name.trim().replace(/\s+/g, " ") : "",
            logo_url: s.logo_url ? s.logo_url.trim().replace(/^"|"$/g, "").replace(/\s+/g, "") : ""
          }));
          setSkills(cleaned);
        } catch (err) {
          console.error("Error loading skills for tag options:", err.message);
        }
      };
      loadAllSkills();
    }
  }, [session]);

  const fetchData = async () => {
    setFetchingData(true);
    try {
      if (activeTab === "projects") {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("year", { ascending: false });
        if (error) throw error;
        
        const cleaned = (data || []).map(p => ({
          ...p,
          slug: p.slug ? p.slug.replace(/\s+/g, "") : "",
          link: p.link ? p.link.replace(/\s+/g, "") : "",
          live_link: p.live_link ? p.live_link.replace(/\s+/g, "") : "",
          image_url: p.image_url ? p.image_url.replace(/\s+/g, "") : "",
          project_title: p.project_title ? p.project_title.trim().replace(/\s+/g, " ") : "",
          category: p.category ? p.category.trim().replace(/\s+/g, " ") : "",
          year: p.year ? p.year.replace(/\s+/g, "") : "",
          stack: (p.stack || []).map(s => s ? s.trim().replace(/\s+/g, " ") : "")
        }));
        setProjects(cleaned);
      } else if (activeTab === "skills") {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("name", { ascending: true });
        if (error) throw error;

        const cleaned = (data || []).map(s => ({
          ...s,
          name: s.name ? s.name.trim().replace(/\s+/g, " ") : "",
          logo_url: s.logo_url ? s.logo_url.trim().replace(/^"|"$/g, "").replace(/\s+/g, "") : ""
        }));
        setSkills(cleaned);
      } else if (activeTab === "certificates") {
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .order("year", { ascending: false });
        if (error) throw error;

        const cleaned = (data || []).map(c => ({
          ...c,
          title: c.title ? c.title.trim().replace(/\s+/g, " ") : "",
          issuer: c.issuer ? c.issuer.trim().replace(/\s+/g, " ") : "",
          year: c.year ? c.year.trim().replace(/\s+/g, "") : "",
          image_url: c.image_url ? c.image_url.trim().replace(/^"|"$/g, "").replace(/\s+/g, "") : ""
        }));
        setCertificates(cleaned);
      } else if (activeTab === "experiences") {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setExperiences(data || []);
      }
    } catch (err) {
      console.error(`Error fetching ${activeTab}:`, err.message);
      themeToast({
        icon: "error",
        title: `Fetch Failed: ${err.message}`,
        timer: 3000
      });
    } finally {
      setFetchingData(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      themeToast({
        icon: "success",
        title: "Welcome Back, Admin!",
        timer: 2000
      });
    } catch (err) {
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
      text: "Are you sure you want to end your admin session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Log Out",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      await supabase.auth.signOut();
      themeToast({
        icon: "success",
        title: "Signed Out",
        timer: 1500
      });
    }
  };

  // Upload File to Supabase Storage
  const uploadFile = async (e, folderName, updateFormCallback) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    themeSwal({
      title: "Uploading file...",
      text: "Please wait while your media is saved to Supabase storage.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${folderName}/${fileName}`;

      // Upload to 'portfolio' bucket
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      updateFormCallback(data.publicUrl);

      themeToast({
        icon: "success",
        title: "Uploaded successfully!",
        timer: 2000
      });
    } catch (err) {
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
  const openModal = (item = null) => {
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

  const handleSave = async (e) => {
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
        // Map group_type back to is_experience boolean
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
    } catch (err) {
      themeSwal({
        icon: "error",
        title: "Save Error",
        text: err.message
      });
    }
  };

  // Delete
  const handleDelete = async (item) => {
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
      cancelButtonText: "Cancel",
      confirmButtonClass: isSoftDelete 
        ? "btn btn-warning rounded-xl px-6 py-2.5 font-semibold text-slate-900 transition-all duration-200 hover:scale-105 active:scale-95" 
        : "btn btn-error rounded-xl px-6 py-2.5 font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95",
      cancelButtonClass: "btn btn-neutral rounded-xl px-6 py-2.5 font-semibold text-slate-300 transition-all duration-200 hover:scale-105 active:scale-95"
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
      } catch (err) {
        themeSwal({
          icon: "error",
          title: "Operation Failed",
          text: err.message
        });
      }
    }
  };

  // Restore
  const handleRestore = async (item) => {
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
    } catch (err) {
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
      <div className="flex min-h-screen items-center justify-center bg-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // LOGIN INTERFACE
  if (!session) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-base-300 px-4 py-12">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="rounded-3xl border border-base-content/10 bg-base-100/60 p-8 shadow-2xl backdrop-blur-md">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Lock size={28} />
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-base-content">
                Portfolio Admin Panel
              </h2>
              <p className="mt-2 text-sm text-base-content/60">
                Log in with your Supabase credentials
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email Address</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="input input-bordered w-full pl-10 focus:outline-primary"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/40">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-10 focus:outline-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="btn btn-primary w-full mt-2 rounded-xl"
              >
                {authLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    Sign In
                    <Sparkles size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-base-content/50 hover:text-primary transition-colors"
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

  // Filter based on Recycle Bin
  const getActiveList = (list) => {
    return list.filter((item) => (showDeleted ? !!item.is_deleted : !item.is_deleted));
  };

  // Search
  const filteredProjects = getActiveList(projects).filter(
    (p) =>
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
    <div className="min-h-screen bg-base-300 pb-20 font-Inter">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-base-content/10 bg-base-100/80 backdrop-blur-md px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield size={20} />
            </span>
            <div>
              <h1 className="text-lg font-bold text-base-content">
                Admin Dashboard
              </h1>
              <p className="text-xs text-base-content/50 font-mono">
                Connected to Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/" className="btn btn-ghost btn-sm rounded-xl gap-1">
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-error btn-outline btn-sm rounded-xl gap-1"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Info summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-base-content/10 bg-base-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  Projects
                </p>
                <h3 className="mt-2 text-3xl font-extrabold text-primary">
                  {projects.filter((p) => !p.is_deleted).length}
                </h3>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <FolderKanban size={22} />
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-base-content/10 bg-base-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  Skills
                </p>
                <h3 className="mt-2 text-3xl font-extrabold text-secondary">
                  {skills.filter((s) => !s.is_deleted).length}
                </h3>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <Code size={22} />
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-base-content/10 bg-base-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  Certificates
                </p>
                <h3 className="mt-2 text-3xl font-extrabold text-accent">
                  {certificates.filter((c) => !c.is_deleted).length}
                </h3>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <FileBadge size={22} />
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-base-content/10 bg-base-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                  Experiences
                </p>
                <h3 className="mt-2 text-3xl font-extrabold text-info">
                  {experiences.filter((e) => !e.is_deleted).length}
                </h3>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/15 text-info">
                <Briefcase size={22} />
              </span>
            </div>
          </div>
        </div>

        {/* Tab Controls & Search Row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="tabs tabs-boxed bg-base-100 p-1 border border-base-content/5 rounded-2xl w-fit flex flex-wrap">
            <button
              onClick={() => {
                setActiveTab("projects");
                setSearchTerm("");
              }}
              className={`tab rounded-xl gap-2 font-medium px-4 ${
                activeTab === "projects" ? "tab-active bg-primary text-primary-content" : ""
              }`}
            >
              <FolderKanban size={16} />
              Projects
            </button>
            <button
              onClick={() => {
                setActiveTab("skills");
                setSearchTerm("");
              }}
              className={`tab rounded-xl gap-2 font-medium px-4 ${
                activeTab === "skills" ? "tab-active bg-primary text-primary-content" : ""
              }`}
            >
              <Code size={16} />
              Skills
            </button>
            <button
              onClick={() => {
                setActiveTab("certificates");
                setSearchTerm("");
              }}
              className={`tab rounded-xl gap-2 font-medium px-4 ${
                activeTab === "certificates" ? "tab-active bg-primary text-primary-content" : ""
              }`}
            >
              <FileBadge size={16} />
              Certificates
            </button>
            <button
              onClick={() => {
                setActiveTab("experiences");
                setSearchTerm("");
              }}
              className={`tab rounded-xl gap-2 font-medium px-4 ${
                activeTab === "experiences" ? "tab-active bg-primary text-primary-content" : ""
              }`}
            >
              <Briefcase size={16} />
              Experience
            </button>
          </div>

          <div className="flex gap-2 items-center w-full sm:w-auto flex-wrap">
            <div className="relative flex-1 sm:w-60 min-w-[150px]">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40"
              />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 rounded-xl focus:outline-primary"
              />
            </div>

            <button
              onClick={() => setShowDeleted(!showDeleted)}
              className={`btn rounded-xl gap-1.5 ${
                showDeleted
                  ? "btn-warning bg-warning/20 border-warning text-warning hover:bg-warning hover:text-warning-content"
                  : "btn-outline btn-neutral"
              }`}
            >
              {showDeleted ? <History size={16} /> : <Trash size={16} />}
              {showDeleted ? "Active Items" : "Recycle Bin"}
            </button>

            {!showDeleted && (
              <button
                onClick={() => openModal()}
                className="btn btn-primary rounded-xl gap-1 shadow-md shadow-primary/20"
              >
                <Plus size={18} />
                Add New
              </button>
            )}
          </div>
        </div>

        {showDeleted && (
          <div className="mb-4 alert alert-warning rounded-2xl flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-sm">
              <Trash size={16} className="text-warning-content" />
              <span className="font-semibold">Recycle Bin View:</span> Showing deleted items only. You can restore or permanently delete them.
            </div>
            <button onClick={() => setShowDeleted(false)} className="btn btn-xs btn-ghost text-warning-content">
              Close
            </button>
          </div>
        )}

        {/* Dynamic Lists */}
        {fetchingData ? (
          <div className="flex justify-center py-20 bg-base-100 rounded-3xl border border-base-content/10">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : (
          <div className="rounded-3xl border border-base-content/10 bg-base-100 shadow-sm overflow-hidden">
            
            {/* 1. PROJECTS LIST */}
            {activeTab === "projects" && (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full min-w-[700px]">
                  <thead>
                    <tr>
                      <th>Project Title / Slug</th>
                      <th>Section & Custom Badge</th>
                      <th>Year</th>
                      <th>Links</th>
                      <th>Featured</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-10 text-base-content/50">
                          {showDeleted ? "No deleted projects in Recycle Bin." : "No projects found."}
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((p) => (
                        <tr key={p.id} className="hover">
                          <td>
                            <div className="font-bold text-base-content">
                              {p.project_title}
                            </div>
                            <div className="text-xs text-base-content/50 font-mono mt-0.5">
                              /{p.slug}
                            </div>
                          </td>
                          <td>
                            <div className="badge badge-primary badge-outline badge-sm font-semibold mb-1">
                              {p.is_experience ? "Personal & Freelance" : "Academic"}
                            </div>
                            <div className="text-xs font-mono text-base-content/60">
                              Badge: {p.category}
                            </div>
                          </td>
                          <td>
                            <div className="text-xs font-mono">{p.year}</div>
                          </td>
                          <td>
                            <div className="flex flex-col gap-1 text-xs">
                              {p.link && (
                                <a
                                  href={p.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="link link-hover flex items-center gap-1 text-base-content/60 hover:text-primary"
                                >
                                  Code <ExternalLink size={10} />
                                </a>
                              )}
                              {p.live_link && (
                                <a
                                  href={p.live_link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="link link-hover flex items-center gap-1 text-base-content/60 hover:text-primary"
                                >
                                  Demo <ExternalLink size={10} />
                                </a>
                              )}
                            </div>
                          </td>
                          <td>
                            {p.featured ? (
                              <span className="badge badge-success badge-sm">Yes</span>
                            ) : (
                              <span className="badge badge-ghost badge-sm text-base-content/30">
                                No
                              </span>
                            )}
                          </td>
                          <td className="text-right">
                            <div className="flex gap-1 justify-end">
                              {showDeleted ? (
                                <>
                                  <button
                                    onClick={() => handleRestore(p)}
                                    className="btn btn-square btn-ghost btn-sm text-success hover:bg-success/10"
                                  >
                                    <RotateCcw size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(p)}
                                    className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/10"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => openModal(p)}
                                    className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-primary"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(p)}
                                    className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-error hover:bg-error/10"
                                  >
                                    <Trash2 size={16} />
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
              </div>
            )}

            {/* 2. SKILLS LIST */}
            {activeTab === "skills" && (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full min-w-[500px]">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Logo / Icon reference</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSkills.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-10 text-base-content/50">
                          {showDeleted ? "No deleted skills in Recycle Bin." : "No skills found."}
                        </td>
                      </tr>
                    ) : (
                      filteredSkills.map((s) => (
                        <tr key={s.id} className="hover">
                          <td className="font-bold text-base-content">{s.name}</td>
                          <td>
                            <div className="badge badge-primary badge-outline badge-sm">
                              {s.category}
                            </div>
                          </td>
                          <td>
                            <div className="badge badge-ghost badge-sm font-mono">
                              {s.type}
                            </div>
                          </td>
                          <td className="font-mono text-xs max-w-xs truncate">
                            {s.logo_url}
                          </td>
                          <td className="text-right">
                            <div className="flex gap-1 justify-end">
                              {showDeleted ? (
                                <>
                                  <button
                                    onClick={() => handleRestore(s)}
                                    className="btn btn-square btn-ghost btn-sm text-success hover:bg-success/10"
                                  >
                                    <RotateCcw size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(s)}
                                    className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/10"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => openModal(s)}
                                    className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-primary"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(s)}
                                    className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-error hover:bg-error/10"
                                  >
                                    <Trash2 size={16} />
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
              </div>
            )}

            {/* 3. CERTIFICATES LIST */}
            {activeTab === "certificates" && (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full min-w-[600px]">
                  <thead>
                    <tr>
                      <th>Certificate Title</th>
                      <th>Issuer</th>
                      <th>Category</th>
                      <th>Year</th>
                      <th>Type</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCerts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-10 text-base-content/50">
                          {showDeleted ? "No deleted certificates in Recycle Bin." : "No certificates found."}
                        </td>
                      </tr>
                    ) : (
                      filteredCerts.map((c) => (
                        <tr key={c.id} className="hover">
                          <td>
                            <div className="font-bold text-base-content">{c.title}</div>
                            <div className="text-xs text-base-content/40 font-mono truncate max-w-xs">
                              {c.image_url}
                            </div>
                          </td>
                          <td>{c.issuer}</td>
                          <td>
                            <div className="badge badge-accent badge-outline badge-sm">
                              {c.category}
                            </div>
                          </td>
                          <td className="font-mono text-sm">{c.year}</td>
                          <td>
                            {c.is_pdf ? (
                              <span className="badge badge-info badge-sm">PDF File</span>
                            ) : (
                              <span className="badge badge-outline badge-sm text-base-content/55">
                                Image
                              </span>
                            )}
                          </td>
                          <td className="text-right">
                            <div className="flex gap-1 justify-end">
                              {showDeleted ? (
                                <>
                                  <button
                                    onClick={() => handleRestore(c)}
                                    className="btn btn-square btn-ghost btn-sm text-success hover:bg-success/10"
                                  >
                                    <RotateCcw size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(c)}
                                    className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/10"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => openModal(c)}
                                    className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-primary"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(c)}
                                    className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-error hover:bg-error/10"
                                  >
                                    <Trash2 size={16} />
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
              </div>
            )}

            {/* 4. EXPERIENCES LIST */}
            {activeTab === "experiences" && (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full min-w-[700px]">
                  <thead>
                    <tr>
                      <th>Job Title / Company</th>
                      <th>Subtitle / Period</th>
                      <th>Location / Accent</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExps.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-10 text-base-content/50">
                          {showDeleted ? "No deleted experiences in Recycle Bin." : "No experiences found."}
                        </td>
                      </tr>
                    ) : (
                      filteredExps.map((e) => (
                        <tr key={e.id} className="hover">
                          <td>
                            <div className="font-bold text-base-content">{e.title}</div>
                            <div className="text-xs text-base-content/60 font-semibold">
                              {e.company}
                            </div>
                          </td>
                          <td>
                            <div className="text-sm font-semibold">{e.subtitle}</div>
                            <div className="text-xs text-base-content/40 font-mono mt-0.5">
                              {e.period}
                            </div>
                          </td>
                          <td>
                            <div className="badge badge-sm badge-outline mr-1">{e.location}</div>
                            <div className={`badge badge-sm badge-${e.accent || "primary"}`}>
                              {e.accent || "primary"}
                            </div>
                          </td>
                          <td>
                            {e.current ? (
                              <span className="badge badge-primary badge-sm">Current</span>
                            ) : (
                              <span className="badge badge-ghost badge-sm text-base-content/40">
                                Past
                              </span>
                            )}
                          </td>
                          <td className="text-right">
                            <div className="flex gap-1 justify-end">
                              {showDeleted ? (
                                <>
                                  <button
                                    onClick={() => handleRestore(e)}
                                    className="btn btn-square btn-ghost btn-sm text-success hover:bg-success/10"
                                  >
                                    <RotateCcw size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(e)}
                                    className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/10"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => openModal(e)}
                                    className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-primary"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(e)}
                                    className="btn btn-square btn-ghost btn-sm text-base-content/70 hover:text-error hover:bg-error/10"
                                  >
                                    <Trash2 size={16} />
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
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal modal-open z-30">
          <div className="modal-box w-11/12 max-w-3xl rounded-3xl border border-base-content/10 bg-base-100 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-base-content/5">
              <h3 className="text-xl font-bold text-base-content">
                {editingItem ? "Edit Entry" : "Create New Entry"} -{" "}
                <span className="capitalize text-primary">{activeTab}</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="btn btn-circle btn-ghost btn-sm">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              
              {/* PROJECTS */}
              {activeTab === "projects" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Project Title</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.project_title}
                      onChange={(e) => setProjectForm({ ...projectForm, project_title: e.target.value })}
                      placeholder="e.g. CyberGuide AI"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Slug (Unique URL path)</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.slug}
                      onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                      placeholder="e.g. cyberguide-ai"
                      className="input input-bordered w-full rounded-xl font-mono text-sm"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Project Category (Determines where it belongs)</span>
                    </label>
                    <select
                      value={projectForm.group_type}
                      onChange={(e) => setProjectForm({ ...projectForm, group_type: e.target.value })}
                      className="select select-bordered w-full rounded-xl"
                    >
                      <option value="freelance">Freelance / Personal Project</option>
                      <option value="academic">Academic Project</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Category Badge Label</span>
                    </label>
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
                      className="select select-bordered w-full rounded-xl"
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
                          className="input input-bordered w-full rounded-xl input-sm"
                        />
                      </div>
                    )}
                  </div>


                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Year</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.year}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      placeholder="e.g. 2026"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  {/* Project Image Upload */}
                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Upload Project Preview Image</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={(e) => uploadFile(e, "projects", (url) => setProjectForm({ ...projectForm, image_url: url }))}
                        className="file-input file-input-bordered file-input-primary w-full rounded-xl"
                      />
                    </div>
                    {projectForm.image_url && (
                      <div className="mt-3 flex items-center gap-4 rounded-xl border border-base-content/10 bg-base-200/40 p-3">
                        <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-base-content/10 bg-base-300">
                          <img src={PROJECT_IMGS[projectForm.image_url] || projectForm.image_url} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1 text-xs font-mono">
                          <span className="font-semibold text-success block mb-0.5">✓ Uploaded & Active Preview:</span>
                          <a href={projectForm.image_url} target="_blank" rel="noreferrer" className="link link-primary truncate block hover:underline">{projectForm.image_url}</a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">GitHub Link</span>
                    </label>
                    <input
                      type="url"
                      value={projectForm.link}
                      onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                      placeholder="https://github.com/..."
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Live Demo Link</span>
                    </label>
                    <input
                      type="url"
                      value={projectForm.live_link}
                      onChange={(e) => setProjectForm({ ...projectForm, live_link: e.target.value })}
                      placeholder="https://my-app.vercel.app"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Tech Stack</span>
                    </label>
                    
                    {/* Dynamic Tech Badges from Skills */}
                    <div className="mb-2 flex flex-wrap gap-1.5 rounded-2xl border border-base-content/10 bg-base-200/40 p-3">
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
                            className={`badge px-3 py-2.5 text-xs font-semibold cursor-pointer transition-all duration-150 select-none ${
                              isActive
                                ? "badge-primary text-primary-content hover:scale-105"
                                : "badge-outline opacity-60 hover:opacity-100 hover:scale-105"
                            }`}
                          >
                            {techName}
                          </button>
                        );
                      })}
                    </div>

                    <label className="label py-1">
                      <span className="label-text-alt text-base-content/60">Or manually type/modify (comma-separated):</span>
                    </label>
                    <input
                      type="text"
                      value={projectForm.stack}
                      onChange={(e) => setProjectForm({ ...projectForm, stack: e.target.value })}
                      placeholder="React, Vite, Tailwind CSS, Django"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4 py-2">
                    <label className="label cursor-pointer flex gap-2">
                      <input
                        type="checkbox"
                        checked={projectForm.live_view}
                        onChange={(e) => setProjectForm({ ...projectForm, live_view: e.target.checked })}
                        className="checkbox checkbox-primary checkbox-sm rounded-md"
                      />
                      <span className="label-text font-medium">Show Live Demo button</span>
                    </label>

                    <label className="label cursor-pointer flex gap-2">
                      <input
                        type="checkbox"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        className="checkbox checkbox-primary checkbox-sm rounded-md"
                      />
                      <span className="label-text font-medium">Featured Project</span>
                    </label>
                  </div>

                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Case Study: The Problem</span>
                    </label>
                    <textarea
                      value={projectForm.case_study_problem}
                      onChange={(e) => setProjectForm({ ...projectForm, case_study_problem: e.target.value })}
                      placeholder="What was the problem this project solved? (Optional)"
                      className="textarea textarea-bordered h-20 rounded-xl"
                    />
                  </div>

                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Case Study: The Outcome</span>
                    </label>
                    <textarea
                      value={projectForm.case_study_outcome}
                      onChange={(e) => setProjectForm({ ...projectForm, case_study_outcome: e.target.value })}
                      placeholder="What was the outcome or impact? (Optional)"
                      className="textarea textarea-bordered h-20 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* SKILLS */}
              {activeTab === "skills" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Skill Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      placeholder="e.g. Django, Wazuh, MySQL"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Category</span>
                    </label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      className="select select-bordered w-full rounded-xl"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="cyber">Cybersecurity</option>
                      <option value="it">IT & Systems</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Logo Rendering Type</span>
                    </label>
                    <select
                      value={skillForm.type}
                      onChange={(e) => setSkillForm({ ...skillForm, type: e.target.value })}
                      className="select select-bordered w-full rounded-xl"
                    >
                      <option value="img">Image File or Local SVG import</option>
                      <option value="lucide">Lucide Icon Component name</option>
                    </select>
                  </div>

                  {skillForm.type === "lucide" ? (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Lucide Icon Name</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={skillForm.logo_url}
                        onChange={(e) => setSkillForm({ ...skillForm, logo_url: e.target.value })}
                        placeholder="e.g. Shield, Activity, Users, Monitor"
                        className="input input-bordered w-full rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="form-control col-span-1 md:col-span-2">
                      <label className="label">
                        <span className="label-text font-semibold">Upload Logo Image</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={(e) => uploadFile(e, "skills", (url) => setSkillForm({ ...skillForm, logo_url: url }))}
                        className="file-input file-input-bordered file-input-primary w-full rounded-xl"
                      />
                      {skillForm.logo_url && (
                        <div className="mt-3 flex items-center gap-3 rounded-xl border border-base-content/10 bg-base-200/40 p-2.5">
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-base-content/10 bg-base-300 flex items-center justify-center p-1.5">
                            <img src={LOCAL_LOGOS[skillForm.logo_url] || skillForm.logo_url} alt="Preview" className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="min-w-0 flex-1 text-xs font-mono">
                            <span className="font-semibold text-success block mb-0.5">✓ Uploaded & Active Logo:</span>
                            <a href={skillForm.logo_url} target="_blank" rel="noreferrer" className="link link-primary truncate block hover:underline">{skillForm.logo_url}</a>
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
                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Certificate Title</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      placeholder="e.g. Responsive Web Design"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Issuer</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      placeholder="e.g. freeCodeCamp, ISC2, Microsoft"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Year</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={certForm.year}
                      onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                      placeholder="e.g. 2025"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Category</span>
                    </label>
                    <select
                      value={certForm.category}
                      onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                      className="select select-bordered w-full rounded-xl"
                    >
                      <option value="web-dev">Web Development</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="it-admin">IT & Systems</option>
                      <option value="ai">AI</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  {/* Certificate Upload */}
                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Upload Certificate File (Image or PDF)</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const isPdf = file ? file.type === "application/pdf" : false;
                        uploadFile(e, "certificates", (url) => setCertForm({ ...certForm, image_url: url, is_pdf: isPdf }));
                      }}
                      className="file-input file-input-bordered file-input-primary w-full rounded-xl"
                    />
                    {certForm.image_url && (
                      <div className="mt-3 flex items-center gap-4 rounded-xl border border-base-content/10 bg-base-200/40 p-3">
                        <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-base-content/10 bg-base-300 flex items-center justify-center">
                          {certForm.is_pdf ? (
                            <div className="text-[10px] text-center font-bold text-error uppercase px-1">PDF File</div>
                          ) : (
                            <img src={LOCAL_ASSETS[certForm.image_url] || certForm.image_url} alt="Preview" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 text-xs font-mono">
                          <span className="font-semibold text-success block mb-0.5">✓ Uploaded & Active:</span>
                          <a href={certForm.image_url} target="_blank" rel="noreferrer" className="link link-primary truncate block hover:underline">{certForm.image_url}</a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-control py-2 justify-end">
                    <label className="label cursor-pointer flex gap-2 justify-start">
                      <input
                        type="checkbox"
                        checked={certForm.is_pdf}
                        onChange={(e) => setCertForm({ ...certForm, is_pdf: e.target.checked })}
                        className="checkbox checkbox-primary checkbox-sm rounded-md"
                      />
                      <span className="label-text font-medium">This is a PDF file</span>
                    </label>
                  </div>
                </div>
              )}

              {/* EXPERIENCES */}
              {activeTab === "experiences" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Job Title</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.title}
                      onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                      placeholder="e.g. Cybersecurity Analyst"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Subtitle</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.subtitle}
                      onChange={(e) => setExpForm({ ...expForm, subtitle: e.target.value })}
                      placeholder="e.g. SOC Analyst L1"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Company</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.company}
                      onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                      placeholder="e.g. Aetas Security"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Location</span>
                    </label>
                    <select
                      value={expForm.location}
                      onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                      className="select select-bordered w-full rounded-xl"
                    >
                      <option value="On-site">On-site</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Period</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.period}
                      onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                      placeholder="e.g. Nov 2025 - Present"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Lucide Icon Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.icon_name}
                      onChange={(e) => setExpForm({ ...expForm, icon_name: e.target.value })}
                      placeholder="Shield, Code2, Monitor, Briefcase"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Accent color</span>
                    </label>
                    <select
                      value={expForm.accent}
                      onChange={(e) => setExpForm({ ...expForm, accent: e.target.value })}
                      className="select select-bordered w-full rounded-xl"
                    >
                      <option value="primary">Primary (Green)</option>
                      <option value="secondary">Secondary (Pink)</option>
                      <option value="accent">Accent (Yellow)</option>
                    </select>
                  </div>

                  <div className="form-control py-2 justify-end">
                    <label className="label cursor-pointer flex gap-2 justify-start">
                      <input
                        type="checkbox"
                        checked={expForm.current}
                        onChange={(e) => setExpForm({ ...expForm, current: e.target.checked })}
                        className="checkbox checkbox-primary checkbox-sm rounded-md"
                      />
                      <span className="label-text font-medium">This is my current active role</span>
                    </label>
                  </div>

                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Tags</span>
                    </label>
                    
                    {/* Dynamic Experience Tag Badges from Skills */}
                    <div className="mb-2 flex flex-wrap gap-1.5 rounded-2xl border border-base-content/10 bg-base-200/40 p-3">
                      {((skills && skills.length > 0) ? skills.map(s => s.name) : COMMON_EXP_TAGS).map((tagName) => {
                        const currentTags = expForm.tags
                          ? expForm.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
                          : [];
                        const isActive = currentTags.includes(tagName);
                        
                        return (
                          <button
                            type="button"
                            key={tagName}
                            onClick={() => {
                              let newTags;
                              if (isActive) {
                                newTags = currentTags.filter((t) => t !== tagName);
                              } else {
                                newTags = [...currentTags, tagName];
                              }
                              setExpForm({
                                ...expForm,
                                tags: newTags.join(", ")
                              });
                            }}
                            className={`badge px-3 py-2.5 text-xs font-semibold cursor-pointer transition-all duration-150 select-none ${
                              isActive
                                ? "badge-primary text-primary-content hover:scale-105"
                                : "badge-outline opacity-60 hover:opacity-100 hover:scale-105"
                            }`}
                          >
                            {tagName}
                          </button>
                        );
                      })}
                    </div>

                    <label className="label py-1">
                      <span className="label-text-alt text-base-content/60">Or manually type/modify (comma-separated):</span>
                    </label>
                    <input
                      type="text"
                      value={expForm.tags}
                      onChange={(e) => setExpForm({ ...expForm, tags: e.target.value })}
                      placeholder="React, Wazuh, Entra ID"
                      className="input input-bordered w-full rounded-xl"
                    />
                  </div>

                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Bullet Points (One bullet per line)</span>
                    </label>
                    <textarea
                      required
                      value={expForm.bullets}
                      onChange={(e) => setExpForm({ ...expForm, bullets: e.target.value })}
                      placeholder="Monitor security alerts...&#10;Perform threat incident response..."
                      className="textarea textarea-bordered h-32 rounded-xl"
                    />
                  </div>
                </div>
              )}

              <div className="modal-action gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-ghost rounded-xl">
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="btn btn-primary rounded-xl px-6">
                  {uploading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
