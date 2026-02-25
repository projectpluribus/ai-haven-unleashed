import { motion } from "framer-motion";
import {
  Stethoscope,
  TrendingUp,
  Scale,
  ShoppingCart,
  GraduationCap,
  Building2,
  Megaphone,
  Shield,
} from "lucide-react";

const niches = [
  { icon: Stethoscope, title: "Healthcare", description: "Patient triage, diagnostics, and appointment scheduling agents." },
  { icon: TrendingUp, title: "Finance", description: "Risk assessment, fraud detection, and portfolio analysis." },
  { icon: Scale, title: "Legal", description: "Contract review, compliance monitoring, and legal research." },
  { icon: ShoppingCart, title: "E-Commerce", description: "Product recommendations and pricing optimization." },
  { icon: GraduationCap, title: "Education", description: "Personalized tutoring and curriculum design agents." },
  { icon: Building2, title: "Real Estate", description: "Property valuation, lead scoring, and market analysis." },
  { icon: Megaphone, title: "Marketing", description: "Content creation, SEO, and campaign management." },
  { icon: Shield, title: "Cybersecurity", description: "Threat detection and incident response automation." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ServicesGrid = () => {
  return (
    <section className="py-28 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mb-6">
            <span className="text-sm text-primary font-medium">Industries</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            AI For Every <span className="text-gradient">Niche</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Purpose-built AI agents designed for your specific industry challenges.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {niches.map((niche) => (
            <motion.div
              key={niche.title}
              variants={item}
              className="group rounded-2xl border border-border/60 bg-card/50 p-6 hover:bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <niche.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{niche.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{niche.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
