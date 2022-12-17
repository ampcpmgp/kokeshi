<script>
  import { supabase, tokenP } from "./../supabaseClient";

  const pre = "次のチャットの感情を絵文字で分類してください:";
  const suf = "感情:";

  let message = ``;
  let result = "";
  // 1,000 トークンは約 750 単語0.02$となる。
  // https://openai.com/api/pricing/
  let messagePrice = 0;
  let resultPredictionPrice = [0, 0];
  let max_tokens = 64;
  let executing = false;
  $: prompt = `${pre}\n${message}\n${suf}`;
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
  <p>入力したメッセージの感情を絵文字で判定することが出来ます。</p>

  <h2>Input</h2>
  <textarea bind:value={message} placeholder="" />
  <span class="lenght">{prompt.length}</span>

  <button on:click={onExecute} disabled={executeDisabled}>実行</button>

  <h2>Result</h2>
  <div class="result">{result}</div>
  <span class="lenght">{result.length}</span>
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
