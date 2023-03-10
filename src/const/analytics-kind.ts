import * as Server from "../../supabase/functions/_shared/const/analytics-kind";

export interface AnalyticsKind {
  TITLE: string;
  EMOJI: string;
  DESCRIPTION: string;
  PRE: string;
  SUF: string;
  PRICE_PER_WORD: Server.AnalyticsKind["PRICE_PER_WORD"];
}

export const Emotion: AnalyticsKind = {
  TITLE: "ๆๆๅคๅฎ",
  EMOJI: "๐",
  DESCRIPTION: "ๆฌกใฎใกใใปใผใธใฎๆๆใ็ตตๆๅญใงๅ้กใใพใ",
  PRE: "ใกใใปใผใธ:",
  SUF: "ๆๆ:",
  PRICE_PER_WORD: Server.Emotion["PRICE_PER_WORD"],
} as const;

export const Vars: AnalyticsKind = {
  TITLE: "ๅคๆฐๅ",
  EMOJI: "๐ข",
  DESCRIPTION: "ๅใใใใใๅคๆฐๅใ่ใใพใ",
  PRE: "ใ",
  SUF: "ๆๅณใๆจๆธฌใใ็คบใ็ญใๅใใใใใๅคๆฐๅใใใใคใใ่ฑ่ชใงๆใใฆใใ ใใใ",
  PRICE_PER_WORD: Server.Vars["PRICE_PER_WORD"],
} as const;

export const Free: AnalyticsKind = {
  TITLE: "่ช็ฑๅฅๅ",
  EMOJI: "๐ฌ",
  DESCRIPTION: `ๅฅๅใใใกใใปใผใธใใๆๅณใๆจๆธฌใใ่ฟไฟกใใใพใใ`,
  PRE: "",
  SUF: "",
  PRICE_PER_WORD: Server.Free["PRICE_PER_WORD"],
} as const;

export const AnalyticsKind = {
  emotion: Emotion,
  free: Free,
};
