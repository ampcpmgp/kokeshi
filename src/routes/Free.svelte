<script>
  import { onMount } from "svelte";
  import { init } from "../states/openai";
  import { authenticate, supabase } from "../supabaseClient";
  import { getErrorMessage } from "../utils/error";

  const {
    message,
    executing,
    fixedPrice,
    executeDisabled,
    result,
    analyzeMessage,
  } = init();
</script>

<main>
  <p>
    入力したメッセージから意図を推測し、返信されます。<br />
    多くの文字が出力される場合、10~20秒ほどかかることがあります。
  </p>

  <h2>Input</h2>
  <textarea bind:value={$message} placeholder="" />

  <button on:click={analyzeMessage} disabled={$executeDisabled}>
    {$executing ? "実行中.." : "実行"}
  </button>

  <h2>Result</h2>
  <div class="result">{$result}</div>
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
