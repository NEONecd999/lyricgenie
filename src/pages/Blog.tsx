import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppStoreBar from "@/components/AppStoreBar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

// Import images for static resolution
import blogAiMusic from "@/assets/blog-ai-music.jpg";
import blogSongwritingTools from "@/assets/blog-songwriting-tools.jpg";
import blogCowriting from "@/assets/blog-cowriting.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/blog-ai-music.jpg": blogAiMusic,
  "/src/assets/blog-songwriting-tools.jpg": blogSongwritingTools,
  "/src/assets/blog-cowriting.jpg": blogCowriting,
};

const Blog = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <AppStoreBar />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            The Songwriter's Corner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Insights, techniques, and inspiration for aspiring and professional songwriters
          </motion.p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className={`flex flex-col ${post.image ? 'md:flex-row' : ''}`}>
                    {post.image && (
                      <div className="md:w-1/3 flex-shrink-0">
                        <img
                          src={imageMap[post.image] || post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 md:p-8 flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
