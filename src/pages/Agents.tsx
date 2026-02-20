import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, MessageSquare, Brain, Workflow, ArrowRight, Search, Star, Zap, FileText, BarChart3, ShieldCheck, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const allAgents = [
  {
    icon: MessageSquare, name: "ConversaBot", category: "Customer Support", price: "$49/mo",
    description: "24/7 intelligent customer service agent that resolves 85% of queries without human intervention.",
    features: ["Multi-language", "Sentiment Analysis", "Escalation Logic", "CRM Integration"],
    rating: 4.9, users: "2,400+",
  },
  {
    icon: Brain, name: "AnalytiX", category: "Data Analytics", price: "$99/mo",
    description: "Transforms raw data into actionable insights with natural language queries and visual reports.",
    features: ["Real-time Processing", "Custom Dashboards", "Predictions", "Data Connectors"],
    rating: 4.8, users: "1,800+",
  },
  {
    icon: Workflow, name: "FlowMaster", category: "Process Automation", price: "$79/mo",
    description: "Automates complex multi-step business workflows with intelligent decision-making capabilities.",
    features: ["No-code Setup", "API Integrations", "Error Handling", "Audit Trails"],
    rating: 4.7, users: "1,200+",
  },
  {
    icon: Bot, name: "ContentForge", category: "Content Creation", price: "$59/mo",
    description: "Generates SEO-optimized content, social media posts, and marketing copy at scale.",
    features: ["Brand Voice", "SEO Optimized", "Multi-format", "A/B Testing"],
    rating: 4.9, users: "3,100+",
  },
  {
    icon: FileText, name: "DocuMind", category: "Document Processing", price: "$69/mo",
    description: "Extracts, classifies, and processes documents with 99.2% accuracy using advanced OCR and NLP.",
    features: ["OCR", "Classification", "Data Extraction", "Compliance"],
    rating: 4.6, users: "900+",
  },
  {
    icon: BarChart3, name: "SalesPilot", category: "Sales Intelligence", price: "$89/mo",
    description: "Identifies leads, scores prospects, and automates outreach sequences for sales teams.",
    features: ["Lead Scoring", "Email Sequences", "CRM Sync", "Pipeline Forecasting"],
    rating: 4.8, users: "1,500+",
  },
  {
    icon: ShieldCheck, name: "ComplianceAI", category: "Regulatory Compliance", price: "$129/mo",
    description: "Monitors regulatory changes and ensures your business stays compliant across jurisdictions.",
    features: ["Real-time Monitoring", "Risk Alerts", "Audit Reports", "Multi-jurisdiction"],
    rating: 4.7, users: "600+",
  },
  {
    icon: Headphones, name: "VoiceAgent", category: "Voice AI", price: "$99/mo",
    description: "Handles inbound and outbound calls with natural conversation, scheduling, and follow-ups.",
    features: ["Natural Speech", "Call Routing", "Voicemail", "Transcription"],
    rating: 4.5, users: "700+",
  },
];

const categories = ["All", ...Array.from(new Set(allAgents.map(a => a.category)))];

const Agents = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allAgents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 relative">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI Agent <span className="text-gradient">Marketplace</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our catalog of production-ready AI agents. Deploy in minutes.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search agents..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary/50 border-border" />
            </div>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm transition-all ${activeCategory === cat ? "bg-primary text-primary-foreground glow-sm" : "glass text-muted-foreground hover:text-foreground"}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Agent grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((agent, i) => (
              <motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-6 group hover:glow-sm transition-all duration-500 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <agent.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-medium">{agent.rating}</span>
                  </div>
                </div>
                <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">{agent.category}</div>
                <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{agent.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {agent.features.map(f => (
                    <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{f}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-lg font-bold">{agent.price}</span>
                    <span className="text-xs text-muted-foreground ml-1">{agent.users} users</span>
                  </div>
                  <Button size="sm" className="glow-sm">
                    Deploy <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No agents found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
};

export default Agents;
