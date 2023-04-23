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
  TITLE: "感情判定",
  EMOJI: "😄",
  DESCRIPTION: "次のメッセージの感情を絵文字で分類します",
  PRE: "メッセージ:",
  SUF: "感情:",
  PRICE_PER_WORD: Server.Emotion["PRICE_PER_WORD"],
} as const;

export const Emoji: AnalyticsKind = {
  TITLE: "絵文字変換",
  EMOJI: "🖌️",
  DESCRIPTION: "次のメッセージを絵文字のみで表します",
  PRE: "「",
  SUF: "」を絵文字のみで分かりやすく表現してください。",
  PRICE_PER_WORD: Server.Emotion["PRICE_PER_WORD"],
} as const;

export const Vars: AnalyticsKind = {
  TITLE: "変数名",
  EMOJI: "🔢",
  DESCRIPTION: "分かりやすい変数名を考えます",
  PRE: "「",
  SUF: "」を示す短く分かりやすい変数名をいくつか、英語で教えてください。",
  PRICE_PER_WORD: Server.Vars["PRICE_PER_WORD"],
} as const;

export const Free: AnalyticsKind = {
  TITLE: "自由入力",
  EMOJI: "💬",
  DESCRIPTION: `入力したメッセージから意図を推測し、返信されます。`,
  PRE: "",
  SUF: "",
  PRICE_PER_WORD: Server.Free["PRICE_PER_WORD"],
} as const;

export const AnalyticsKind = {
  emotion: Emotion,
  free: Free,
};
