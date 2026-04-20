import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Does Lyric Genie work on my iPad or Mac?",
    answer:
      "Yes. It's a native iOS, iPadOS, and macOS (Apple Silicon) app. Just download it from the App Store and your songs sync instantly across all three via iCloud.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! When you subscribe to Pro, Apple offers a free 14-day trial so you can explore all the Pro features risk-free. If you cancel before the trial ends, you won't be charged. You can start your trial directly from the app.",
  },
  {
    question: "Can I collaborate with others in real-time?",
    answer:
      "Yes. Real-time collaboration is one of our core features. Invite your co-writers, bandmates, or producers to edit lyrics together from anywhere in the world. Lyric changes and voice recordings sync instantly so you never lose a beat.",
  },
  {
    question: "Can I invite co-writers who don't have the app?",
    answer:
      "Yes, from within the app you can share a join link that will allow them to download the app and join your song, free.",
  },
  {
    question: "How does the Wish Workshop AI work?",
    answer:
      "Wish Workshop is a powerful tool to help you find that elusive line or brainstorm new ideas. Choose from the suggested wishes (such as 'darker', 'more cinematic', 'more conversational', 'more Gen Z', and more) or give specific instructions for what you're looking for.",
  },
  {
    question: "Can I export my lyrics?",
    answer:
      "Yes. You can generate a lyric sheet hosted at a unique URL. This can be opened in your browser or shared with others. Lyric sheets can include publishing info should you wish to include it.",
  },
  {
    question: "Is my lyric data used to train AI?",
    answer:
      "No. We never train on your lyrics and we never share them. Wish Workshop uses a third-party model with zero retention, so your text is discarded after the response. Your creativity is sacred, and all your songs are private by default.",
  },
  {
    question: "What if I need to cancel my subscription?",
    answer:
      "You can cancel anytime through your App Store account settings. You'll continue to have access to Pro features until the end of your billing period. Your songs and recordings will always be accessible, even on the free plan.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative overflow-hidden py-24 bg-background">
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="mb-4 inline-block rounded-full uppercase"
            style={{
              padding: "6px 14px",
              background: "rgba(127,98,196,.1)",
              color: "#6F50B8",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".12em",
            }}
          >
            FAQ
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#1E1324] mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#6F50B8] to-[#C48AE3] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-[#5D5065]">
            Got questions? We've got answers. If you can't find what you're looking for, reach out
            to our support team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#E5E4E8] last:border-b-0"
              >
                <AccordionTrigger className="py-5 text-left text-[17px] font-semibold text-[#1E1324] hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-[1.6] text-[#5D5065]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
