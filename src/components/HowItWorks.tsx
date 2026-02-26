import { motion } from "framer-motion";
import { Scan, Brain, Target, Heart, LayoutList, Zap, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Scan,
    title: "User Input",
    desc: "Describe your content goal",
    color: "from-blue-500 to-cyan-500",
    delay: 0
  },
  {
    icon: Brain,
    title: "Intent Detection",
    desc: "AI analyzes your objective",
    color: "from-violet-500 to-purple-500",
    delay: 0.1
  },
  {
    icon: Target,
    title: "Strategy Layer",
    desc: "Generates optimal approach",
    color: "from-pink-500 to-rose-500",
    delay: 0.2
  },
  {
    icon: Heart,
    title: "Emotional Optimization",
    desc: "Adds persuasive depth",
    color: "from-orange-500 to-red-500",
    delay: 0.3
  },
  {
    icon: LayoutList,
    title: "Content Structuring",
    desc: "Organizes final format",
    color: "from-emerald-500 to-teal-500",
    delay: 0.4
  },
  {
    icon: Zap,
    title: "Final AI Output",
    desc: "Polished, ready-to-use content",
    color: "from-yellow-500 to-amber-500",
    delay: 0.5
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-spacing relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-violet/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-violet/20 bg-accent-violet/5 backdrop-blur-sm mb-6"
          >
            <Zap className="w-3.5 h-3.5 text-accent-violet" />
            <span className="text-xs font-medium text-accent-violet tracking-wide uppercase">
              The Process
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Six intelligent layers working together in perfect harmony to produce
            exceptional, publication-ready content every single time.
          </p>
        </motion.div>

        {/* Flow visualization */}
        <div className="relative max-w-6xl mx-auto">
          {/* Animated connection line */}
          <div className="hidden lg:block absolute top-[4.5rem] left-0 right-0 h-0.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay, duration: 0.5 }}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Step number badge */}
                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary z-10">
                  {i + 1}
                </div>

                {/* Icon container with gradient */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative mb-4"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                    <step.icon className="w-9 h-9 text-white" />
                  </div>

                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>

                {/* Arrow indicator for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden xl:block absolute top-9 -right-4 text-primary/30">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom stats or CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl glass-card">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">6</div>
              <div className="text-xs text-muted-foreground">AI Layers</div>
            </div>
            <div className="w-px h-12 bg-border/30" />
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">&lt;30s</div>
              <div className="text-xs text-muted-foreground">Average Time</div>
            </div>
            <div className="w-px h-12 bg-border/30" />
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">100%</div>
              <div className="text-xs text-muted-foreground">Automated</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
