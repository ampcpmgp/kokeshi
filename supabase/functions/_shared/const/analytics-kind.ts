export const KIND = ["emotion", "free"] as const;

export interface AnalyticsKind {
  // https://beta.openai.com/docs/models/gpt-3
  MODEL: "text-davinci-003" | "text-curie-001";
  KIND: typeof KIND[number];
  MAX_TOKEN: number;
}

export const Emotion: AnalyticsKind = {
  MODEL: "text-curie-001",
  KIND: "emotion",
  MAX_TOKEN: 2048,
} as const;

export const Free: AnalyticsKind = {
  MODEL: "text-davinci-003",
  KIND: "free",
  MAX_TOKEN: 4000,
} as const;

export const AnalyticsKind = {
  free: Emotion,
  emotion: Free,
};
