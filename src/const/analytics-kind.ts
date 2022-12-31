export interface AnalyticsKind {
  TITLE: string;
  EMOJI: string;
  PRE: string;
  SUF: string;
}

export const Emotion: AnalyticsKind = {
  TITLE: "感情判定",
  EMOJI: "😄",
  PRE: "次のチャットの感情を絵文字で分類してください:",
  SUF: "感情:",
} as const;

export const Free: AnalyticsKind = {
  TITLE: "自由入力",
  EMOJI: "💬",
  PRE: "",
  SUF: "",
} as const;
