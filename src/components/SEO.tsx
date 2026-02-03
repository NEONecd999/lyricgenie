import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
}

const SEO = ({ 
  title, 
  description, 
  canonical,
  ogImage = "https://lyricgenie.app/images/app-icon.jpg",
  ogType = "website",
  publishedTime
}: SEOProps) => {
  const fullTitle = title.includes("Lyric Genie") ? title : `${title} | Lyric Genie`;
  const canonicalUrl = canonical || `https://lyricgenie.app${window.location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMeta = (property: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    setMeta("description", description);
    
    // Open Graph
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:type", ogType, true);
    
    if (ogType === "article" && publishedTime) {
      setMeta("article:published_time", publishedTime, true);
    }

    // Twitter
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Cleanup: reset to defaults when component unmounts
    return () => {
      document.title = "Lyric Genie - Your All-in-One Songwriting Notepad";
    };
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, publishedTime]);

  return null;
};

export default SEO;
