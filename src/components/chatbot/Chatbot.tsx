import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { profileKnowledge } from "../../data/profileKnowledge.js";
import { supabase } from "@/lib/supabaseClient";

const initialMessages = [
  {
    role: "assistant",
    content:
      "Hi, I can answer questions about Mark's profile, education, skills, experience, availability, projects, and contact information.",
  },
];

const suggestions = [
  { label: "🔍 View Projects", query: "Show me Mark's portfolio projects" },
  { label: "💼 Available for work?", query: "Are you available for freelance commissions?" },
  { label: "📧 Get Contact Info", query: "How can I contact Mark?" },
  { label: "📄 Get Resume", query: "Where can I download Mark's resume?" },
];

const renderLinks = (text, isUser) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = linkRegex.exec(text)) !== null) {
    const [_, linkText, linkUrl] = match;
    const matchIndex = match.index;
    
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }
    
    parts.push(
      <a
        key={matchIndex}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`underline font-semibold transition-opacity hover:opacity-80 break-all ${
          isUser ? "text-white" : "text-build"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {linkText}
      </a>
    );
    
    lastIndex = linkRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

const renderInlineCode = (text, isUser) => {
  const codeParts = text.split(/`([^`]+)`/g);
  return codeParts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <code
          key={index}
          className={`rounded px-1.5 py-0.5 text-xs font-mono break-all ${
            isUser ? "bg-build/30 text-white" : "bg-gray-100 dark:bg-gray-900 text-ink"
          }`}
        >
          {part}
        </code>
      );
    }
    return renderLinks(part, isUser);
  });
};

const renderInlineMarkdown = (text, isUser) => {
  const boldParts = text.split(/\*\*([^*]+)\*\*/g);
  return boldParts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-bold">
          {renderInlineCode(part, isUser)}
        </strong>
      );
    }
    return renderInlineCode(part, isUser);
  });
};

