import { motion } from "framer-motion";

const VideoAdSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background matching the video's dark tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/30">
            <video
              src="/videos/ad.mov"
              controls
              playsInline
              preload="metadata"
              className="w-full block"
              style={{ background: "hsl(var(--card))" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoAdSection;
