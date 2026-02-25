import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <Bot className="w-6 h-6 text-primary" />
          <span>NeuralForge</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="/agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Agents</a>
          <a href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          <Button size="sm" className="glow-sm" asChild><a href="/contact">Get Started</a></Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-border"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <a href="/about" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>About</a>
            <a href="/agents" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Agents</a>
            <a href="/pricing" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Pricing</a>
            <a href="/contact" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Contact</a>
            <Button size="sm" className="w-full" asChild><a href="/contact">Get Started</a></Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
