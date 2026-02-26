import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

const WEBHOOK_URL = "https://n8n.srv1324748.hstgr.cloud/webhook-test/4a5295e0-b881-4696-8b06-00c97eb12c7a";

const platforms = ["YouTube", "Blog", "LinkedIn", "Sales Page"];
const tones = ["Professional", "Persuasive", "Educational", "Viral"];

const LiveDemo = () => {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("Blog");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

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

      // Try to extract content from OpenAI-style JSON response
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
        // Not JSON, use raw text as-is
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
                {/* Platform */}
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

                {/* Tone */}
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">Generated Output</h3>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="glass-card p-6 max-h-[500px] overflow-y-auto">
                    <div className="prose prose-invert prose-sm max-w-none text-foreground/90 leading-relaxed text-sm [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:text-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-foreground [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-foreground [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1 [&_strong]:text-foreground [&_blockquote]:border-l-2 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground">
                      <ReactMarkdown>{result}</ReactMarkdown>
                    </div>
                  </div>
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
