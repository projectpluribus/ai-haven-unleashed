import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Agents", href: "/agents" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      <div className="glass-pill rounded-full px-3 py-2 flex items-center gap-2 max-w-4xl w-full">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 pl-3 pr-4 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">NeuralForge</span>
        </a>

        {/* Desktop pill nav */}
        <div className="hidden md:flex items-center gap-1 bg-muted/60 rounded-full px-1 py-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" className="rounded-full text-sm" asChild>
            <a href="/contact">Log In</a>
          </Button>
          <Button size="sm" className="rounded-full text-sm px-5 glow-sm" asChild>
            <a href="/contact">Try for Free ↗</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden ml-auto pr-2 text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-full mt-2 left-4 right-4 glass-pill rounded-2xl p-4"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-border mt-2 pt-3 flex gap-2">
              <Button variant="ghost" size="sm" className="rounded-full flex-1" asChild>
                <a href="/contact">Log In</a>
              </Button>
              <Button size="sm" className="rounded-full flex-1" asChild>
                <a href="/contact">Try Free ↗</a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
