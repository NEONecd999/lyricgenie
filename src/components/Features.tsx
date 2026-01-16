import { motion } from "framer-motion";
import { Users, Mic, Sparkles, LayoutGrid, BookOpen, UserPlus } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Real-time Co-writing",
    description: "Edit lyrics together from anywhere – just like being in the same room. Built for the pace of professional sessions.",
    color: "from-primary to-primary/80",
  },
  {
    icon: Mic,
    title: "Voice Recordings",
    description: "Hum a melody, record a hook – keep every idea organized with your lyrics so nothing gets lost between sessions.",
    color: "from-accent to-accent/80",
  },
  {
    icon: Sparkles,
    title: "Wish Workshop",
    description: "Stuck on a line? Get AI-powered suggestions that match your style. Like having a writing partner who never runs out of ideas.",
    color: "from-primary to-accent",
  },
  {
    icon: LayoutGrid,
    title: "Arrange Mode",
    description: "Drag verses, choruses, and bridges like cards to find the perfect structure. See your song take shape visually.",
    color: "from-accent/90 to-primary/90",
  },
  {
    icon: BookOpen,
    title: "Smart Dictionaries",
    description: "Rhyme, synonym, and multi-syllable dictionaries built for songwriters. Find the perfect word without leaving your flow.",
    color: "from-primary/90 to-accent/90",
  },
  {
    icon: UserPlus,
    title: "Invite Collaborators",
    description: "Share songs with co-writers instantly. Perfect for remote sessions when you can't be in LA together.",
    color: "from-accent to-primary",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold mb-4">FEATURES</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Write Great Songs
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pro-grade tools designed by working songwriters to match how you actually write.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full bg-card rounded-3xl p-8 border border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
