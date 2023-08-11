<script>
  import { params } from "svelte-spa-router";
</script>

<main>
  {#if $params?.kind === "paypay"}
    paypay
  {:else}
    対応していない決済方式です。
  {/if}
</main>

<style>
</style>
