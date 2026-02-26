import { motion } from "framer-motion";
import { Scan, Brain, Target, Heart, LayoutList, Zap } from "lucide-react";

const steps = [
  { icon: Scan, title: "User Input", desc: "Describe your content goal" },
  { icon: Brain, title: "Intent Detection", desc: "AI analyzes your objective" },
  { icon: Target, title: "Strategy Layer", desc: "Generates optimal approach" },
  { icon: Heart, title: "Emotional Optimization", desc: "Adds persuasive depth" },
  { icon: LayoutList, title: "Content Structuring", desc: "Organizes final format" },
  { icon: Zap, title: "Final AI Output", desc: "Polished, ready-to-use content" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-spacing relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Six intelligent layers working together to produce exceptional content.
          </p>
        </motion.div>

        {/* Flow */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="glass-card-hover p-5 mb-4 flex items-center justify-center w-16 h-16">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
