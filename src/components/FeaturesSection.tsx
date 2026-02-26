import { motion } from "framer-motion";
import { Layers, Scan, Heart, LayoutList, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Multi-Layer AI Reasoning",
    desc: "Goes beyond single-prompt generation. Multiple AI layers analyze, strategize, and refine your content for maximum impact.",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    icon: Scan,
    title: "Smart Intent Detection",
    desc: "Automatically understands your content goal, target audience, and desired outcome before generating a single word.",
    gradient: "from-violet-500 to-purple-500",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
  {
    icon: Heart,
    title: "Emotion-Driven Writing",
    desc: "Applies psychological persuasion principles and emotional positioning to create content that truly resonates.",
    gradient: "from-pink-500 to-rose-500",
    glowColor: "rgba(236, 72, 153, 0.15)",
  },
  {
    icon: LayoutList,
    title: "Optimized Structured Output",
    desc: "Delivers clean, well-organized content with proper headings, formatting, and flow — ready to publish instantly.",
    gradient: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-spacing relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-violet/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">
              Powerful Features
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Built for <span className="gradient-text">Performance</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade AI content generation with intelligent automation.
            Every feature designed to maximize your content quality and efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ background: f.glowColor }}
              />

              <div className="relative glass-card p-8 h-full">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <f.icon className="w-7 h-7 text-white" />
                  </div>
                  {/* Decorative dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {f.desc}
                </p>

                {/* Learn more link */}
                <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary/50 border border-border/30 text-foreground hover:border-primary/30 hover:bg-secondary/70 transition-all duration-300 group"
          >
            <span className="font-medium">See all features in action</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
