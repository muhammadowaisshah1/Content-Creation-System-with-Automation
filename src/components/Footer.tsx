const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Built with <span className="text-foreground font-medium">n8n Automation</span> + <span className="text-foreground font-medium">OpenAI API</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
