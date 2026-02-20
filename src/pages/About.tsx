import { motion } from "framer-motion";
import { Bot, Target, Users, Lightbulb, Rocket, Shield, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const team = [
  { name: "Dr. Maya Chen", role: "CEO & Co-founder", bio: "Former AI Research Lead at DeepMind. PhD in Machine Learning from Stanford." },
  { name: "Alex Kowalski", role: "CTO", bio: "Ex-Google engineer. Built scalable AI infrastructure serving 100M+ users." },
  { name: "Sarah Okonkwo", role: "VP of Product", bio: "10+ years building SaaS products. Previously led product at Stripe." },
  { name: "James Park", role: "Head of AI Research", bio: "Published 40+ papers on NLP and multi-agent systems. Ex-OpenAI." },
];

const values = [
  { icon: Target, title: "Mission-Driven", description: "Every agent we build solves a real business problem, not a hypothetical one." },
  { icon: Shield, title: "Trust & Safety", description: "Enterprise-grade security with SOC 2 compliance and end-to-end encryption." },
  { icon: Lightbulb, title: "Innovation First", description: "We invest 40% of revenue back into R&D to stay at the frontier." },
  { icon: Globe, title: "Global Impact", description: "Our agents serve businesses in 30+ countries across 12 industries." },
];

const milestones = [
  { year: "2022", event: "Founded NeuralForge with $2M seed round" },
  { year: "2023", event: "Launched first 10 AI agents, reached 500 customers" },
  { year: "2024", event: "Series A: $18M raised, expanded to 8 industries" },
  { year: "2025", event: "50+ agents deployed, 99.9% uptime, 2,000+ customers" },
  { year: "2026", event: "Expanding enterprise solutions & custom agent builder" },
];

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-sm mb-8">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">About NeuralForge</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
              Building the Future of <span className="text-gradient">AI Agents</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a team of AI researchers, engineers, and product builders on a mission to make intelligent automation accessible to every business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our <span className="text-gradient">Values</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our <span className="text-gradient">Journey</span>
          </motion.h2>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-6 items-start">
                <div className="text-2xl font-bold text-primary min-w-[60px]">{m.year}</div>
                <div className="glass rounded-lg p-4 flex-1">
                  <p className="text-muted-foreground">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-16">
            Meet the <span className="text-gradient">Team</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
};

export default About;
