export interface AnalyticsKind {
  // https://beta.openai.com/docs/models/gpt-3
  MODEL: "text-davinci-003" | "text-curie-001";
  KIND: "emotion" | "free";
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
