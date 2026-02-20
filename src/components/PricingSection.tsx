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
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start small, scale fast. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-8 relative ${
                plan.featured
                  ? "glass glow-md border-primary/30"
                  : "glass"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <Button
                className={`w-full mb-8 ${plan.featured ? "glow-sm" : ""}`}
                variant={plan.featured ? "default" : "outline"}
              >
                Get Started
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
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
