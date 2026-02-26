import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Copy, Check, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

const WEBHOOK_URL = "https://n8n.srv1324748.hstgr.cloud/webhook-test/4a5295e0-b881-4696-8b06-00c97eb12c7a";

const platforms = ["YouTube", "Blog", "LinkedIn", "Sales Page"];
const tones = ["Professional", "Persuasive", "Educational", "Viral"];

const useTypewriter = (text: string, speed = 12) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      setDone(false);
      indexRef.current = 0;
      return;
    }

    setDisplayed("");
    setDone(false);
    indexRef.current = 0;

    const interval = setInterval(() => {
      indexRef.current += 1;
      // Add characters in chunks for faster feel
      const chunk = Math.min(indexRef.current * 3, text.length);
      setDisplayed(text.slice(0, chunk));
      if (chunk >= text.length) {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
};

const LiveDemo = () => {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("Blog");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { displayed, done } = useTypewriter(result, 10);

  useEffect(() => {
    if (resultRef.current && !done) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [displayed, done]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), platform, tone }),
      });
      const raw = await response.text();

      let parsed = raw;
      try {
        const json = JSON.parse(raw);
        if (json?.message?.content) {
          parsed = json.message.content;
        } else if (json?.content) {
          parsed = json.content;
        } else if (json?.output) {
          parsed = json.output;
        } else if (typeof json === "string") {
          parsed = json;
        }
      } catch {
        // Not JSON, use raw text
      }
      setResult(parsed);
    } catch {
      setResult("Unable to connect to the AI workflow. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="section-spacing relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Live <span className="gradient-text">Demo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Try the multi-layer AI workflow right now.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-6 md:p-8">
            {/* Input area */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Describe your content goal
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Write a compelling blog post about AI automation for small businesses..."
                  rows={4}
                  className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Platform</label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          platform === p
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-secondary/50 text-muted-foreground border border-border/30 hover:border-border"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tone</label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          tone === t
                            ? "bg-accent-violet/20 text-accent border border-accent/30"
                            : "bg-secondary/50 text-muted-foreground border border-border/30 hover:border-border"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="btn-primary-glow w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Generate Content
                  </>
                )}
              </button>
            </div>

            {/* Loading state */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div className="glass-card p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="glow-dot animate-pulse-glow" />
                      <div className="glow-dot animate-pulse-glow" style={{ animationDelay: "0.3s" }} />
                      <div className="glow-dot animate-pulse-glow" style={{ animationDelay: "0.6s" }} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI is analyzing intent and building strategy…
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence>
              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-6"
                >
                  {/* Header bar */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground">AI Generated Output</h3>
                      {!done && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-medium text-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          Streaming
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleCopy}
                      disabled={!done}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Output card */}
                  <div className="relative rounded-xl overflow-hidden">
                    {/* Top gradient bar */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-primary via-accent to-accent-cyan" />

                    <div
                      ref={resultRef}
                      className="bg-card/80 backdrop-blur-xl border border-border/30 rounded-b-xl p-6 md:p-8 max-h-[550px] overflow-y-auto scrollbar-thin"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "hsl(var(--border)) transparent",
                      }}
                    >
                      <div className="prose prose-invert prose-sm max-w-none leading-relaxed text-sm
                        [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-2 [&_h1]:text-foreground [&_h1]:leading-tight
                        [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-foreground [&_h2]:border-b [&_h2]:border-border/20 [&_h2]:pb-2
                        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-foreground
                        [&_p]:mb-4 [&_p]:text-foreground/80 [&_p]:leading-7
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
                        [&_li]:text-foreground/80 [&_li]:leading-7
                        [&_strong]:text-foreground [&_strong]:font-semibold
                        [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:bg-primary/5 [&_blockquote]:rounded-r-lg
                        [&_code]:bg-secondary/80 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-primary [&_code]:text-xs [&_code]:font-mono
                        [&_hr]:border-border/30 [&_hr]:my-6
                        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary/80
                      ">
                        <ReactMarkdown>{displayed}</ReactMarkdown>
                      </div>

                      {/* Typing cursor */}
                      {!done && (
                        <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-0.5 align-text-bottom" />
                      )}
                    </div>
                  </div>

                  {/* Footer info */}
                  {done && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between mt-3 px-1"
                    >
                      <p className="text-[11px] text-muted-foreground">
                        Powered by multi-layer AI workflow
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {result.length.toLocaleString()} characters
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveDemo;
