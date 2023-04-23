import Home from "./Home.svelte";
import Emotion from "./Emotion.svelte";
import Emoji from "./Emoji.svelte";
import Vars from "./Vars.svelte";
import Free from "./Free.svelte";
import EmailAuth from "./EmailAuth.svelte";
import Law from "./Law.svelte";
import About from "./About.svelte";
import HowToUse from "./HowToUse.svelte";

export const routes = {
  // Exact path
  "/": Home,
  "/emotion": Emotion,
  "/emoji": Emoji,
  "/vars": Vars,
  "/free": Free,
  "/email-auth": EmailAuth,
  "/law": Law,
  "/about": About,
  "/how-to-use": HowToUse,

  // Catch-all
  "*": Home,
};
