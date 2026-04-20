const AnnouncementStrip = () => {
  return (
    <div
      className="relative w-full bg-[#1E1324] text-center text-[13px] text-[#F6ECC9]"
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
