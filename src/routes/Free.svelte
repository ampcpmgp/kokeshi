<script>
  import { supabase, tokenP } from "../supabaseClient";

  let message = ``;
  let result = "";
  let max_tokens = 64;
  let executing = false;
  $: prompt = message;
  $: executeDisabled = executing || message.length === 0;

  async function onExecute() {
    executing = true;
    const token = tokenP;
    const { data, error } = await supabase.functions.invoke("openai", {
      body: { prompt, max_tokens },
    });

    if (error) {
      executing = false;
      throw error;
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
    height: 140px;
  }

  .result {
    border-radius: 8px;
    border: solid 1px #ccc;
  }
</style>
