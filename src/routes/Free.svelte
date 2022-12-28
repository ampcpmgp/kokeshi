<script>
  import { onMount } from "svelte";
  import { authenticate, supabase } from "../supabaseClient";
  import { getErrorMessage } from "../utils/error";
  import { getMaxToken, convertToToken } from "../utils/token";

  let message = ``;
  let result = "";
  let executing = false;
  $: prompt = message;
  $: executeDisabled = executing || message.length === 0;
  $: messageToken = convertToToken(message);
  $: max_tokens = getMaxToken(messageToken);

  onMount(() => {
    authenticate();
  });

  async function onExecute() {
    executing = true;
    const { data, error } = await supabase.functions.invoke("openai", {
      body: { prompt, max_tokens },
    });

    if (error) {
      const errorMessage = await getErrorMessage(error);
      alert(errorMessage);

      executing = false;
      throw error;
    }

    if (data.error) {
      alert(data.error?.message);
      executing = false;
      throw new Error(data.error?.message);
    }

    const choice = data.choices[0];
    result = choice.text;
    executing = false;
  }
</script>

<main>
  <p>入力したメッセージから意図を推測し、返信されます</p>

  <h2>Input</h2>
  <textarea bind:value={message} placeholder="" />

  <button on:click={onExecute} disabled={executeDisabled}>
    {executing ? "実行中.." : "実行"}
  </button>

  <h2>Result</h2>
  <div class="result">{result}</div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
  }

  textarea,
  .result {
    width: 600px;
    max-width: 80%;
    min-height: 140px;
    padding: 12px;
    font-size: 18px;
  }

  .result {
    border-radius: 8px;
    border: solid 1px #ccc;
    white-space: pre-wrap;
    flex: 1;
  }
</style>
