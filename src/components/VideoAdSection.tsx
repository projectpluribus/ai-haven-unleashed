import { motion } from "framer-motion";

const VideoAdSection = () => {
  return (
    <section className="py-0 relative overflow-hidden">
      {/* Full-bleed video background */}
      <div className="relative w-full" style={{ minHeight: "70vh" }}>
        <video
          src="/videos/ad.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />

        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

        {/* Content overlay */}
        <div className="relative z-20 flex items-center justify-center h-full" style={{ minHeight: "70vh" }}>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="glass rounded-2xl p-10 md:p-14 glow-sm">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  AI That Works <span className="text-gradient">For You</span>
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-6">
                  Our intelligent agents handle the complexity so you can focus on what matters most — growing your business.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="#pricing"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoAdSection;
