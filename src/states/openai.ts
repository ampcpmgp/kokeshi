import { onMount } from "svelte";
import { derived, get, writable } from "svelte/store";
import { authenticate, supabase } from "../supabaseClient";
import { getErrorMessage } from "../utils/error";
import { convertToTokenFromPrompt, getPrice } from "../utils/price";

export function init() {
  const pre = writable("");
  const message = writable("");
  const suf = writable("");
  const result = writable("");
  const executing = writable(false);
  const fixedPrice = writable(0);

  onMount(() => {
    authenticate();
  });

  const prompt = derived(
    [pre, message, suf],
    ([$pre, $message, $suf]) => `${$pre}\n${$message}\n${$suf}`
  );

  const executeDisabled = derived(
    [executing, message],
    ([$executing, $message]) => $executing || $message.length === 0
  );

  const estimatedToken = derived(
    [prompt],
    ([$prompt]) => convertToTokenFromPrompt($prompt) + 5
  );

  const estimatedPrice = derived([estimatedToken], ([$estimatedToken]) =>
    getPrice($estimatedToken)
  );

  async function analyzeMessage() {
    executing.set(true);
    fixedPrice.set(0);

    const { data, error } = await supabase.functions.invoke("openai", {
      body: { prompt: get(prompt) },
    });

    if (error) {
      const errorMessage = await getErrorMessage(error);
      alert(errorMessage);

      executing.set(false);
      throw error;
    }

    const choice = data.choices[0];

    result.set(choice.text.trim());
    executing.set(false);
    fixedPrice.set(data.price);
  }

  return {
    pre,
    message,
    suf,
    result,
    executing,
    fixedPrice,
    prompt,
    executeDisabled,
    estimatedToken,
    estimatedPrice,
    analyzeMessage,
  };
}
