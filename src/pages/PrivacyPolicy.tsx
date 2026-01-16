import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F4EFD8]">
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#F6ECC9]/80 mt-4"
          >
            Last Updated: January 12, 2025
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
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Information We Collect</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Your privacy is important to us. We collect:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Account Information (email address through Google Sign-In)</li>
              <li>User Content (song lyrics, titles, creative notes)</li>
              <li>Song metadata (mood, theme, similar artists)</li>
              <li>Usage Data (feature interaction statistics, subscription data)</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">How We Use Your Information</h2>
            <p className="mb-4 leading-relaxed text-gray-700">We use your information to:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Provide and maintain the Lyric Genie service</li>
              <li>Save and sync your songs across devices</li>
              <li>Process your subscription</li>
              <li>Improve our AI-powered features</li>
              <li>Maintain app security and prevent abuse</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Data Storage and Security</h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Your song data is stored securely in Google Firebase</li>
              <li>We use industry-standard encryption for data transmission</li>
              <li>Your lyrics and creative content remain your intellectual property</li>
              <li>We implement appropriate security measures to protect your data</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Advertising & Analytics</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              We use Meta's SDK to measure the effectiveness of our advertising campaigns and to understand app usage. Meta may collect:
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-700">
              <li>Device identifiers (including Advertising ID/IDFA if you consent to tracking)</li>
              <li>App events (such as app installs, opens, and in-app actions)</li>
              <li>Device information (model, OS version, screen size)</li>
              <li>IP address and general location</li>
            </ul>
            <p className="mb-4 leading-relaxed text-gray-700">This data helps us:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-700">
              <li>Measure which ads lead to app installs</li>
              <li>Optimize our advertising to reach people who might be interested in our app</li>
              <li>Understand how people use our app features</li>
            </ul>
            <p className="mb-4 leading-relaxed text-gray-700">
              You can control whether we collect your Advertising ID through your device settings (Settings {">"} Privacy {">"} Tracking on iOS).
            </p>
            <p className="leading-relaxed text-gray-700">
              For more information about how Meta uses this data, see{" "}
              <a 
                href="https://www.facebook.com/privacy/explanation" 
                className="text-[rgb(127,98,196)] hover:text-[rgb(107,78,176)] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meta's Data Policy
              </a>
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Other Third-Party Services</h2>
            <p className="mb-4 leading-relaxed text-gray-700">We use:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-700">
              <li>Google Firebase for authentication and data storage</li>
              <li>Apple StoreKit for subscription management</li>
              <li>Anthropic's Claude API for AI features</li>
            </ul>
            <p className="leading-relaxed text-gray-700">
              Each third-party service processes data according to their respective privacy policies.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Data Access and Control</h2>
            <p className="mb-4 leading-relaxed text-gray-700">You can:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Access your song data anytime within the app</li>
              <li>Delete your account and associated data</li>
              <li>Request a copy of your data</li>
              <li>Opt out of non-essential data collection</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Children's Privacy</h2>
            <p className="leading-relaxed text-gray-700">
              Lyric Genie is not intended for children under 13. We do not knowingly collect information from children under 13.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(127,98,196)] font-display">Contact Us</h2>
            <p className="leading-relaxed text-gray-700">
              For privacy-related questions or concerns, please contact us at{" "}
              <a 
                href="mailto:support@lyricgenie.app" 
                className="text-[rgb(127,98,196)] hover:text-[rgb(107,78,176)] underline"
              >
                support@lyricgenie.app
              </a>.
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

export default PrivacyPolicy;
