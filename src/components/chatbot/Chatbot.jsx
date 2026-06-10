import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

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

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-content"
            : "border border-base-content/10 bg-base-200 text-base-content"
        }`}
      >
        {message.content}
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
    <div className="flex items-end gap-2 border-t border-base-content/10 p-3">
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask about my portfolio..."
        disabled={disabled}
        className="textarea textarea-bordered min-h-11 flex-1 resize-none rounded-xl text-sm focus:textarea-primary"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="btn btn-primary min-h-11 rounded-xl px-3"
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
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send message. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="fixed bottom-24 right-4 z-50 flex h-[min(38rem,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-2xl shadow-base-content/20 sm:right-6">
      <header className="flex items-center justify-between border-b border-base-content/10 bg-base-200/70 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-content">
            <Bot size={19} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-base-content">
              Portfolio Assistant
            </h2>
            <p className="text-xs text-base-content/55">
              Ask about Mark&apos;s work
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost btn-sm min-h-9 rounded-xl"
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
            <p className="text-[10px] font-semibold uppercase tracking-wider text-base-content/40">Suggested Questions</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => sendMessage(chip.query)}
                  className="rounded-xl border border-base-content/10 bg-base-100 px-3 py-1.5 text-xs text-base-content/75 transition-colors hover:border-primary/45 hover:bg-base-200"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-base-content/10 bg-base-200 px-4 py-3 text-sm text-base-content/60">
              <Loader2 size={15} className="animate-spin" />
              Thinking...
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
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
    className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-xl shadow-primary/25 transition-transform duration-200 hover:-translate-y-0.5 sm:right-6"
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
