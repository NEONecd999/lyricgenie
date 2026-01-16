import { useState, useEffect } from "react";

const AppStoreBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Show on mobile only (below md breakpoint - 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      // Hide when scrolled down, only show at very top
      setIsHidden(window.scrollY > 20);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } bg-card/95 backdrop-blur-sm border-b border-border`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <img 
            src="/images/app-icon.jpg" 
            alt="Lyric Genie" 
            className="w-12 h-12 rounded-xl shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              Lyric Genie
            </span>
            <span className="text-xs text-muted-foreground">
              All-In-One Songwriter Notepad
            </span>
          </div>
        </div>
        <a
          href="https://apps.apple.com/us/app/lyric-genie/id6739787614"
          className="font-semibold px-6 py-2 rounded-full text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
        >
          GET
        </a>
      </div>
    </div>
  );
};

export default AppStoreBar;
