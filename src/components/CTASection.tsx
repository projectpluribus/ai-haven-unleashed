import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass glow-lg rounded-2xl p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform
              <br />
              <span className="text-gradient">Your Business?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Join hundreds of companies already leveraging our AI agents to scale faster and work smarter.
            </p>
            <Button size="lg" className="text-lg px-10 py-6 glow-md">
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
