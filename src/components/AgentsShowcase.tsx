import { motion } from "framer-motion";
import { Bot, MessageSquare, Brain, Workflow, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const agents = [
  {
    icon: MessageSquare,
    name: "ConversaBot",
    category: "Customer Support",
    description: "24/7 intelligent customer service agent that resolves 85% of queries automatically.",
    features: ["Multi-language", "Sentiment Analysis", "Escalation Logic"],
    popular: true,
  },
  {
    icon: Brain,
    name: "AnalytiX",
    category: "Data Analytics",
    description: "Transforms raw data into actionable insights with natural language queries.",
    features: ["Real-time Processing", "Custom Dashboards", "Predictions"],
    popular: false,
  },
  {
    icon: Workflow,
    name: "FlowMaster",
    category: "Process Automation",
    description: "Automates complex multi-step workflows with intelligent decision-making.",
    features: ["No-code Setup", "API Integrations", "Error Handling"],
    popular: false,
  },
  {
    icon: Bot,
    name: "ContentForge",
    category: "Content Creation",
    description: "Generates SEO-optimized content, social media posts, and marketing copy at scale.",
    features: ["Brand Voice", "SEO Optimized", "Multi-format"],
    popular: true,
  },
];

const AgentsShowcase = () => {
  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mb-6">
            <span className="text-sm text-primary font-medium">Featured</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Meet Our <span className="text-gradient">AI Agents</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Production-ready agents you can deploy in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-8 relative group hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              {agent.popular && (
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  Popular
                </div>
              )}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent flex items-center justify-center mb-5">
                <agent.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                {agent.category}
              </div>
              <h3 className="text-2xl font-bold mb-3">{agent.name}</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">{agent.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.features.map((f) => (
                  <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground font-medium">
                    {f}
                  </span>
                ))}
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary p-0 h-auto font-semibold">
                Learn More <ArrowUpRight className="ml-1 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsShowcase;
