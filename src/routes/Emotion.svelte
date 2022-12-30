<script>
  import { init } from "../states/openai";

  const {
    pre,
    suf,
    message,
    executing,
    fixedPrice,
    executeDisabled,
    estimatedPrice,
    result,
    analyzeMessage,
  } = init();

  $pre = "次のチャットの感情を絵文字で分類してください:";
  $suf = "感情:";
</script>

<main>
  <p>入力したメッセージの感情を絵文字で判定することが出来ます。</p>

  <h2>Input</h2>
  <textarea bind:value={$message} placeholder="" />

  <button on:click={analyzeMessage} disabled={$executeDisabled}>
    {$executing ? "実行中.." : "実行"}
  </button>

  <h2>Result</h2>
  <div class="result">{$result}</div>

  <div class="price">推定価格: {$estimatedPrice}円</div>
  <div class="price">確定価格: {$fixedPrice}円</div>
</main>

<style>
  .price {
    font-size: 14px;
    color: #ccc;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
  }

  textarea,
  .result {
    width: 100%;
    max-width: 600px;
    height: 140px;
  }

  .result {
    border-radius: 8px;
    border: solid 1px #ccc;
    font-size: 60px;
    line-height: 90px;
  }
</style>
