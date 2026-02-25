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
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Patient triage, medical records analysis, appointment scheduling, and diagnostic support agents.",
  },
  {
    icon: TrendingUp,
    title: "Finance",
    description: "Risk assessment, fraud detection, portfolio analysis, and automated trading assistants.",
  },
  {
    icon: Scale,
    title: "Legal",
    description: "Contract review, legal research, compliance monitoring, and document drafting agents.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Product recommendations, inventory management, customer support, and pricing optimization.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Personalized tutoring, curriculum design, student assessment, and content generation.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Property valuation, lead qualification, market analysis, and virtual tour generation.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description: "Content creation, SEO optimization, campaign management, and audience analytics agents.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Threat detection, vulnerability scanning, incident response, and security monitoring.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesGrid = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {niches.map((niche) => (
            <motion.div
              key={niche.title}
              variants={item}
              className="group glass rounded-xl p-6 hover:glow-sm transition-all duration-500 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <niche.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{niche.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{niche.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
