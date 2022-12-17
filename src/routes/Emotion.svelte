<script>
  import { supabase, tokenP } from "./../supabaseClient";

  let value = "こんにちは！";
  let result = "";
  // 1,000 トークンは約 750 単語です。0.02$となる。
  // https://openai.com/api/pricing/
  let maxLength = 0;

  async function onExecute() {
    const token = tokenP;
    const pre = "感情を分類してください:";
    const suf = "感情：";
    const message = `${pre}\n${value}\n${suf}`;

    const { data, error } = await supabase.functions.invoke("openai", {
      headers: {
        mode: "no-cors",
      },
      body: { message },
    });

    if (error) throw error;

    const choice = data.choices[0];
    result = choice.text;
  }
</script>

<main>
  <p>あなたが入力したメッセージに含まれる感情を判定することが出来ます。</p>

  <h2>Input</h2>
  <textarea bind:value placeholder="" />
  <span class="lenght">{value.length}</span>

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
