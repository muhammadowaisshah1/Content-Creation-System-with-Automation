import { motion } from "framer-motion";
import { Layers, Scan, Heart, LayoutList } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Multi-Layer AI Reasoning",
    desc: "Goes beyond single-prompt generation. Multiple AI layers analyze, strategize, and refine your content for maximum impact.",
  },
  {
    icon: Scan,
    title: "Smart Intent Detection",
    desc: "Automatically understands your content goal, target audience, and desired outcome before generating a single word.",
  },
  {
    icon: Heart,
    title: "Emotion-Driven Writing",
    desc: "Applies psychological persuasion principles and emotional positioning to create content that truly resonates.",
  },
  {
    icon: LayoutList,
    title: "Optimized Structured Output",
    desc: "Delivers clean, well-organized content with proper headings, formatting, and flow — ready to publish instantly.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-spacing relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Built for <span className="gradient-text">Performance</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Enterprise-grade AI content generation with intelligent automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card-hover p-6 md:p-8"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
