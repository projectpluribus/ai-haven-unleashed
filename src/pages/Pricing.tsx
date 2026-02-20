import { motion } from "framer-motion";
import { Check, HelpCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter", price: "$49", period: "/month",
    description: "Perfect for small businesses getting started with AI.",
    features: ["1 AI Agent", "5,000 interactions/mo", "Email support", "Basic analytics", "API access", "Community forum"],
    featured: false,
  },
  {
    name: "Growth", price: "$149", period: "/month",
    description: "Scale your operations with multiple AI agents.",
    features: ["5 AI Agents", "50,000 interactions/mo", "Priority support", "Advanced analytics", "Custom training", "Integrations", "Team collaboration"],
    featured: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "",
    description: "Full-scale AI deployment for large organizations.",
    features: ["Unlimited Agents", "Unlimited interactions", "Dedicated support", "Custom models", "SLA guarantee", "On-premise option", "SSO & SAML", "Dedicated CSM"],
    featured: false,
  },
];

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately and we'll prorate your billing." },
  { q: "What counts as an interaction?", a: "An interaction is a single request-response cycle with an AI agent. Multi-turn conversations count as multiple interactions." },
  { q: "Do you offer a free trial?", a: "Yes! Every plan comes with a 14-day free trial. No credit card required to start." },
  { q: "What's included in custom training?", a: "Custom training lets you fine-tune agents on your own data, terminology, and brand voice for higher accuracy." },
  { q: "Can I cancel anytime?", a: "Absolutely. No long-term contracts. Cancel anytime from your dashboard with no cancellation fees." },
  { q: "Do you offer volume discounts?", a: "Yes, we offer discounts for annual billing (save 20%) and for deploying 10+ agents. Contact sales for details." },
];

const Pricing = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-sm mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Simple Pricing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Start Free, <span className="text-gradient">Scale Fast</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              14-day free trial on all plans. No credit card required.
            </p>
          </motion.div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`rounded-xl p-8 relative ${plan.featured ? "glass glow-md border-primary/30" : "glass"}`}>
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
                <Button className={`w-full mb-8 ${plan.featured ? "glow-sm" : ""}`} variant={plan.featured ? "default" : "outline"}>
                  Start Free Trial
                </Button>
                <ul className="space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.details key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-xl group">
                  <summary className="p-6 cursor-pointer flex items-center justify-between font-semibold list-none">
                    {faq.q}
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 group-open:rotate-45 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-sm text-muted-foreground">
                    {faq.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Pricing;
