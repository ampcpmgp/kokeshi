export interface AnalyticsKind {
  TITLE: string;
  EMOJI: string;
  PRE: string;
  SUF: string;
  KIND: "emotion" | "free";
}

export const Emotion: AnalyticsKind = {
  TITLE: "感情判定",
  EMOJI: "😄",
  PRE: "次のチャットの感情を絵文字で分類してください:",
  SUF: "感情:",
  KIND: "emotion",
} as const;

export const Free: AnalyticsKind = {
  TITLE: "自由入力",
  EMOJI: "💬",
  PRE: "",
  SUF: "",
  KIND: "free",
} as const;
