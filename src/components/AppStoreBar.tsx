/**
 * Mobile-only top bar promoting the iOS app.
 * Shows on < 768px, sits in the normal document flow at the top of the page
 * (navbar sticks below it), and scrolls away with the rest of the page.
 */
const AppStoreBar = () => {
  return (
    <div className="relative md:hidden border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <img
            src="/images/app-icon.jpg"
            alt="Lyric Genie"
            className="h-12 w-12 rounded-xl shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Lyric Genie</span>
            <span className="text-xs text-muted-foreground">
              All-In-One Songwriter Notepad
            </span>
          </div>
        </div>
        <a
          href="https://apps.apple.com/us/app/lyric-genie/id6739787614"
          className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          GET
        </a>
      </div>
    </div>
  );
};

export default AppStoreBar;
