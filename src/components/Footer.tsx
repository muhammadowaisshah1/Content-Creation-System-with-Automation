import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Heart, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it Works", href: "#how-it-works" },
        { label: "Live Demo", href: "#demo" },
        { label: "Pricing", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-border/30 bg-background/50 backdrop-blur-xl">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="container relative mx-auto px-6">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Intelligent Content Flow</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
                Advanced AI-powered content automation engine. Transform your ideas into
                optimized, ready-to-publish content with multi-layer AI reasoning.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-secondary/50 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-muted-foreground flex flex-wrap items-center justify-center md:justify-start gap-2"
            >
              © {currentYear} Intelligent Content Flow. Developed by
              <span className="text-foreground font-semibold">Muhammad Owais Shah</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                Built with
                <Heart className="w-3.5 h-3.5 text-red-500 inline animate-pulse" />
                using
                <span className="text-foreground font-medium">n8n</span>
                +
                <span className="text-foreground font-medium">Claude AI</span>
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 text-xs text-muted-foreground"
            >
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