const formatMessageContent = (content, isUser) => {
  if (!content) return "";
  
  const paragraphs = content.split("\n\n");
  
  return paragraphs.map((para, paraIdx) => {
    const lines = para.split("\n");
    const renderedLines = [];
    let currentList = [];
    
    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();
      const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
      
      if (isBullet) {
        currentList.push(trimmed.replace(/^[-*]\s+/, ""));
      } else {
        if (currentList.length > 0) {
          renderedLines.push(
            <ul key={`list-${lineIdx}`} className="list-disc pl-5 my-1.5 space-y-1">
              {currentList.map((item, itemIdx) => (
                <li key={itemIdx} className="break-words">
                  {renderInlineMarkdown(item, isUser)}
                </li>
              ))}
            </ul>
          );
          currentList = [];
        }
        
        if (trimmed) {
          renderedLines.push(
            <div key={`text-${lineIdx}`} className="break-words mb-1 last:mb-0">
              {renderInlineMarkdown(trimmed, isUser)}
            </div>
          );
        } else {
          renderedLines.push(<div key={`br-${lineIdx}`} className="h-2" />);
        }
      }
    });
    
    if (currentList.length > 0) {
      renderedLines.push(
        <ul key={`list-end`} className="list-disc pl-5 my-1.5 space-y-1">
          {currentList.map((item, itemIdx) => (
            <li key={itemIdx} className="break-words">
              {renderInlineMarkdown(item, isUser)}
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <div key={paraIdx} className="mb-3 last:mb-0">
        {renderedLines}
      </div>
    );
  });
};

const getLocalFallbackReply = (text, resumeUrl) => {
  const query = text.toLowerCase();
  
  if (query.includes("project") || query.includes("portfolio")) {
    const list = profileKnowledge.projects
      .map(p => `- **${p.title}** (${p.year}): ${p.summary || p.role} [Stack: ${p.stack.join(", ")}]`)
      .join("\n");
    return `Here are some of Mark's projects:\n\n${list}`;
  }
  
  if (query.includes("available") || query.includes("availability") || query.includes("hire") || query.includes("work")) {
    return profileKnowledge.commonAnswers.availability;
  }
  
  if (query.includes("contact") || query.includes("email") || query.includes("social") || query.includes("facebook") || query.includes("instagram") || query.includes("linkedin")) {
    return `You can contact Mark via:\n\n- **Email**: ${profileKnowledge.contact.email}\n- **GitHub**: [GitHub Link](${profileKnowledge.contact.github})\n- **LinkedIn**: [LinkedIn Link](${profileKnowledge.contact.linkedin})\n- **Facebook**: [Facebook Link](${profileKnowledge.contact.facebook})`;
  }
  
  if (query.includes("resume") || query.includes("cv")) {
    return `You can download Mark's resume here:\n[Download Resume PDF](${resumeUrl})`;
  }
  
  if (query.includes("skill") || query.includes("tech") || query.includes("stack") || query.includes("logo")) {
    return `Mark's skills include:\n\n- **Frontend**: ${profileKnowledge.skills.frontend.join(", ")}\n- **Backend**: ${profileKnowledge.skills.backend.join(", ")}\n- **Cybersecurity**: ${profileKnowledge.skills.cybersecurity.join(", ")}\n- **IT Systems**: ${profileKnowledge.skills.itSystems.join(", ")}`;
  }
  
  if (query.includes("education") || query.includes("degree") || query.includes("school") || query.includes("college") || query.includes("graduate") || query.includes("wmsu")) {
    return `Mark graduated from **${profileKnowledge.education.school}** in ${profileKnowledge.education.graduationYear} with a **${profileKnowledge.education.degree}**.`;
  }
  
  if (query.includes("experience") || query.includes("job") || query.includes("work") || query.includes("soc") || query.includes("analyst") || query.includes("company")) {
    const expList = profileKnowledge.experience
      .map(e => `- **${e.title}** (${e.company}, ${e.period}): ${e.bullets.join(", ")}`)
      .join("\n");
    return `Here is a summary of Mark's experience:\n\n${expList}`;
  }
  
  if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("help")) {
    return `Hello! ${profileKnowledge.commonAnswers.tellMeAboutMark}`;
  }
  
  // Default general response
  return profileKnowledge.commonAnswers.tellMeAboutMark;
};

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed break-words [word-break:break-word] ${
          isUser
            ? "bg-build text-bg font-semibold"
            : "border border-gray-200 dark:border-gray-800 bg-gray-50/15 dark:bg-gray-950/5 text-ink"
        }`}
      >
        {formatMessageContent(message.content, isUser)}
      </div>
    </div>
  );
};

const ChatInput = ({ value, onChange, onSend, disabled }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t border-gray-200/60 dark:border-gray-800/60 p-3">
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask about my portfolio..."
        disabled={disabled}
        className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-all focus:border-build/50 focus:ring-2 focus:ring-build/10 disabled:opacity-50 resize-none min-h-11 flex-1"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-bg hover:opacity-90 disabled:opacity-50 transition-opacity border border-gray-200/10 cursor-pointer"
        aria-label="Send message"
      >
        {disabled ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
      </button>
    </div>
  );
};

const ChatbotPanel = ({ onClose }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const [resumeUrl, setResumeUrl] = useState("/Tabotabo_resume.pdf");

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  const sendMessage = async (overrideText) => {
    const text = (typeof overrideText === "string" ? overrideText : input).trim();
    if (!text || isLoading) return;

    setMessages((current) => [...current, { role: "user", content: text }]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to get a response.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.warn("Chatbot Netlify function unavailable or returned an error, using local fallback:", err);
      // Wait slightly to simulate assistant processing
      await new Promise((resolve) => setTimeout(resolve, 600));
      const fallbackReply = getLocalFallbackReply(text, resumeUrl);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: fallbackReply },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="fixed bottom-24 right-4 z-50 flex h-[min(38rem,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-bg shadow-2xl sm:right-6">
      <header className="flex items-center justify-between border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/15 dark:bg-gray-950/5 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-build/15 bg-build/5 text-build">
            <Bot size={19} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-ink font-serif">
              Portfolio Assistant
            </h2>
            <p className="text-xs text-gray-500">
              Ask about Mark&apos;s work
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-100/70 text-gray-400 hover:text-ink transition-colors bg-transparent border-0 cursor-pointer"
          aria-label="Close chatbot"
        >
          <X size={18} />
        </button>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage key={`${message.role}-${index}`} message={message} />
        ))}

        {messages.length === 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">Suggested Questions</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => sendMessage(chip.query)}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-bg px-3 py-1.5 text-xs text-gray-500 transition-colors hover:border-build/30 hover:bg-gray-100/70 cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-bg px-4 py-3 text-sm text-gray-500">
              <Loader2 size={15} className="animate-spin" />
              Thinking...
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-defend/20 bg-defend/10 px-4 py-3 text-sm text-defend font-mono">
            {error}
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={sendMessage}
        disabled={isLoading}
      />
    </section>
  );
};

const ChatbotButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-bg shadow-xl hover:opacity-90 transition-all hover:-translate-y-0.5 sm:right-6 border border-gray-200/10 cursor-pointer"
    aria-label="Open portfolio assistant"
  >
    <MessageCircle size={23} />
  </button>
);

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatbotPanel onClose={() => setIsOpen(false)} />}
      {!isOpen && <ChatbotButton onClick={() => setIsOpen(true)} />}
    </>
  );
};
