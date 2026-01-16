import { motion } from "framer-motion";
import { Star } from "lucide-react";
import derekFuhrmann from "@/assets/derek-fuhrmann.jpg";
import codyTarpley from "@/assets/cody-tarpley.jpg";
import royEnglish from "@/assets/roy-english.jpg";

const testimonials = [
  {
    name: "Cody Tarpleyy",
    role: "Grammy-Winning Producer",
    credits: "Megan Thee Stallion, Aespa, Chris Brown",
    content: "Lyric Genie is such an inspiring tool that helps keep writing creative, quick and fun.",
    rating: 5,
    image: codyTarpley,
  },
  {
    name: "Derek Fuhrmann",
    role: "Songwriter & Producer",
    credits: "Philip Phillips, OAR, Goo Goo Dolls",
    content:
      "As a professional songwriter this is easily the closest AI has come to making me feel like I have a cowriter in the room. A+",
    rating: 5,
    image: derekFuhrmann,
  },
  {
    name: "Roy English",
    role: "Artist & Songwriter",
    credits: "Jagwar Twin, Alesso, Michaël Brun",
    content:
      "I love how collaborators edit the lyrics in separate tabs, so we don't step on each others' toes. Big vibe.",
    rating: 5,
    image: royEnglish,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold mb-4">TESTIMONIALS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Pro Writers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join professional songwriters who've made Lyric Genie their session essential.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-start gap-5 mb-5">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-2xl font-bold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div className="pt-1">
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  {testimonial.credits && (
                    <p className="text-xs text-primary mt-1 font-medium">{testimonial.credits}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
