<script>
  import { onMount } from "svelte";
  import { supabase, authenticate } from "./../supabaseClient";

  const pre = "次のチャットの感情を絵文字で分類してください:";
  const suf = "感情:";

  let message = ``;
  let result = "";
  let max_tokens = 64;
  let executing = false;
  $: prompt = `${pre}\n${message}\n${suf}`;
  $: executeDisabled = executing || message.length === 0;

  onMount(() => {
    authenticate();
  });

  async function onExecute() {
    executing = true;
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
  <p>入力したメッセージの感情を絵文字で判定することが出来ます。</p>

  <h2>Input</h2>
  <textarea bind:value={message} placeholder="" />

  <button on:click={onExecute} disabled={executeDisabled}>
    {executing ? "実行中.." : "実行"}</button
  >

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
    font-size: 60px;
    line-height: 90px;
  }
</style>
