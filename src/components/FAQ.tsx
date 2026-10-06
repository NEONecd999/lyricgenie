import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I use Lyric Genie on my computer?",
    answer:
      "Yes. Lyric Genie runs in any modern browser at app.lyricgenie.app, on Mac, Windows or Linux, with a desktop workspace built for long writing sessions. Sign in with the same Google or Apple account you use on your phone and your songs, recordings and concepts are all there, kept in sync live.",
  },
  {
    question: "Does Lyric Genie work on my iPad or Mac?",
    answer:
      "Yes. It's a native app for iPhone, iPad and Mac (Apple Silicon) from the App Store, and the web app works on any computer too. Your songs sync across all of them through your Lyric Genie account.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Your first Pro subscription starts with a free 14-day trial, so you can explore every Pro feature risk-free. Cancel before it ends and you won't be charged. Start it on the web (we'll take you straight to checkout after you sign up) or in the iPhone app. One Pro subscription covers both.",
  },
  {
    question: "Can I collaborate with others in real-time?",
    answer:
      "Yes. Real-time collaboration is one of our core features. Invite your co-writers, bandmates, or producers to edit lyrics together from anywhere in the world. Lyric changes and voice recordings sync instantly so you never lose a beat.",
  },
  {
    question: "Can I invite co-writers who don't have the app?",
    answer:
      "Yes. Share a join link and they can sign up free and write with you, either in their browser or in the iPhone app.",
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
      "Anytime. If you subscribed on the web, open Settings in the web app and choose Cancel subscription. If you subscribed in the iPhone app, cancel in your Apple ID's subscription settings. Either way you keep Pro until the end of the period you've paid for, and your songs and recordings stay yours on the free plan.",
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
