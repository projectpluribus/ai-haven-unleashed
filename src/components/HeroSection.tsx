import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageSquare, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-semibold">Your Smart AI Chat Companion</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight mb-8 leading-[1.08]"
        >
          Your AI Assistant for
          <br />
          <span className="text-gradient">Idea Transformation.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Maximize your productivity with advanced AI. Simple chat interface,
          complex problem-solving power. Deploy agents tailored to your business.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="text-base px-8 py-6 rounded-full glow-md" asChild>
            <a href="/contact">
              Get App <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-full" asChild>
            <a href="/agents">Learn More</a>
          </Button>
        </motion.div>

        {/* Floating cards */}
        <div className="relative mt-20 max-w-4xl mx-auto h-[300px] md:h-[380px]">
          {/* Center chat card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[280px] md:w-[320px] float-card p-6 z-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">NeuralForge AI</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-muted/80 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-foreground">
                Hello! How can I assist you today? 👋
              </div>
              <div className="bg-primary/10 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-foreground ml-auto max-w-[200px]">
                Help me analyze my data
              </div>
            </div>
          </motion.div>

          {/* Left floating card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute left-0 md:left-4 top-16 float-card p-4 animate-float hidden md:flex items-center gap-3 z-10"
          >
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold">Lightning Fast</div>
              <div className="text-xs text-muted-foreground">0.3s response time</div>
            </div>
          </motion.div>

          {/* Right floating card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute right-0 md:right-4 top-24 float-card p-4 animate-float-delayed hidden md:flex items-center gap-3 z-10"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Smart Learning</div>
              <div className="text-xs text-muted-foreground">Adapts to your needs</div>
            </div>
          </motion.div>

          {/* Bottom stat pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6 glass-pill rounded-full px-8 py-4 z-30"
          >
            {[
              { value: "50+", label: "AI Agents" },
              { value: "12", label: "Industries" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
