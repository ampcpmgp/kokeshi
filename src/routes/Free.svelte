<script>
	import Price from './../lib/Price.svelte';
  import { init } from "../states/openai";
  import { Free } from '../const/analytics-kind';
  import Description from '../lib/Description.svelte';

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
  <Description>
    {Free.DESCRIPTION}
  </Description>


  <h2>Input</h2>
  <textarea bind:value={$message} placeholder="" />

  <button on:click={analyzeMessage} disabled={$executeDisabled}>
    {$executing ? "実行中.." : "実行"}
  </button>

  <h2>Result</h2>
  <div class="result">{$result}</div>
  <Price kind="fixed" price={$fixedPrice} />
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
