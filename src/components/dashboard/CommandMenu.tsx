import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Monitor, Palette, FileText, ArrowRight, X } from "lucide-react";
import { navItems, themes } from "./navItems";
import { allProjects, fetchProjectsFromSupabase } from "../projectSection/projectData";
import { profileKnowledge } from "../../data/profileKnowledge";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const CommandMenu = ({ isOpen, onClose, currentTheme, onThemeChange }: CommandMenuProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [projectList, setProjectList] = useState(allProjects);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchProjectsFromSupabase().then((data) => {
        if (data && data.length > 0) {
          setProjectList(data);
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle global shortcuts
  useEffect(() => {
    const handleKeydown = (e) => {
      if (isOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleAction(filteredItems[selectedIndex]);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.querySelector(".command-active");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Compile searchable list
  const getSearchItems = () => {
    const items = [];

    // 1. Navigation items
    navItems.forEach((nav) => {
      items.push({
        id: `nav-${nav.id}`,
        category: "Navigation",
        label: `Go to ${nav.label}`,
        icon: nav.Icon,
        action: () => navigate(nav.path),
      });
    });

    // 2. Themes switching
    themes.forEach((theme) => {
      items.push({
        id: `theme-${theme}`,
        category: "Themes",
        label: `Switch theme to ${theme}`,
        icon: Palette,
        action: () => onThemeChange(theme),
      });
    });

    // 3. Projects list
    projectList.forEach((proj) => {
      items.push({
        id: `project-${proj.slug}`,
        category: "Projects",
        label: `View details for ${proj.projectTitle}`,
        icon: ArrowRight,
        action: () => navigate(`/projects/${proj.slug}`),
      });
    });

    // 4. Resume download
    items.push({
      id: "action-resume",
      category: "Actions",
      label: "Download / Open Resume",
      icon: FileText,
      action: () => navigate("/resume"),
    });

    return items;
  };

  const allSearchItems = getSearchItems();

  const filteredItems = allSearchItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleAction = (item: any) => {
    item.action();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-gray-950/20 p-4 pt-[10vh] backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-bg shadow-2xl">
        {/* Search header input */}
        <div className="flex items-center gap-3 border-b border-gray-200/60 dark:border-gray-800/60 px-4 py-3 bg-gray-50/20 dark:bg-gray-950/10">
          <Search size={18} className="text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-gray-400"
          />
          <kbd className="hidden rounded border border-gray-200/80 dark:border-gray-800/80 bg-bg px-2 py-0.5 font-mono text-[10px] sm:block text-gray-400">ESC</kbd>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100/70 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Results view */}
        <div
          ref={listRef}
          className="max-h-[340px] overflow-y-auto p-2"
        >
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400 font-mono">No commands found.</div>
          ) : (
            <div>
              {/* Group results by category */}
              {Object.entries(
                filteredItems.reduce<Record<string, any[]>>((acc, item) => {
                  if (!acc[item.category]) acc[item.category] = [];
                  acc[item.category].push(item);
                  return acc;
                }, {})
              ).map(([category, catItems]) => (
                <div key={category} className="mb-2">
                  <div className="px-3 py-1.5 text-[9px] font-bold font-mono uppercase tracking-wider text-gray-400">
                    {category}
                  </div>
                  <div className="space-y-0.5">
                    {catItems.map((item) => {
                      const absoluteIndex = filteredItems.findIndex((x) => x.id === item.id);
                      const isSelected = absoluteIndex === selectedIndex;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleAction(item)}
                          onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium border border-transparent transition-all duration-150 ${
                            isSelected
                              ? "command-active bg-gray-100 border-gray-200/40 dark:border-gray-800/30 text-ink font-semibold"
                              : "text-gray-500 hover:bg-gray-100/70"
                          }`}
                        >
                          <Icon size={14} className={isSelected ? "text-ink" : "text-gray-400"} />
                          <span className="flex-1 truncate">{item.label}</span>
                          {isSelected && (
                            <span className="text-[10px] opacity-75 font-mono">↵ Enter</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Helper footer */}
        <div className="flex justify-between items-center border-t border-gray-200/60 dark:border-gray-800/60 bg-gray-50/20 dark:bg-gray-950/10 px-4 py-2 font-mono text-[9px] text-gray-400">
          <div className="flex gap-3">
            <span>↑↓ Nav</span>
            <span>↵ Select</span>
          </div>
          <span>Cmd + K to close</span>
        </div>
      </div>
    </div>
  );
};
