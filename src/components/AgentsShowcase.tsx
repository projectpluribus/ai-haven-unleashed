import { motion } from "framer-motion";
import { Bot, MessageSquare, Brain, Workflow, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const agents = [
  {
    icon: MessageSquare,
    name: "ConversaBot",
    category: "Customer Support",
    description: "24/7 intelligent customer service agent that resolves 85% of queries without human intervention.",
    features: ["Multi-language", "Sentiment Analysis", "Escalation Logic"],
    popular: true,
  },
  {
    icon: Brain,
    name: "AnalytiX",
    category: "Data Analytics",
    description: "Transforms raw data into actionable insights with natural language queries and visual reports.",
    features: ["Real-time Processing", "Custom Dashboards", "Predictions"],
    popular: false,
  },
  {
    icon: Workflow,
    name: "FlowMaster",
    category: "Process Automation",
    description: "Automates complex multi-step business workflows with intelligent decision-making capabilities.",
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
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">AI Agents</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Production-ready agents you can deploy in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-8 relative group hover:glow-sm transition-all duration-500"
            >
              {agent.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-medium">
                  Popular
                </div>
              )}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5">
                <agent.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                {agent.category}
              </div>
              <h3 className="text-2xl font-bold mb-3">{agent.name}</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">{agent.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.features.map((f) => (
                  <span key={f} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {f}
                  </span>
                ))}
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary p-0 h-auto">
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsShowcase;
