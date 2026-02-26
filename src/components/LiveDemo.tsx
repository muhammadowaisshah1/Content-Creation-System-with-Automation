import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Copy, Check, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { contentGenerationSchema } from "@/lib/validation";
import { ValidationError, logError, getUserFriendlyMessage } from "@/lib/errors";
import { useToast } from "@/hooks/use-toast";
import { contentApi } from "@/api/content";
import { RATE_LIMIT } from "@/constants/config";

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
  const [validationError, setValidationError] = useState("");
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { displayed, done } = useTypewriter(result, 10);

  useEffect(() => {
    if (resultRef.current && !done) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [displayed, done]);

  const handleGenerate = async () => {
    setValidationError("");
    setResult("");

    // Rate limiting check
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < RATE_LIMIT.MIN_REQUEST_INTERVAL && lastRequestTime > 0) {
      const waitTime = Math.ceil((RATE_LIMIT.MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000);
      toast({
        title: "Please wait",
        description: `You can make another request in ${waitTime} seconds`,
        variant: "destructive",
      });
      return;
    }

    // Validate input
    try {
      contentGenerationSchema.parse({ prompt, platform, tone });
    } catch (error) {
      if (error instanceof Error) {
        const validationError = new ValidationError(error.message);
        setValidationError(error.message);
        logError(validationError, { prompt, platform, tone });
      }
      return;
    }

    setLoading(true);
    setLastRequestTime(now);

    try {
      const content = await contentApi.generateContent({
        prompt: prompt.trim(),
        platform,
        tone,
      });

      setResult(content);
    } catch (error) {
      logError(error as Error, { prompt, platform, tone });
      const message = getUserFriendlyMessage(error);

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });

      setResult(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
    } catch (error) {
      logError(error as Error);
      toast({
        title: "Failed to copy",
        description: "Please try selecting and copying manually",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="demo" className="section-spacing relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-violet/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-xs font-medium text-accent-cyan tracking-wide uppercase">
              Try It Now
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Live <span className="gradient-text">Demo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Experience the power of multi-layer AI workflow. Generate optimized content
            in seconds with our intelligent automation engine.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-6 md:p-10 relative">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-accent-violet/10 to-transparent rounded-br-xl" />

            {/* Input area */}
            <div className="space-y-6 relative">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</span>
                  Describe your content goal
                </label>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      setValidationError("");
                    }}
                    placeholder="e.g., Write a compelling blog post about AI automation for small businesses..."
                    rows={4}
                    className={`w-full bg-secondary/50 border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none text-sm ${
                      validationError ? "border-red-500 focus:ring-red-500/50" : "border-border/50"
                    }`}
                  />
                  {/* Character count badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-border/30">
                    <span className={`text-xs font-medium ${prompt.length > 450 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                      {prompt.length}/500
                    </span>
                  </div>
                </div>
                {validationError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <span className="w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center text-xs">!</span>
                    {validationError}
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</span>
                    Platform
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((p) => (
                      <motion.button
                        key={p}
                        onClick={() => setPlatform(p)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                          platform === p
                            ? "bg-primary/20 text-primary border-2 border-primary/40 shadow-lg shadow-primary/10"
                            : "bg-secondary/50 text-muted-foreground border border-border/30 hover:border-primary/20 hover:bg-secondary/70"
                        }`}
                      >
                        {p}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-accent-violet/10 flex items-center justify-center text-xs font-bold text-accent-violet">3</span>
                    Tone
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((t) => (
                      <motion.button
                        key={t}
                        onClick={() => setTone(t)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                          tone === t
                            ? "bg-accent-violet/20 text-accent-violet border-2 border-accent-violet/40 shadow-lg shadow-accent-violet/10"
                            : "bg-secondary/50 text-muted-foreground border border-border/30 hover:border-accent-violet/20 hover:bg-secondary/70"
                        }`}
                      >
                        {t}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="btn-primary-glow w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base py-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating with AI...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Generate Content</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Loading state */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8"
                >
                  <div className="glass-card p-8 text-center relative overflow-hidden">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent-violet/5 to-accent-cyan/5 animate-gradient" />

                    <div className="relative">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="glow-dot animate-pulse-glow" />
                        <div className="glow-dot animate-pulse-glow" style={{ animationDelay: "0.3s" }} />
                        <div className="glow-dot animate-pulse-glow" style={{ animationDelay: "0.6s" }} />
                      </div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        AI is processing your request
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Analyzing intent → Building strategy → Optimizing content
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence>
              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-8"
                >
                  {/* Header bar */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">AI Generated Output</h3>
                        {!done && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Streaming...
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.button
                      onClick={handleCopy}
                      disabled={!done}
                      whileHover={{ scale: done ? 1.05 : 1 }}
                      whileTap={{ scale: done ? 0.95 : 1 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground bg-secondary/50 border border-border/30 hover:border-primary/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-accent-cyan" />
                          <span className="text-accent-cyan">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Output card */}
                  <div className="relative rounded-xl overflow-hidden group">
                    {/* Top gradient bar */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-primary via-accent-violet to-accent-cyan" />

                    <div
                      ref={resultRef}
                      className="bg-card/80 backdrop-blur-xl border border-border/30 rounded-b-xl p-6 md:p-8 max-h-[600px] overflow-y-auto scrollbar-thin"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "hsl(var(--primary)) transparent",
                      }}
                    >
                      <div className="prose prose-invert prose-sm max-w-none leading-relaxed text-sm
                        [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-2 [&_h1]:text-foreground [&_h1]:leading-tight
                        [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-foreground [&_h2]:border-b [&_h2]:border-border/20 [&_h2]:pb-2
                        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-foreground
                        [&_p]:mb-4 [&_p]:text-foreground/90 [&_p]:leading-7
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
                        [&_li]:text-foreground/90 [&_li]:leading-7
                        [&_strong]:text-foreground [&_strong]:font-semibold
                        [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:bg-primary/5 [&_blockquote]:rounded-r-lg
                        [&_code]:bg-secondary/80 [&_code]:px-2 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-primary [&_code]:text-xs [&_code]:font-mono
                        [&_hr]:border-border/30 [&_hr]:my-6
                        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary/80 [&_a]:transition-colors
                      ">
                        <ReactMarkdown>{displayed}</ReactMarkdown>
                      </div>

                      {/* Typing cursor */}
                      {!done && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-text-bottom"
                        />
                      )}
                    </div>
                  </div>

                  {/* Footer info */}
                  {done && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between mt-4 px-1"
                    >
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                        <span>Powered by multi-layer AI workflow</span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                        <span>{result.split(' ').length} words</span>
                        <span>•</span>
                        <span>{result.length.toLocaleString()} characters</span>
                      </div>
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
