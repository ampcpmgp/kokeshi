<script lang="ts">
  import { match } from "ts-pattern";

  export let kind: "fixed" | "estimated" = "fixed";
  export let price = 0;

$: kindText = match(kind).with("fixed", () => "確定価格").with("estimated", () => "推定価格").exhaustive();
</script>

<div class="price">{kindText}: {price}円</div>

<style>
  .price {
    font-size: 14px;
    color: #ccc;
  }
</style>
