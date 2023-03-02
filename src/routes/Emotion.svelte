<script>
  import Description from "./../lib/Description.svelte";
  import { Emotion, Free } from "../const/analytics-kind";
  import Price from "../lib/Price.svelte";
  import { init } from "../states/openai";
  import { onMount } from "svelte";
  import Spacer from "../lib/Spacer.svelte";

  const {
    description,
    pre,
    suf,
    message,
    executing,
    fixedPrice,
    executeDisabled,
    minPrice,
    result,
    kind,
    analyzeMessage,
  } = init();

  onMount(() => {
    $description = Emotion.DESCRIPTION;
    $pre = Emotion.PRE;
    $suf = Emotion.SUF;
    $kind = "emotion";
  });
</script>

<main>
  <Description>
    {Emotion.DESCRIPTION}
  </Description>

  <h2>Input</h2>
  <textarea bind:value={$message} placeholder="" />

  <Spacer height={2} />

  <button on:click={analyzeMessage} disabled={$executeDisabled}>
    {$executing ? "実行中.." : "実行"}
  </button>

  <h2>Result</h2>
  <div class="result">{$result}</div>

  <Price kind="min" price={$minPrice} />
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
    background-color: black;
    color: white;
    width: 100%;
    max-width: 600px;
    height: 140px;
  }

  .result {
    border-radius: 8px;
    border: solid 1px #ccc;
    font-size: 60px;
    line-height: 90px;
    flex: 1;
  }
</style>
