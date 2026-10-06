import { WEB_SIGNUP } from "@/lib/links";

const AnnouncementStrip = () => {
  return (
    <div
      className="relative hidden w-full bg-[#1E1324] text-center text-[13px] text-[#F6ECC9] md:block"
      style={{ padding: "10px 16px", letterSpacing: ".01em" }}
    >
      <span style={{ opacity: 0.8 }}>
        <span aria-hidden="true">✦</span> New: Lyric Genie is now on the web, with the same songs as your iPhone —{" "}
      </span>
      <a href={WEB_SIGNUP} className="text-[#F6ECC9] underline" style={{ textDecorationThickness: 1, textUnderlineOffset: 3 }}>
        Start writing in your browser
      </a>
    </div>
  );
};

export default AnnouncementStrip;
