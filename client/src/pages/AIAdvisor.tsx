import { useState, useCallback, useRef, useEffect } from "react";
import { MessageSquare, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "I need $100K for my business with a 720 credit score",
  "Compare SBA loans vs credit card stacking for a startup",
  "What funding options exist for a business under 1 year old?",
  "I have $50K/month revenue and need working capital fast",
];

export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text || input).trim();
    if (!content || streaming) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput("");
    setStreaming(true);

    try {
      const allMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              accumulated += parsed.content;
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantMsg.id ? { ...m, content: accumulated } : m
                )
              );
            }
            if (parsed.error) throw new Error(parsed.error);
          } catch (e: any) {
            if (e.message && !e.message.includes("JSON")) throw e;
          }
        }
      }
    } catch (err: any) {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantMsg.id
            ? { ...m, content: `Error: ${err.message || "Failed to get response. Please try again."}` }
            : m
        )
      );
    } finally {
      setStreaming(false);
    }
  }, [input, messages, streaming]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Bot className="text-emerald-400" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Funding Advisor</h1>
              <p className="text-sm text-gray-400">Get personalized funding recommendations powered by AI</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-[#111118] border border-[#1a1a2e] rounded-xl overflow-hidden flex flex-col" style={{ minHeight: "500px" }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "60vh" }}>
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Sparkles className="text-emerald-400 mb-4" size={40} />
                <h2 className="text-lg font-semibold text-white mb-2">Ask about business funding</h2>
                <p className="text-gray-400 text-sm mb-6 max-w-md">
                  Describe your business situation and funding needs. The AI advisor will recommend the best options with specific rates, amounts, and timelines.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(prompt)}
                      className="text-left text-xs text-gray-300 bg-[#1a1a2e] hover:bg-[#252540] border border-[#2a2a3e] rounded-lg px-3 py-2.5 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={14} className="text-emerald-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-[#1a1a2e] text-gray-200"
                  }`}
                >
                  {msg.role === "assistant" && !msg.content && streaming ? (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Loader2 size={14} className="animate-spin" />
                      <span>Analyzing your funding options...</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.content.split("\n").map((line, i) => {
                        if (line.startsWith("## ") || line.startsWith("### ")) {
                          return <div key={i} className="font-semibold text-emerald-400 mt-3 mb-1">{line.replace(/^#+\s*/, "")}</div>;
                        }
                        if (line.startsWith("**") && line.endsWith("**")) {
                          return <div key={i} className="font-semibold text-emerald-400 mt-3 mb-1">{line.replace(/\*\*/g, "")}</div>;
                        }
                        if (line.startsWith("- ") || line.startsWith("* ")) {
                          return <div key={i} className="ml-3 mb-0.5">{line}</div>;
                        }
                        if (line.trim()) {
                          return <div key={i} className="mb-1">{line}</div>;
                        }
                        return <div key={i} className="h-2" />;
                      })}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <User size={14} className="text-blue-400" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#1a1a2e] p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Describe your business and funding needs..."
                disabled={streaming}
                className="flex-1 bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={streaming || !input.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {streaming ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
