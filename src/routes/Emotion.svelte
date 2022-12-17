<script>
  import { supabase, tokenP } from "./../supabaseClient";

  const pre = "感情を分類してください:";
  const suf = "感情:";

  let message = ``;
  let result = "";
  // 1,000 トークンは約 750 単語0.02$となる。
  // https://openai.com/api/pricing/
  let messagePrice = 0;
  let resultPredictionPrice = [0, 0];
  let max_tokens = 64;
  $: prompt = `${pre}\n${message}\n${suf}`;

  async function onExecute() {
    const token = tokenP;
    const { data, error } = await supabase.functions.invoke("openai", {
      body: { prompt, max_tokens },
    });

    if (error) throw error;

    const choice = data.choices[0];
    result = choice.text;
  }
</script>

<main>
  <p>あなたが入力したメッセージに含まれる感情を判定することが出来ます。</p>

  <h2>Input</h2>
  <textarea bind:value={message} placeholder="" />
  <span class="lenght">{prompt.length}</span>

  <button on:click={onExecute}>実行</button>

  <h2>Result</h2>
  <textarea readonly value={result} placeholder="" />
  <span class="lenght">{result.length}</span>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea {
    width: 600px;
    max-width: 80%;
    height: 140px;
  }
</style>
