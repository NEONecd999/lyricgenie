import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const Support = () => {
  return (
    <div className="min-h-screen bg-[#F4EFD8]">
      <SEO 
        title="Support"
        description="Get help with Lyric Genie. Contact our support team for assistance with your songwriting app."
      />
      {/* Header */}
      <header className="bg-[rgb(127,98,196)] text-[#F6ECC9] py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link 
            to="/" 
            className="text-[#F6ECC9]/80 hover:text-[#F6ECC9] inline-flex items-center text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-display"
          >
            Support
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[#F6ECC9]/80 mt-4 max-w-2xl"
          >
            We're here to help you make the most of Lyric Genie
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Contact Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-[rgb(127,98,196)]/10 p-3 rounded-xl">
                <Mail className="h-6 w-6 text-[rgb(127,98,196)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-[rgb(127,98,196)] font-display">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Have a question, feedback, or running into an issue? We'd love to hear from you.
                </p>
                <a 
                  href="mailto:support@lyricgenie.app" 
                  className="inline-flex items-center gap-2 text-[rgb(127,98,196)] hover:text-[rgb(107,78,176)] font-semibold text-lg transition-colors"
                >
                  support@lyricgenie.app
                </a>
              </div>
            </div>
          </section>

          {/* FAQ Teaser */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-[rgb(127,98,196)]/10 p-3 rounded-xl">
                <MessageCircle className="h-6 w-6 text-[rgb(127,98,196)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-[rgb(127,98,196)] font-display">
                  Common Questions
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Looking for quick answers? Check out our FAQ section on the homepage for 
                  information about subscriptions, features, and more.
                </p>
                <Link 
                  to="/#faq" 
                  className="inline-flex items-center gap-2 text-[rgb(127,98,196)] hover:text-[rgb(107,78,176)] font-semibold text-lg transition-colors"
                >
                  View FAQ →
                </Link>
              </div>
            </div>
          </section>

          {/* Response Time */}
          <section className="text-center py-8">
            <p className="text-gray-600">
              We typically respond within 24-48 hours. Thanks for your patience!
            </p>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-[#F4EFD8]">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Lyric Genie. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Support;
