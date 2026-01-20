import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppStoreBar from "@/components/AppStoreBar";
import SEO from "@/components/SEO";
import { getRelatedPosts } from "@/data/blogPosts";

// Import images for static resolution
import blogAiMusic from "@/assets/blog-ai-music.jpg";
import blogSongwritingTools from "@/assets/blog-songwriting-tools.jpg";
import blogCowriting from "@/assets/blog-cowriting.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/blog-ai-music.jpg": blogAiMusic,
  "/src/assets/blog-songwriting-tools.jpg": blogSongwritingTools,
  "/src/assets/blog-cowriting.jpg": blogCowriting,
};

interface BlogArticleProps {
  title: string;
  description?: string;
  date: string;
  readTime: string;
  category: string;
  children: React.ReactNode;
}

const BlogArticle = ({ title, description, date, readTime, category, children }: BlogArticleProps) => {
  const location = useLocation();
  const currentSlug = location.pathname.replace("/blog/", "");
  const relatedPosts = getRelatedPosts(currentSlug, 2);
  
  // Generate description from title if not provided
  const metaDescription = description || `${title} - Tips and insights for songwriters from Lyric Genie.`;

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title={title}
        description={metaDescription}
        ogType="article"
        publishedTime={date}
      />
      <AppStoreBar />
      <Navbar />

      <article className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {category}
              </span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readTime}
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {title}
            </h1>
          </motion.header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:my-8 prose-p:leading-relaxed prose-p:text-muted-foreground prose-ol:my-8 prose-ul:my-8 prose-li:my-2 prose-strong:text-foreground prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80"
          >
            {children}
          </motion.div>

          {/* Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h3 className="text-xl font-bold mb-6 text-foreground">Keep Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group block rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {post.image && (
                    <img
                      src={imageMap[post.image] || post.image}
                      alt={post.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    <h4 className="text-lg font-semibold mt-3 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 border border-primary/20 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Write Your Next Hit?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Lyric Genie gives you everything you need to capture ideas, find the perfect rhyme, and organize your songs—all in one beautiful app.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a
                href="https://apps.apple.com/us/app/lyric-genie/id6739787614"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Free on App Store
              </a>
            </Button>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogArticle;
