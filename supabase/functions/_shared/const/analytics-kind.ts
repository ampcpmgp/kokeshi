export const KIND = ["emotion", "free"] as const;
export type KIND = typeof KIND[number];

export interface AnalyticsKind {
  // https://beta.openai.com/docs/models/gpt-3
  MODEL: "text-davinci-003" | "text-curie-001";
  MAX_TOKEN: number;
  PRICE_PER_WORD: number;
}

export const Emotion: AnalyticsKind = {
  // curie model
  // MODEL: "text-curie-001",
  // MAX_TOKEN: 2048,
  // PRICE_PER_WORD: 0.0012,

  // davinci model
  MODEL: "text-davinci-003",
  MAX_TOKEN: 4000,
  PRICE_PER_WORD: 0.012,
} as const;

export const Free: AnalyticsKind = {
  MODEL: "text-davinci-003",
  MAX_TOKEN: 4000,
  PRICE_PER_WORD: 0.012,
} as const;

export const AnalyticsKind = {
  emotion: Emotion,
  free: Free,
};
