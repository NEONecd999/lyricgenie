import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#F4EFD8]">
      <SEO 
        title="Terms of Service"
        description="The terms for using Lyric Genie, including Pro subscriptions, free trials, renewals and cancellation."
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
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#F6ECC9]/80 mt-4"
          >
            Last Updated: October 5, 2026
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
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Agreement</h2>
            <p className="mb-4 leading-relaxed text-gray-700">These terms cover Lyric Genie: the iPhone app, the web app at app.lyricgenie.app and this website (together, "Lyric Genie"). Lyric Genie is run by Edan Dover Inc ("we", "us"). By using Lyric Genie you agree to these terms and to our <Link to="/privacy-policy" className="text-[rgb(127,98,196)] underline">Privacy Policy</Link>.</p>
            <p className="mb-4 leading-relaxed text-gray-700">You must be at least 13 years old to use Lyric Genie.</p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Your account</h2>
            <p className="mb-4 leading-relaxed text-gray-700">You sign in with Google or Apple. You are responsible for what happens under your account, so keep that sign-in secure. Your account, songs and plan are the same on iPhone and on the web.</p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Your songs and recordings</h2>
            <p className="mb-4 leading-relaxed text-gray-700">You own what you write and record in Lyric Genie. To run the service we store your lyrics, notes and recordings, sync them between your devices, show them to co-writers you invite, and send the text you choose to our AI provider to generate suggestions. You give us permission to do those things, only for the purpose of providing Lyric Genie to you.</p>
            <p className="mb-4 leading-relaxed text-gray-700">Co-writers you invite to a song can read and edit it. Lyric sheets you share are visible to anyone with the link.</p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">AI features</h2>
            <p className="mb-4 leading-relaxed text-gray-700">AI suggestions are generated automatically and can be wrong, unoriginal or similar to existing works. You decide what to keep, and you are responsible for checking that what you publish or perform is yours to use. We do not claim ownership of AI suggestions you keep in your songs.</p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Lyric Genie Pro</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Lyric Genie is free to use with limited AI calls, rhyme lookups and recording time. Lyric Genie Pro raises those allowances; the current allowances are listed on our <Link to="/#pricing" className="text-[rgb(127,98,196)] underline">pricing</Link> section and in the app. Pro is billed monthly or yearly.</p>
            <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Bought in the iPhone app:</strong> Apple bills you, and Apple's terms for App Store purchases also apply. You manage or cancel it in your Apple ID settings, and refunds are handled by Apple.</li>
              <li><strong>Bought on the web:</strong> the subscription is sold and billed by Stripe through its Managed Payments service, which also handles sales tax and VAT. Prices are in US dollars; tax may be added at checkout.</li>
              <li><strong>Automatic renewal:</strong> Pro renews automatically at the end of each billing period at the then-current price until you cancel. On the web, cancel anytime in the web app under Settings → Plan → Manage. Cancelling stops the next renewal; you keep Pro until the end of the period you have paid for.</li>
              <li><strong>Free trial:</strong> new subscribers may get a 14-day free trial, once per person across iPhone and web. Unless you cancel before the trial ends, your subscription starts and you are charged when it ends.</li>
              <li><strong>Price changes:</strong> we will tell you before a new price applies to your subscription, and you can cancel before it does.</li>
              <li><strong>Refunds:</strong> except where the law requires otherwise, payments are not refundable and we do not refund partial billing periods.</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Fair use</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Please do not misuse Lyric Genie. That includes trying to get around plan limits, scripting or scraping the service, reverse engineering it, uploading content you have no right to use, or using it to break the law. We may suspend accounts that do.</p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Ending your account</h2>
            <p className="mb-4 leading-relaxed text-gray-700">You can stop using Lyric Genie and delete your account at any time from the app. If you have a subscription, cancel it first so it does not renew. We may suspend or close accounts that break these terms.</p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Disclaimers and liability</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Lyric Genie is provided "as is". We work to keep it running and your work safe, but we cannot promise it will always be available or error-free, so keep copies of work that matters to you. To the extent the law allows, our total liability to you for any claim about Lyric Genie is limited to the amount you paid us in the 12 months before the claim, and we are not liable for indirect or consequential losses.</p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Changes to these terms</h2>
            <p className="mb-4 leading-relaxed text-gray-700">We may update these terms. If a change matters, we will tell you in the app or by email before it takes effect. Continuing to use Lyric Genie after that means you accept the new terms.</p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Governing law</h2>
            <p className="mb-4 leading-relaxed text-gray-700">These terms are governed by the laws of the United States and of the state in which Edan Dover Inc. is incorporated, except where the law of your country gives you rights that cannot be waived.</p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Contact</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Questions about these terms: <a href="mailto:support@lyricgenie.app" className="text-[rgb(127,98,196)] hover:text-[rgb(107,78,176)] underline">support@lyricgenie.app</a>.</p>
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

export default TermsOfService;
