"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = { role: "user" | "assistant"; text: string };

// ── Constants ──────────────────────────────────────────────────────────────────

const WELCOME = `Hey! I'm Van Anh. 👋

Think of this as a conversation with me — ask me anything about my background, campaigns, skills, or availability.

Here's what I can help with:`;

const GUIDE_TOPICS = [
  { label: "My background & story", icon: "🧑‍💼" },
  { label: "Experience at a company", icon: "💼" },
  { label: "Campaigns I've led", icon: "🎯" },
  { label: "Skills & strengths", icon: "⚡" },
  { label: "Education & awards", icon: "🏆" },
  { label: "Availability & contact", icon: "📬" },
];

const SUGGESTIONS = [
  "What's your story?",
  "Tell me about your best campaign",
  "What makes you different?",
  "Why should I hire you?",
];

function AssistantBubble({ text }: { text: string }) {
  return (
    <div className="max-w-[88%] rounded-2xl rounded-bl-md px-5 py-4 text-sm leading-relaxed bg-white border border-brand-lightgrey text-brand-black shadow-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Paragraphs
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          // Headings
          h1: ({ children }) => <h1 className="text-lg font-bold font-serif text-brand-black mt-3 mb-1 first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-bold font-serif text-brand-black mt-3 mb-1 first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-bold text-brand-black mt-2 mb-1 first:mt-0">{children}</h3>,
          // Bold / italic
          strong: ({ children }) => <strong className="font-semibold text-brand-black">{children}</strong>,
          em: ({ children }) => <em className="italic text-brand-grey">{children}</em>,
          // Inline code
          code: ({ children }) => (
            <code className="bg-neutral-100 text-brand-red text-xs px-1.5 py-0.5 rounded font-mono">
              {children}
            </code>
          ),
          // Code blocks
          pre: ({ children }) => (
            <pre className="bg-neutral-100 border border-brand-lightgrey text-brand-black text-xs p-3 rounded-lg overflow-x-auto mt-2 mb-2">
              {children}
            </pre>
          ),
          // Lists
          ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-brand-black">{children}</li>,
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red underline hover:text-black transition-colors"
            >
              {children}
            </a>
          ),
          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-brand-red pl-3 italic text-brand-grey mt-2 mb-2">
              {children}
            </blockquote>
          ),
          // Horizontal rule
          hr: () => <hr className="border-brand-lightgrey my-3" />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [assistantStream, setAssistantStream] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleOpen = () => {
    if (!open && messages.length === 0) {
      setMessages([{ role: "assistant", text: WELCOME }]);
    }
    setOpen(true);
    setError(null);
  };

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    setAssistantStream("");

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Try again?");
        setMessages((prev) => prev.slice(0, -1));
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              setError(parsed.error);
              setLoading(false);
              return;
            }
            if (parsed.chunk) {
              streamedText += parsed.chunk;
              setAssistantStream(streamedText);
            }
          } catch {
            // skip malformed lines
          }
        }
      }

      if (streamedText) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          userMsg,
          { role: "assistant", text: streamedText },
        ]);
      }
      setAssistantStream("");
    } catch {
      setError("Connection issue. Check your network and try again.");
      setMessages((prev) => prev.slice(0, -1));
      setAssistantStream("");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating chat bubble trigger */}
      <button
        onClick={handleOpen}
        aria-label="Open chat with Van Anh"
        className={`fixed bottom-6 right-6 z-50 bg-brand-red hover:bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-300 ${prefersReduced ? "" : "hover:scale-105"}`}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel — larger */}
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[95vw] sm:w-[600px] bg-white border border-brand-lightgrey shadow-2xl flex flex-col"
          style={{ height: "75vh", maxHeight: "800px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-lightgrey bg-brand-black shrink-0">
            <div>
              <div className="text-white font-semibold text-sm">Chat with Van Anh</div>
              <div className="text-neutral-400 text-xs">Digital Twin of me</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-6 py-5 bg-neutral-50">

            {/* Welcome message — index 0 only */}
            {messages.length > 0 && (
              <div className="flex justify-start mb-3">
                <AssistantBubble text={messages[0].text} />
              </div>
            )}

            {/* Topic guide cards */}
            {messages.length === 1 && !loading && (
              <div className="mt-2">
                <p className="text-xs text-brand-grey mb-2 font-medium">What can you ask me?</p>
                <div className="grid grid-cols-2 gap-2">
                  {GUIDE_TOPICS.map((topic) => (
                    <button
                      key={topic.label}
                      onClick={() => sendMessage(topic.label)}
                      className="text-left bg-white border border-brand-lightgrey hover:border-brand-red text-brand-black text-xs px-3 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2"
                    >
                      <span>{topic.icon}</span>
                      <span>{topic.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-brand-grey mt-3 text-center">
                  Or just type your own question below ↓
                </p>
              </div>
            )}

            {/* User + assistant messages */}
            {messages.slice(1).map((msg, i) => (
              <div
                key={`msg-${i}`}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}
              >
                {msg.role === "user" ? (
                  <div className="max-w-[80%] rounded-2xl rounded-br-md px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap bg-brand-red text-white shadow-sm">
                    {msg.text}
                  </div>
                ) : (
                  <AssistantBubble text={msg.text} />
                )}
              </div>
            ))}

            {/* Streaming reply — live text */}
            {loading && assistantStream && (
              <div className="flex justify-start mb-3">
                <AssistantBubble text={assistantStream} />
              </div>
            )}

            {/* Loading dots — shown while assistantStream is empty */}
            {loading && !assistantStream && (
              <div className="flex justify-start mb-3">
                <div className="bg-white border border-brand-lightgrey rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className={`flex gap-1 ${prefersReduced ? "" : "animate-bounce-root"}`}>
                    <div
                      className="w-1.5 h-1.5 bg-brand-red rounded-full"
                      style={{ animationDelay: prefersReduced ? undefined : "0ms", animationPlayState: prefersReduced ? "paused" : undefined }}
                    />
                    <div
                      className="w-1.5 h-1.5 bg-brand-red rounded-full"
                      style={{ animationDelay: prefersReduced ? undefined : "150ms", animationPlayState: prefersReduced ? "paused" : undefined }}
                    />
                    <div
                      className="w-1.5 h-1.5 bg-brand-red rounded-full"
                      style={{ animationDelay: prefersReduced ? undefined : "300ms", animationPlayState: prefersReduced ? "paused" : undefined }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex justify-start mb-3">
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
                  {error}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length > 1 && !loading && (
            <div className="px-5 py-3 border-t border-brand-lightgrey bg-white shrink-0">
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs border border-brand-lightgrey text-brand-grey hover:border-brand-red hover:text-brand-red px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-brand-lightgrey bg-white shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask Van Anh anything..."
                rows={1}
                className="flex-1 resize-none border border-brand-lightgrey bg-white text-sm text-brand-black placeholder-brand-grey/60 focus:outline-none focus:border-brand-red px-3 py-2.5"
                style={{ maxHeight: "120px" }}
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="shrink-0 bg-brand-red hover:bg-black disabled:bg-neutral-300 text-white w-10 h-10 flex items-center justify-center transition-colors rounded-lg"
                aria-label="Send"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
