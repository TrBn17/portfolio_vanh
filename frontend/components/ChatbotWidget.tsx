"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = { id: string; role: "user" | "assistant"; text: string; time: string };

const TOPICS = [
  { label: "My background & story", prompt: "Tell me about your background and story" },
  { label: "Experience & roles", prompt: "What experience do you have?" },
  { label: "Campaigns you've led", prompt: "Tell me about your campaigns" },
  { label: "Skills & strengths", prompt: "What are your key skills?" },
  { label: "Education & awards", prompt: "Tell me about your education and awards" },
  { label: "Availability & contact", prompt: "When are you available and how can I reach you?" },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function AssistantBubble({ text }: { text: string }) {
  return (
    <div className="max-w-[82%] rounded-2xl rounded-bl-md border border-brand-lightgrey/60 bg-white px-4 py-3 text-sm leading-[1.65] text-brand-black shadow-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          h1: ({ children }) => <h1 className="mt-2 mb-1 text-base font-serif font-bold text-brand-black">{children}</h1>,
          h2: ({ children }) => <h2 className="mt-2 mb-1 text-sm font-serif font-bold text-brand-black">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-2 mb-1 text-sm font-bold text-brand-black">{children}</h3>,
          strong: ({ children }) => <strong className="font-semibold text-brand-black">{children}</strong>,
          em: ({ children }) => <em className="italic text-brand-grey">{children}</em>,
          code: ({ children }) => <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-brand-red">{children}</code>,
          pre: ({ children }) => <pre className="mt-2 mb-2 overflow-x-auto rounded-lg border border-brand-lightgrey bg-neutral-100 p-3 text-xs text-brand-black">{children}</pre>,
          ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-5">{children}</ol>,
          li: ({ children }) => <li className="text-brand-black">{children}</li>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-red underline transition-colors hover:text-black">
              {children}
            </a>
          ),
          blockquote: ({ children }) => <blockquote className="mt-2 mb-2 border-l-2 border-brand-red pl-3 italic text-brand-grey">{children}</blockquote>,
          hr: () => <hr className="my-3 border-brand-lightgrey" />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-brand-grey/50"
          style={{ animation: `chat-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

let msgId = 0;
const newId = () => `msg-${++msgId}`;

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingText, setStreamingText] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText, error]);

  useEffect(() => {
    if (open) textareaRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 88)}px`;
  }, [input]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = { id: newId(), role: "user", text: trimmed, time: getTime() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setError(null);
      setStreamingText("");
      setLoading(true);
      setMessages((prev) => [...prev, { id: "streaming", role: "assistant", text: "", time: getTime() }]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          const msg = data.detail ? `${data.error}\n${data.detail}` : data.error || "Something went wrong. Please try again.";
          setError(msg);
          setMessages((prev) => prev.filter((m) => m.id !== "streaming"));
          setLoading(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) throw new Error(parsed.detail || parsed.error);
              if (parsed.chunk) {
                fullText += parsed.chunk;
                setStreamingText(fullText);
                setMessages((prev) => prev.map((m) => (m.id === "streaming" ? { ...m, text: fullText } : m)));
              }
            } catch {
              continue;
            }
          }
        }

        if (!fullText.trim()) throw new Error("The AI returned an empty response.");

        setMessages((prev) => prev.map((m) => (m.id === "streaming" ? { ...m, text: fullText } : m)));
        setStreamingText("");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Connection issue. Please try again.";
        setError(msg);
        setMessages((prev) => prev.filter((m) => m.id !== "streaming"));
      } finally {
        setLoading(false);
        textareaRef.current?.focus();
      }
    },
    [loading]
  );

  const handleOpen = () => {
    if (!open) {
      if (!sessionStarted) {
        const welcome: Message = {
          id: newId(),
          role: "assistant",
          text: "Hi there! I'm Van Anh.\n\nAsk me about my background, experience, campaigns, skills, or availability.",
          time: getTime(),
        };
        setMessages([welcome]);
        setSessionStarted(true);
      }
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_8px_32px_rgba(200,16,46,0.4)] transition-all duration-300 hover:scale-105 hover:bg-brand-black active:scale-95 group"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-brand-lightgrey bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:w-[440px] transition-all duration-300"
          style={{ height: expanded ? "min(90vh, 900px)" : "min(68vh, 720px)" }}
        >
          <div className="flex shrink-0 items-center justify-between bg-brand-black px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red shadow-[0_0_0_2px_rgba(200,16,46,0.3)]">
                <span className="text-base font-serif font-bold text-white">VA</span>
                <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-brand-black bg-green-400" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight text-white">Van Anh</div>
                <div className="text-xs text-neutral-400">Digital Marketing Leader · Usually replies instantly</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/pham-thi-van-anh-072265232/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-neutral-400 transition-colors hover:text-white"
                aria-label="View LinkedIn"
              >
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <button onClick={handleClose} className="p-1 text-neutral-400 transition-colors hover:text-white" aria-label="Close chat">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="p-1 text-neutral-400 transition-colors hover:text-white"
                aria-label={expanded ? "Collapse chat" : "Expand chat"}
              >
                {expanded ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15h4.5M9 15v4.5M9 15L3.75 20.25M15 9h4.5M15 9V4.5M15 9L20.25 3.75M15 15h4.5M15 15v4.5M15 15l4.5 4.5" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0H4M4 4l5 5m11-1V4m0 0v4m0-4h-4m4 0l5 5m-11-5h4m-4 0v4m0-4l-5 5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white px-5 py-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[82%] flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  {msg.role === "user" ? (
                    <div className="rounded-2xl rounded-br-md bg-brand-red px-4 py-2.5 text-sm leading-[1.6] text-white">
                      {msg.text}
                    </div>
                  ) : (
                    <AssistantBubble text={msg.text} />
                  )}
                  <span className="mt-0.5 px-1 text-[10px] text-brand-grey/50 opacity-0 transition-opacity group-hover:opacity-100">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && streamingText === "" && messages[messages.length - 1]?.id === "streaming" && (
              <div className="mb-3 flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-brand-lightgrey/60 bg-white px-4 py-2.5 shadow-sm">
                  <TypingIndicator />
                </div>
              </div>
            )}

            {error && (
              <div className="mb-3 flex justify-start">
                <div className="max-w-[92%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  <span className="font-semibold">Error: </span>
                  {error}
                  <button onClick={() => setError(null)} className="ml-2 text-red-500 underline hover:text-red-700">
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick topics — only when session is fresh */}
          {!loading && messages.length <= 2 && (
            <div className="shrink-0 border-t border-brand-lightgrey/50 bg-white px-4 py-2">
              <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-grey/60">Quick</div>
              <div className="flex flex-wrap gap-1.5">
                {TOPICS.map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => sendMessage(topic.prompt)}
                    className="rounded-full border border-brand-lightgrey/60 bg-neutral-50 px-3 py-1 text-left text-xs text-brand-grey transition-colors hover:border-brand-red hover:text-brand-red"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="shrink-0 border-t border-brand-lightgrey/50 bg-white px-4 py-3">
            <div className="flex items-end gap-2 rounded-2xl border border-brand-lightgrey bg-neutral-50 px-3 py-2 transition-colors focus-within:border-brand-red">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                rows={1}
                className="flex-1 resize-none bg-transparent py-0.5 text-sm leading-5 text-brand-black placeholder-brand-grey/50 focus:outline-none"
                style={{ maxHeight: "88px" }}
                disabled={loading}
                maxLength={1000}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white transition-colors hover:bg-brand-black disabled:bg-neutral-300"
                aria-label="Send message"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chat-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
