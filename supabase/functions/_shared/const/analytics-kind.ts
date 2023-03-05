export const KIND = ["emotion", "free"] as const;
export type KIND = typeof KIND[number];

export interface AnalyticsKind {
  // https://beta.openai.com/docs/models/gpt-3
  MODEL: "gpt-3.5-turbo";
  MAX_TOKEN: number;
  PRICE_PER_WORD: number;
}

export const Emotion: AnalyticsKind = {
  // curie model
  // MODEL: "text-curie-001",
  // MAX_TOKEN: 2048,
  // PRICE_PER_WORD: 0.0025,

  // davinci model
  MODEL: "gpt-3.5-turbo",
  MAX_TOKEN: 4000,
  PRICE_PER_WORD: 0.0025,
} as const;

export const Vars: AnalyticsKind = {
  // curie model
  // MODEL: "text-curie-001",
  // MAX_TOKEN: 2048,
  // PRICE_PER_WORD: 0.0025,

  // davinci model
  MODEL: "gpt-3.5-turbo",
  MAX_TOKEN: 1000,
  PRICE_PER_WORD: 0.0025,
} as const;

export const Free: AnalyticsKind = {
  MODEL: "gpt-3.5-turbo",
  MAX_TOKEN: 4000,
  PRICE_PER_WORD: 0.0025,
} as const;

export const AnalyticsKind = {
  emotion: Emotion,
  free: Free,
};
