import { Bot } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <a href="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <Bot className="w-5 h-5 text-primary" />
            <span>NeuralForge</span>
          </a>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 NeuralForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
