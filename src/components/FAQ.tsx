import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Lyric Genie available on Android or in a web browser?",
    answer:
      "Currently, Lyric Genie is available exclusively on iOS. You can also download the iOS app and use it on your Mac Desktop!",
  },
  {
    question: "Can I use Lyric Genie on iPad or Mac Desktop?",
    answer:
      "Yes! Our app has been developed to work beautifully on both iPad and Mac Desktop. Just download it from the Apple App Store and you're good to go.",
  },
  {
    question: "Can I collaborate with others in real-time?",
    answer:
      "Yes! Real-time collaboration is one of our core features. Invite your co-writers, bandmates, or producers to edit lyrics together from anywhere in the world. Lyric changes and voice recordings sync instantly so you never lose a beat.",
  },
  {
    question: "How does the Wish Workshop AI work?",
    answer:
      "The Wish Workshop is a powerful tool to help you find that elusive line or brainstorm new ideas. Choose from the suggested wishes (such as 'darker', 'more cinematic', 'more conversational', 'more Gen Z' and more) or give specific instructions for what you're looking for.",
  },
  {
    question: "Can I export my lyrics?",
    answer: "Absolutely! You can export your lyrics as sharable plain text, DOC or PDF.",
  },
  {
    question: "Is my work kept private?",
    answer:
      "Your creativity is sacred. All your songs are private by default and encrypted. You have complete control over who can view or edit your work. We never share or use your lyrics for any purpose without your explicit permission.",
  },
  {
    question: "What if I need to cancel my subscription?",
    answer:
      "You can cancel anytime through your App Store account settings. You'll continue to have access to Pro features until the end of your billing period. Your songs and recordings will always be accessible, even on the free plan.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold mb-4">FAQ</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, reach out to our support team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border px-6 data-[state=open]:shadow-lg data-[state=open]:border-primary/20 transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
