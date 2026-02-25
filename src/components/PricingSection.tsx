import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for small businesses getting started with AI.",
    features: ["1 AI Agent", "5,000 interactions/mo", "Email support", "Basic analytics", "API access"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    description: "Scale your operations with multiple AI agents.",
    features: ["5 AI Agents", "50,000 interactions/mo", "Priority support", "Advanced analytics", "Custom training", "Integrations"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full-scale AI deployment for large organizations.",
    features: ["Unlimited Agents", "Unlimited interactions", "Dedicated support", "Custom models", "SLA guarantee", "On-premise option"],
    featured: false,
  },
];

const PricingSection = () => {
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
            <span className="text-sm text-primary font-medium">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Simple <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start small, scale fast. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl p-8 relative transition-all duration-300 ${
                plan.featured
                  ? "bg-card border-2 border-primary/30 shadow-xl glow-md scale-[1.02]"
                  : "bg-card/60 border border-border/60 hover:shadow-lg"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className="text-muted-foreground text-lg">{plan.period}</span>
              </div>
              <Button
                className={`w-full mb-8 rounded-full ${plan.featured ? "glow-sm" : ""}`}
                variant={plan.featured ? "default" : "outline"}
              >
                Get Started
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
