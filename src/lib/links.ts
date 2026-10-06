// Where the site's calls to action go. The web app handles sign-up (Google / Apple) and, with
// ?upgrade=, opens Stripe checkout on that plan right after sign-in (Pro members land on their plan).
export const APP_STORE = "https://apps.apple.com/us/app/lyric-genie/id6739787614";
export const WEB_APP = "https://app.lyricgenie.app";
export const WEB_SIGNUP = `${WEB_APP}/signup`;
export const WEB_SIGNIN = `${WEB_APP}/login`;
export const webTrial = (plan: "monthly" | "yearly") => `${WEB_APP}/settings?upgrade=${plan}`;
