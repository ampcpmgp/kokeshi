<script>
  import { supabase, tokenP } from "../supabaseClient";
  import { getMaxToken, getToken } from "../utils/token";

  let message = ``;
  let result = "";
  let executing = false;
  $: prompt = message;
  $: executeDisabled = executing || message.length === 0;
  $: messageToken = getToken(message);
  $: max_tokens = getMaxToken(messageToken);

  async function onExecute() {
    executing = true;
    const token = tokenP;
    const { data, error } = await supabase.functions.invoke("openai", {
      body: { prompt, max_tokens },
    });

    if (error) {
      executing = false;
      alert(error?.message);
      throw error;
    }

    if (data.error) {
      alert(data.error?.message);
      throw new Error(data.error?.message);
    }

    const choice = data.choices[0];
    result = choice.text;
    executing = false;
  }
</script>

<main>
  <h2>Input</h2>
  <textarea bind:value={message} placeholder="" />

  <button on:click={onExecute} disabled={executeDisabled}>実行</button>

  <h2>Result</h2>
  <div class="result">{result}</div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  }
</style>
