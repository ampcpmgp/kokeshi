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
  DESCRIPTION: "入力したメッセージの感情を判定することが出来ます。",
  PRE: "次のチャットの感情を分類してください:",
  SUF: "感情:",
  PRICE_PER_WORD: Server.Emotion["PRICE_PER_WORD"],
} as const;

export const Free: AnalyticsKind = {
  TITLE: "自由入力",
  EMOJI: "💬",
  DESCRIPTION: `入力したメッセージから意図を推測し、返信されます。
多くの文字が出力される場合、10~20秒ほどかかることがあります。`,
  PRE: "",
  SUF: "",
  PRICE_PER_WORD: Server.Free["PRICE_PER_WORD"],
} as const;

export const AnalyticsKind = {
  emotion: Emotion,
  free: Free,
};
