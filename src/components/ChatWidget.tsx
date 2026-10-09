import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ali-chat-session";
const GREETING: UIMessage = {
  id: "greeting",
  role: "assistant",
  parts: [{ type: "text", text: "Hi! I'm Ali Property Assistant 🏠\nLooking for a property, or just exploring? I can help with listings, areas, budgets, and site visits." }],
};

export function ChatWidget({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [input, setInput] = useState("");
  const [nudge, setNudge] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const interacted = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, setMessages, status, error } = useChat({
    id: "ali-assistant",
    messages: [GREETING],
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // Restore session conversation (fresh per browser session).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch { /* ignore */ }
    setLoaded(true);
  }, [setMessages]);

  useEffect(() => {
    if (loaded && status === "ready") sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [loaded, messages, status]);

  // Auto-open after 30s with no interaction.
  useEffect(() => {
    const mark = () => { interacted.current = true; };
    window.addEventListener("click", mark, { once: true });
    window.addEventListener("keydown", mark, { once: true });
    const t = setTimeout(() => {
      if (!interacted.current && !sessionStorage.getItem(STORAGE_KEY + "-nudged")) {
        sessionStorage.setItem(STORAGE_KEY + "-nudged", "1");
        setNudge(true);
        onOpenChange(true);
      }
    }, 30000);
    return () => { clearTimeout(t); window.removeEventListener("click", mark); window.removeEventListener("keydown", mark); };
  }, [onOpenChange]);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [messages, status]);
  useEffect(() => { if (open && status === "ready") inputRef.current?.focus(); }, [open, status]);

  const busy = status === "submitted" || status === "streaming";
  const send = (text: string) => {
    const clean = text.trim().slice(0, 500);
    if (!clean || busy) return;
    setNudge(false);
    sendMessage({ text: clean });
    setInput("");
  };
  const submit = (e: FormEvent) => { e.preventDefault(); send(input); };

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-label={open ? "Close property assistant" : "Open property assistant"}
        className="fixed bottom-5 right-5 z-40 grid size-[60px] place-items-center rounded-full bg-primary text-primary-foreground shadow-xl ring-2 ring-gold/60"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-background sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[550px] sm:w-[380px] sm:rounded-md sm:border sm:border-border sm:shadow-2xl">
          <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-gold font-display text-sm font-bold text-gold-foreground">AP</span>
              <div><div className="font-display font-semibold">Ali Property Assistant</div><div className="text-xs text-primary-foreground/60">Usually replies instantly</div></div>
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground" onClick={() => onOpenChange(false)} aria-label="Close assistant"><X size={20} /></Button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-muted p-4" aria-live="polite">
            {nudge && <div className="mx-auto w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-foreground">Hi! Looking for a property? 👋</div>}
            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              if (!text) return null;
              return m.role === "user" ? (
                <div key={m.id} className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-md bg-primary px-3 py-2 text-sm leading-6 text-primary-foreground">{text}</div>
              ) : (
                <div key={m.id} className="max-w-[88%] rounded-md bg-secondary px-3 py-2 text-sm leading-6 text-secondary-foreground [&_a]:font-semibold [&_a]:underline [&_p+p]:mt-2 whitespace-pre-line">
                  <ReactMarkdown components={{ a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" /> }}>{text}</ReactMarkdown>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex w-fit gap-1 rounded-md bg-secondary px-3 py-3" aria-label="Assistant is typing">
                {[0, 150, 300].map((d) => <span key={d} className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            )}
            {error && <div className="rounded-md border border-destructive/40 bg-background px-3 py-2 text-sm text-destructive">{error.message || "Something went wrong. Please try again."}</div>}
            <div ref={endRef} />
          </div>
          {messages.length <= 1 && (
            <div className="flex gap-2 border-t border-border p-3">
              <Button variant="outline" className="flex-1 px-3" onClick={() => send("Show me your listings")}>Listings</Button>
              <Button variant="outline" className="flex-1 px-3" onClick={() => send("I want to book a site visit")}>Site visit</Button>
            </div>
          )}
          <form onSubmit={submit} className="flex gap-2 border-t border-border p-3">
            <label className="sr-only" htmlFor="chat-message">Your message</label>
            <input ref={inputRef} id="chat-message" value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} placeholder="Type your message…" className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring" />
            <Button size="icon" aria-label="Send message" disabled={busy || !input.trim()}><Send size={18} /></Button>
          </form>
        </div>
      )}
    </>
  );
}
