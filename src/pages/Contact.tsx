import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@neuralforge.ai" },
  { icon: Phone, label: "Phone", value: "+1 (555) 234-5678" },
  { icon: MapPin, label: "Office", value: "San Francisco, CA" },
  { icon: Clock, label: "Response Time", value: "Under 24 hours" },
];

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-sm mb-8">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Get in Touch</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's <span className="text-gradient">Talk</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to deploy AI agents for your business? Request a demo or ask us anything.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
                    <Input placeholder="John" required className="bg-secondary/50 border-border" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
                    <Input placeholder="Doe" required className="bg-secondary/50 border-border" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Work Email</label>
                  <Input type="email" placeholder="john@company.com" required className="bg-secondary/50 border-border" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Company</label>
                  <Input placeholder="Acme Corp" className="bg-secondary/50 border-border" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">How can we help?</label>
                  <Textarea placeholder="Tell us about your project and which AI solutions you're interested in..." rows={5} required className="bg-secondary/50 border-border" />
                </div>
                <Button type="submit" className="w-full glow-sm" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"} <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
              {contactInfo.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="glass rounded-xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </motion.div>
              ))}

              <div className="glass rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold mb-3">Book a Demo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See our AI agents in action with a personalized 30-minute demo.
                </p>
                <Button variant="outline" className="w-full">Schedule a Call</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
