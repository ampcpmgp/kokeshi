export const PRICE_PER_WORD = 0.012;
export const WORD_PER_PRICE = 1/PRICE_PER_WORD;
export const WORD_PER_TOKEN = 750/1000;
export const TOKEN_PER_WORD = 1/WORD_PER_TOKEN;
export const PRICE_PER_TOKEN = PRICE_PER_WORD * WORD_PER_TOKEN;
export const TOKEN_PER_PRICE = 1/PRICE_PER_TOKEN;

export const DAVINCY_MAX_TOKEN = 4000
export const MAX_TOKEN = Math.floor(DAVINCY_MAX_TOKEN * 0.9);