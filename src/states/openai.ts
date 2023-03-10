import { onMount } from "svelte";
import { derived, get, writable } from "svelte/store";
import type { KIND } from "../../supabase/functions/_shared/const/analytics-kind";
import { AnalyticsKind } from "../const/analytics-kind";
import { authenticate, supabase } from "../supabaseClient";
import { getErrorMessage } from "../utils/error";
import { convertToTokenFromPrompt, getPrice } from "../utils/price";

export function init() {
  const description = writable("");
  const pre = writable("");
  const message = writable("");
  const suf = writable("");
  const result = writable("");
  const executing = writable(false);
  const fixedPrice = writable(0);
  const kind = writable<KIND>("free");
  const analyticsKind = derived(kind, ($kind) => AnalyticsKind[$kind]);

  onMount(() => {
    authenticate();
  });

  const prompt = derived(
    [description, pre, message, suf],
    ([$description, $pre, $message, $suf]) =>
      `${$description}\n${$pre}${$message}\n${$suf}`
  );

  const executeDisabled = derived(
    [executing, message],
    ([$executing, $message]) => $executing || $message.length === 0
  );

  const minToken = derived([prompt], ([$prompt]) =>
    convertToTokenFromPrompt($prompt)
  );

  const minPrice = derived(
    [analyticsKind, minToken],
    ([$analyticsKind, $minToken]) =>
      getPrice($minToken, $analyticsKind.PRICE_PER_WORD)
  );

  async function analyzeMessage() {
    executing.set(true);
    fixedPrice.set(0);

    const { data, error } = await supabase.functions.invoke("openai", {
      body: { prompt: get(prompt), kind: get(kind) },
    });

    if (error) {
      const errorMessage = await getErrorMessage(error);
      alert(errorMessage);

      executing.set(false);
      throw error;
    }

    const choice = data.choices[0];

    result.set(choice.message.content.trim());
    executing.set(false);
    fixedPrice.set(data.price);
  }

  return {
    description,
    pre,
    message,
    suf,
    result,
    executing,
    fixedPrice,
    prompt,
    executeDisabled,
    minToken,
    minPrice,
    kind,
    analyzeMessage,
  };
}
