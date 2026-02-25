import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-12 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <a href="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span>NeuralForge</span>
          </a>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <a href="/about" className="hover:text-foreground transition-colors">About</a>
            <a href="/agents" className="hover:text-foreground transition-colors">Agents</a>
            <a href="/pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 NeuralForge</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
