import { useEffect, useState } from "react";

const AnnouncementStrip = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsHidden(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } bg-[#1E1324] text-[#F6ECC9] text-[13px] text-center`}
      style={{ padding: "10px 16px", letterSpacing: ".01em" }}
    >
      <span style={{ opacity: 0.8 }}>
        <span aria-hidden="true">✦</span> Now available on iOS, iPadOS &amp; Mac —{" "}
      </span>
      <a
        href="https://apps.apple.com/us/app/lyric-genie/id6739787614"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#F6ECC9] underline"
        style={{ textDecorationThickness: 1, textUnderlineOffset: 3 }}
      >
        Download on the App Store
      </a>
    </div>
  );
};

export default AnnouncementStrip;
